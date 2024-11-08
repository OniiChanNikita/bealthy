import uuid
from os import path
from django.db import models
from django.db.models import TextField
from django.contrib.auth.models import User
from django.conf import settings
import datetime


#from django.contrib.auth.models import AbstractUser
#from ckeditor_uploader.fields import RichTextUploadingField
def image_file_path(instance, filename):
	ext = filename.split('.')[-1]
	filename = f'{uuid.uuid4()}.{ext}'
	print(path.join(settings.MEDIA_ROOT, 'None/'+filename))
	return path.join(settings.MEDIA_ROOT, 'None/'+filename)

class Profile(models.Model):
	name = models.OneToOneField(User, on_delete=models.CASCADE)
	image_profile = models.ImageField(upload_to = image_file_path, default = 'default_profile.jpg')
	rating = models.FloatField(max_length=10, default='0')
	hidden_rating = models.FloatField(max_length=10, default='0')
	qualification = models.BooleanField() #max_length = 5, choices = CHOISE
	description = models.TextField()
	subscriptions = models.IntegerField()

	slug_profile = models.SlugField(unique=True, blank=True)

	def get_absolute_url_profile(self):
		return reverse("open_profile", kwargs={"slug_profile": self.slug_profile}) 

	def __str__(self):
		return self.name.username


class Research(models.Model): #исследования \
	user = models.ForeignKey(Profile, on_delete=models.CASCADE)
	id_research = models.IntegerField(unique=True, blank=True, null=True)
	name = models.CharField(max_length = 255)
	datetime = models.DateTimeField(auto_now=True)


	def __str__(self):
		return self.name

class Image(models.Model):
	image = models.ImageField(upload_to = image_file_path)
	description = models.CharField(max_length=255, null = True)

	def __str__(self):
 		return self.image.url


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

	datetime = models.DateTimeField(auto_now_add=True)
	slug_post = models.SlugField(unique=True, blank=True)

	def get_absolute_url_post(self):
		return reverse("open_post", kwargs={"slug_post": self.slug_post}) 

	def __str__(self):
		return self.title

class ReviewPost(models.Model):
	post = models.ForeignKey(Post, related_name='reviews', on_delete=models.CASCADE)
	user = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True)
	text = models.CharField(max_length=255)

	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f'Review by {self.user.name.username} on {self.post.title}'



class Conversation(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    id_chat = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return f"Conversation {self.id} created at {self.created_at}"


class Participant(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('conversation', 'user')

    def __str__(self):
        return f"{self.user.name} in conversation {self.conversation.id}"



class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages', null=True)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} from {self.sender.name} in conversation {self.conversation.id}"