from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import HelloView, RegisterView, CustomTokenObtainPairView

urlpatterns = [
    path('hello/', HelloView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]