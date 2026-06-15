from django.contrib import admin
from django.urls import path, include
from events.views import EventDetailView, EventListView
from registrations.views import EventRegisterView, MyRegistrationsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/events', EventListView.as_view()),
    path('api/events/', include('events.urls')),
    path('api/events/<int:pk>', EventDetailView.as_view()),
    path('api/events/<int:pk>/register', EventRegisterView.as_view()),
    path('api/my-registrations', MyRegistrationsView.as_view()),
    path('api/registrations/', include('registrations.urls')),
    path('api/my-registrations/', MyRegistrationsView.as_view()),
]
