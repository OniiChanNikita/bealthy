from django.urls import path, include
from . import views
#from .views import CustomTokenObtainPairView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#from ckeditor_uploader import views as ckeditor_views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.Home.as_view()),
    path('profile/<slug:slug_profile>/', views.getProfile.as_view()),
    path('profile/<slug:slug_profile>/reviews/', views.reviewProfileView.as_view()),
    path('profile/<slug:slug_profile>/researches/', views.researchProfileView.as_view()),

    path('post/', views.getPosts.as_view()),
    path('post/<slug:slug_post>/', views.getPost.as_view()),
    path('post/<slug:slug_post>/reviews/', views.reviewPostView.as_view()),

    path('research/', views.GetResearch.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/custom-token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 

    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('signup/', views.UserRegisterView.as_view(), name = 'signup'),
    path('data/user/', views.getUser.as_view()),
    path('profiles/', views.getProfiles.as_view()),

    path('createParticipant/', views.createParticipant.as_view()),
    path('getChats/', views.getParticipant.as_view()),
    path('getMessage/', views.getMessage.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
