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
	image = ImageSerializer(many=True, read_only=True)
	main_image = ImageSerializer(many=False, read_only=True)
	research = ResearchSerializer(many=True, read_only=True)
	class Meta:
		model = Post
		fields=['title', 'type_post', 'content', 'research', 'image', 'main_image', 'slug_post']