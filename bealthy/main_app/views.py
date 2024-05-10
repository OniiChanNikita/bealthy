from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import Profile, Research, Images, Post
from .serializer import ProfileSerializer, ResearchSerializer, ImageSerializer


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


@api_view(['GET', 'POST'])
def getImage(request):
	# if request.method == 'GET':
	# 	images = Images.objects.all()
	# 	serializer = ImageSerializer(images, many=True)
	# if request.method == 'POST':
	# 	serializer = ImageSerializer(data=request.data)
	# 	if serializer.is_valid():
	# 		serializer.save()
	# return Response(serializer.data)

	if request.method == 'GET':
		image = Images.objects.filter().first().image
	return HttpResponse(image, content_type='image/jpg')









