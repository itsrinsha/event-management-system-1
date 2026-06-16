from django.urls import path
from .views import EventRegisterView, MyRegistrationsView, AdminRegistrationListView

urlpatterns = [
    path('events/<int:pk>/register/', EventRegisterView.as_view(), name='event-register'),
    path('my-registrations/', MyRegistrationsView.as_view(), name='my-registrations'),
    path('', AdminRegistrationListView.as_view(), name='admin-registrations'),
]