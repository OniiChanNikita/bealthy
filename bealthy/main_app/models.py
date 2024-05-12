import uuid
from os import path
from django.db import models
from django.db.models import TextField
from django.contrib.auth.models import User
from django.conf import settings

#from django.contrib.auth.models import AbstractUser
#from ckeditor_uploader.fields import RichTextUploadingField
def image_file_path(instance, filename):
	ext = filename.split('.')[-1]
	filename = f'{uuid.uuid4()}.{ext}'
	print(path.join(settings.MEDIA_ROOT, 'None/'+filename))
	return path.join(settings.MEDIA_ROOT, 'None/'+filename)

class Profile(models.Model):
	name = models.OneToOneField(User, on_delete=models.CASCADE)
	rating = models.FloatField(max_length=10, default='0')
	hidden_rating = models.FloatField(max_length=10, default='0')
	qualification = models.BooleanField() #max_length = 5, choices = CHOISE

	def __str__(self):
		return self.name.username

class Research(models.Model): #исследования 
	name = models.CharField(max_length = 255)
	content = models.TextField()

	def __str__(self):
		return self.name

class Image(models.Model):
	image = models.ImageField(upload_to = image_file_path)
	description = models.CharField(max_length=255)

	def __str__(self):
		return self.description

class Post(models.Model):
	TYPE_POSTS = (
		('traning', 'traning program'),
		('nutrion', 'nutrion program'),
		('product', 'products recommended'),
	)
	user = models.ForeignKey(Profile, on_delete=models.CASCADE)
	title = models.CharField(max_length = 255)
	type_post = models.CharField(max_length = 255, choices = TYPE_POSTS)
	content = models.TextField()
	research = models.ManyToManyField(Research, blank=True)
	main_image = models.ForeignKey(Image, related_name='post_main_image', on_delete=models.CASCADE)
	image = models.ManyToManyField(Image, related_name='post_image', blank=True)

	def __str__(self):
		return self.title


