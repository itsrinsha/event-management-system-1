from django.urls import path
from .views import EventRegisterView, MyRegistrationsView

urlpatterns = [
    path('<int:pk>/register/', EventRegisterView.as_view()),
    path('my/', MyRegistrationsView.as_view()),
]