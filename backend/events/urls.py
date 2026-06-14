from django.urls import path
from .views import (
    EventListView,
    EventDetailView,
    EventRegisterView,
)

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('<int:pk>/register/', EventRegisterView.as_view()),
]

