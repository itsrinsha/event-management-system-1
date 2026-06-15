from django.contrib import admin
from django.urls import path, include
from events.views import MyRegistrationsView
from events.views import EventRegisterView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/events/', include('events.urls')),
    path('api/registrations/', include('registrations.urls')),
]