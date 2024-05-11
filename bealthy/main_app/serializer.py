from rest_framework import serializers
from .models import Profile, Research, Image, Post

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields=('name','rating','hidden_rating','qualification')


class ResearchSerializer(serializers.ModelSerializer):
	class Meta:
		model = Research
		fields=('name','content')


class ImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Image
		fields=('image','description')
		

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields=('title', 'type_post', 'content', 'research', 'image')