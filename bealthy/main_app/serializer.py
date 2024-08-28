from rest_framework import serializers
from .models import Profile, Research, Image, Post, ReviewPost, Participant, Conversation, Message
from django.contrib.auth.models import User


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email')
        )
        return user

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id', 'date_joined')

class ProfileSerializer(serializers.ModelSerializer):
	name = CurrentUserSerializer(many=False, read_only=True)

	class Meta:
		model = Profile
		fields=('name','rating','hidden_rating','qualification', 'description', 'subscriptions', 'image_profile', 'slug_profile')


class ResearchSerializer(serializers.ModelSerializer):
	user = ProfileSerializer(many=False, read_only=True)
	class Meta:
		model = Research
		fields=['user', 'id_research', 'name','datetime']###ID


class ImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Image
		fields=('image','description')
		

class PostSerializer(serializers.ModelSerializer):
	user = ProfileSerializer(many=False, read_only=True)
	image = ImageSerializer(many=True, read_only=True)
	main_image = ImageSerializer(many=False, read_only=True)
	research = ResearchSerializer(many=True, read_only=True)
	class Meta:
		model = Post
		fields=['user', 'title', 'type_post', 'content', 'research', 'image', 'main_image', 'slug_post', 'datetime']


class ReviewPostSerializer(serializers.ModelSerializer):
	post = PostSerializer(many=False, read_only=True)
	user = ProfileSerializer(many=False, read_only=True)
	class Meta:
		model = ReviewPost
		fields=['post', 'user', 'text', 'created_at']


class ConversationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Conversation
		fields = ['created_at', 'id_chat']


class ParticipantSerializer(serializers.ModelSerializer):
	conversation = ConversationSerializer(many=False, read_only=True) 
	user = ProfileSerializer(many=False, read_only=True)
	class Meta:
		model = Participant
		fields = ['conversation', 'user', 'id']

class MessageSerializer(serializers.ModelSerializer):
	conversation = ConversationSerializer(many=False, read_only=True) 
	sender = ProfileSerializer(many=False, read_only=True)
	
	class Meta:
		model = Message
		fields = ['conversation', 'sender', 'content', 'timestamp']