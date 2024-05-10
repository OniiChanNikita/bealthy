from rest_framework import serializers
from .models import Profile, Research, Images, Post

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
		model = Images
		fields=('image','description')
		