from django.contrib import admin
from django.urls import path, include
from events.views import MyRegistrationsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/events/', include('events.urls')),
    path('api/my-registrations/', MyRegistrationsView.as_view()),
]
