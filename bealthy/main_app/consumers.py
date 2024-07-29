# consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, Profile, Conversation
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

class TextRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            # Получаем данные из WebSocket сообщения
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            user_id = self.scope['user'].id

            await self.save_message(self.conversation_id, user_id, message)
            
            # Получение профиля пользователя
            await self.channel_layer.group_send(
            self.conversation_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'user_id': user_id
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

    async def chat_message(self, event):
        # Receive message from room group
        message = event['message']
        user_id = event['user_id']
        user = await self.get_user(user_id)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': user.username
        }))

    @database_sync_to_async
    def save_message(self, conversation_id, user_id, message):
        conversation = Conversation.objects.get(id=conversation_id)
        sender = Profile.objects.get(name = User.objects.get(id=user_id))
        return Message.objects.create(conversation=conversation, sender=sender, content=message)

