from django.urls import path
from .views import (
    EventListView,
    EventDetailView,
)
from registrations.views import EventRegisterView

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('<int:pk>/register/', EventRegisterView.as_view()),
]

