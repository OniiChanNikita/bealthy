from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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
			Profile.objects.create(name = User.objects.get(username = request.data.get('username')), rating = 0, hidden_rating = 0, qualification = False)
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
	authentication_classes = [JWTAuthentication, ]
	if request.method == 'GET':
		researches = Research.objects.all()
		serializer = ResearchSerializer(researches, many=True)
	if request.method == 'POST':
		serializer = ResearchSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
	return Response(serializer.data)


class getPost(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def post(self, request):
		print(request.data)
		images = list(request.data.keys())[5::]
		images_objs = []
		researches = []
		main_image = Image.objects.create(image = request.data['imageLogo'])
		post = Post.objects.create(title = request.data['title'],
		 	user = Profile.objects.get(name = request.user),
		 	content = request.data['description'],
		 	main_image = main_image)
		print('post_created')
		for i in images:
			images_objs.append(Image.objects.create(image = request.data[i]))
		for i in images_objs:
			post.image.add(i)
			post.save()
		print('image_added')


		for i in request.data['researches'].split(','):
			researches.append(Research.objects.get(name=i))
		for i in researches:
			post.research.add(i)
			post.save()
		print('research_added')

		print(post)

	
		
		#print(main_image)

		return Response()#PostSerializer(data=request.data, many=True)
		# list_researches = []
		# for num_reseach in range(len(reseaches)):
		# 	list_researches.append(Research.objects.create(request.data.reseaches[reseach]))
		# if request.FILES.get('main_image'):
		# 	list_image = []
		# 	#for img in request.data
		# 	list_image.append(Image.objects.craete(request.data['main_image']))
		# if request.FILES.get('image'):
		# 	image = Image.objects.create(request.FILES['image'])
		# post = Post.objects.create()
		

	def get(self, request):
		print(Profile.objects.get(name = request.user), 'ss')
		posts = Post.objects.filter(user = Profile.objects.get(name = request.user))
		print(posts, 's')
		serializer = PostSerializer(posts, many=True)
	
		return Response(serializer.data)



# @api_view(['GET', 'POST'])
# def getImage(request):
# 	# if request.method == 'GET':
# 	# 	images = Image.objects.all()
# 	# 	serializer = ImageSerializer(images, many=True)
# 	# if request.method == 'POST':
# 	# 	serializer = ImageSerializer(data=request.data)
# 	# 	if serializer.is_valid():
# 	# 		serializer.save()
# 	# return Response(serializer.data)

# 	if request.method == 'GET':
# 		image = Images.objects.filter().first().image
# 	return HttpResponse(image, content_type='image/jpg')

