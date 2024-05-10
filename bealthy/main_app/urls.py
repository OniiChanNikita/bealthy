from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#from ckeditor_uploader import views as ckeditor_views

urlpatterns = [
    path('post/', views.getUser),
    path('research/', views.getResearch),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('image/', views.getImage),
    path('', views.Home.as_view()),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]

# {
#     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNTIxMDU0MywiaWF0IjoxNzE1MTI0MTQzLCJqdGkiOiJmODQxOWY0MzQ2YWU0ZGQ2YWIyNTZjYTE0NGJiMjI1YSIsInVzZXJfaWQiOjF9.72NGai7I9Xy_LlRnAZlUEYjLCWvgR0g3R0Ej2sB9YEA",
#     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTI4MTIzLCJpYXQiOjE3MTUxMjQxNDMsImp0aSI6Ijk1MWEwNmVlYWRkNzRmNTlhZjYyZjcyODQ3NWUwMzQ1IiwidXNlcl9pZCI6MX0.hZcXC3yZI6xrWJ9iNUC8XgmFG9dh-IsCrVAA3HRsUYE"
# }