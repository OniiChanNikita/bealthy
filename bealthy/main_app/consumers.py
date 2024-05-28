# consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message, Profile
from django.contrib.auth.models import User

class TextRoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        try:
            # Получаем данные из WebSocket сообщения
            text_data_json = json.loads(text_data)
            text = text_data_json['text']
            sender = text_data_json['sender']
            receiver = text_data_json['receiver']
            
            # Получение профиля пользователя
            sender_profile = Profile.objects.get(name=User.objects.get(username=sender))
            receiver_profile = Profile.objects.get(name=User.objects.get(username=receiver))


            # Сохранение сообщения в базе данных
            message = Message(sender=sender_profile, receiver=receiver_profile, text=text)
            print(message.sender, message.receiver)
            message.save()

            # Отправка сообщения в группу
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': text,
                    'sender': sender,
                    'receiver': receiver
                }
            )
        except User.DoesNotExist as e:
            # Обработка случая, когда пользователь не найден
            self.send(text_data=json.dumps({
                'error': f"User does not exist: {str(e)}"
            }))
        except Profile.DoesNotExist as e:
            print('error: Profile does not exist', str(e))

            # Обработка случая, когда профиль пользователя не найден
            self.send(text_data=json.dumps({
                'error': f"Profile does not exist: {str(e)}"
            }))
        except Exception as e:
            # Обработка любых других ошибок
            print('error: An error occurred:', str(e))
            self.send(text_data=json.dumps({
                'error': f"An error occurred: {str(e)}"
            }))



    def chat_message(self, event):
        # Receive message from room group
        text = event['message']
        sender = event['sender']
        receiver = event['receiver']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'text': text,
            'sender': sender,
            'receiver': receiver
        }))
