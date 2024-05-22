import os

from django.shortcuts import get_object_or_404
#from django.http import HttpResponse
from django.conf import settings

from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializer import ProfileSerializer, ResearchSerializer, ImageSerializer, PostSerializer, CurrentUserSerializer, ReviewPostSerializer

from .models import Profile, Research, Image, Post, ReviewPost
from django.contrib.auth.models import User


from django.utils.crypto import get_random_string


# class CustomTokenObtainPairView(TokenObtainPairView):
# 	def post(self, request, *args, **kwargs):
# 		serializer = self.get_serializer(data=request.data)
# 		try:
# 			serializer.is_valid(raise_exception=True)
# 		except:
# 			return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# 		tokens = serializer.validated_data
# 		return Response(tokens, status=status.HTTP_200_OK)
class getUser(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def get(self, request):
		print(request.user)
		return Response(ProfileSerializer(Profile.objects.get(name = request.user), many=False).data)
 
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
		if request.data.get('username') == None:
			user = User.objects.create_user(username=request.data.get('username'), email=request.data.get('email'), password=request.data.get('password'))
			user.save()
			prof = Profile.objects.create(name = User.objects.get(username = request.data.get('username')), rating = 0, hidden_rating = 0, qualification = False, slug_profile = get_random_string(8, '0123456789'), description='', subscriptions=0)
			prof.save()
			print('work')
			return Response(ProfileSerializer(prof, many=False).data)
		else:
			return Response({'error': 'username is exist'})
	print('not work')



class GetResearch(APIView):
	authentication_classes = [JWTAuthentication, ]
	permission_classes = [JWTAuthentication, ]

	def get(self, request):
		researches = Research.objects.all()
		serializer = ResearchSerializer(researches, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = ResearchSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
		return Response(serializer.data)


class getPosts(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def post(self, request):
		print(request.data)
		images = list(request.data.keys())[5::]
		print(images)
		images_objs = []
		researches = []
		main_image = Image.objects.create(image = request.data['imageLogo'])
		post = Post.objects.create(title = request.data['title'],
		 	user = Profile.objects.get(name = request.user),
		 	content = request.data['description'],
		 	main_image = main_image, type_post = request.data['selectedTypePost'], slug_post = get_random_string(10, '0123456789'))
		print('post_created')
		if images != []:
			for i in images:
				images_objs.append(Image.objects.create(image = request.data[i]))
			for i in images_objs:
				post.image.add(i)
				post.save()
			print('image_added')

		if request.data.get('researches') != '':
			for i in request.data['researches'].split(','):
				researches.append(Research.objects.get(name=i))
			if researches != []:
				for i in researches:
					post.research.add(i)
					post.save()
				print('research_added')

		print(post)
		return Response()

	def get(self, request):
		posts = Post.objects.all()
		serializer = PostSerializer(posts, many=True)
	
		return Response(serializer.data)

class getPost(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def get(self, request, slug_post): 
		get_object_post = get_object_or_404(Post, slug_post=slug_post)
		return Response(PostSerializer(get_object_post, many=False).data)


class getProfile(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def get(self, request, slug_profile): 
		get_object_profile = get_object_or_404(Profile, slug_profile=slug_profile)
		posts = Post.objects.filter(user = get_object_profile)
		if request.user == get_object_profile.name:
			print(get_object_profile, posts)
			combined_data = {
				'profile': ProfileSerializer(get_object_profile, many=False).data,
				'posts': PostSerializer(posts, many=True).data
			}
			return Response(combined_data)
		else:
			return Response()


class reviewPostView(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def get(self, request, slug_post):
		get_object_post = get_object_or_404(Post, slug_post=slug_post)
		reviews = ReviewPost.objects.filter(post = get_object_post)
		print(reviews)

		return Response(ReviewPostSerializer(reviews, many=True).data)

	def post(self, request, slug_post):
		get_object_post = get_object_or_404(Post, slug_post=slug_post)
		review = ReviewPost.objects.create(post = get_object_post, user = Profile.objects.get(name = request.user), text = request.data.get('content'))
		review.save()
		return Response(ReviewPostSerializer(review, many=False).data)


class reviewProfileView(APIView):
	permission_classes = [IsAuthenticated, ]
	authentication_classes = [JWTAuthentication, ]

	def get(self, request, slug_profile):
		get_object_profile = get_object_or_404(Profile, slug_profile=slug_profile)

		user_posts = Post.objects.filter(user=get_object_profile)
		if ReviewPost.objects.filter(post__in=user_posts).exists() != False:
			sorted_reviews = ReviewPost.objects.filter(post__in=user_posts).order_by('created_at')
			print(user_posts, sorted_reviews)
			return Response(ReviewPostSerializer(sorted_reviews, many=True).data)
		return Response({'reviews': None})