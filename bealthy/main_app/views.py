from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import ProfileSerializer, ResearchSerializer, ImageSerializer, PostSerializer

from .models import Profile, Research, Image, Post
from django.contrib.auth.models import User

import os

# @api_view(['POST'])
# def get_url_image(request):
# 	print(request.data.get('pk_image')[0], type(request.data.get('pk_image')[0]))
# 	image_path = Image.objects.get(pk = request.data.get('pk_image')[0]).image.url
# 	return Response({'image_path': image_path})


# def get_image(request, image_name):
# 	print(image_name)
# 	image_path = os.path.join(settings.MEDIA_ROOT, 'None/'+image_name)
# 	try:
# 		with open(image_path, "rb") as image_file:
# 			image_data = image_file.read()
# 			response = HttpResponse(image_data, content_type='image/jpeg')
# 			return response
# 	except:
# 		print('NOT FOUND IMG')

class Home(APIView):
	# authentication_classes = [JWTAuthentication]
	permission_classes = [IsAuthenticated]

	def get(self, request):
		content = {'message': 'Hello, World!'}
		return Response(content)

class LogoutView(APIView):
	permission_classes = (IsAuthenticated, )
	def post(self, request):
		try:
			refresh_token = request.data["refresh_token"]
			RefreshToken(refresh_token).blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response({"error": "error"})

class CreateUserView(APIView):
	permission_classes = ()
	authentication_classes = ()
	def post(self, request):
		print(request.data)
		try:
			user = User.objects.create_user(username=request.data.get('username'), email=request.data.get('email'), password=request.data.get('password'))
			user.save()
			print('work')
			return Response({'res': 'created'})
		except:
			print('not work')
			return Response({'res': 'not_created'})



@api_view(['GET', 'POST'])
def getUser(request):
	if request.method == 'GET':
		users = Profile.objects.all()
		serializer = ProfileSerializer(users, many=True)
	if request.method == 'POST':
		serializer = ProfileSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
	return Response(serializer.data)

@api_view(['GET', 'POST'])
def getResearch(request):
	if request.method == 'GET':
		researches = Research.objects.all()
		serializer = ResearchSerializer(researches, many=True)
	if request.method == 'POST':
		serializer = ResearchSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
	return Response(serializer.data)


@api_view(['GET'])
def getPost(request):
	permission_classes = [IsAuthenticated]
	authentication_classes = [JWTAuthentication]

	posts = Post.objects.filter(user = Profile.objects.get(name = request.user))
	serializer = PostSerializer(posts, many=True)

	return Response(serializer.data)


@api_view(['GET', 'POST'])
def getImage(request):
	# if request.method == 'GET':
	# 	images = Image.objects.all()
	# 	serializer = ImageSerializer(images, many=True)
	# if request.method == 'POST':
	# 	serializer = ImageSerializer(data=request.data)
	# 	if serializer.is_valid():
	# 		serializer.save()
	# return Response(serializer.data)

	if request.method == 'GET':
		image = Images.objects.filter().first().image
	return HttpResponse(image, content_type='image/jpg')









