from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#from ckeditor_uploader import views as ckeditor_views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.Home.as_view()),
    path('profile/', views.getUser),
    path('post/', views.getPost),
    path('research/', views.getResearch),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('logout/', views.LogoutView.as_view(), name ='logout'),

    path('images/<str:image_name>/', views.get_image, name='get_image'),
    path('image/', views.get_url_image)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
