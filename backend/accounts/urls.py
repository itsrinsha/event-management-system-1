from django.urls import path
from .views import HelloView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView
urlpatterns =[
    path('hello/', HelloView.as_view()),
    path('register', RegisterView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login', TokenObtainPairView.as_view()),
    path('login/', TokenObtainPairView.as_view()),

]
