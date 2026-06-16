from django.contrib import admin
from django.urls import path, include
from events.views import EventDetailView, EventListView, AdminDashboardView
from registrations.views import EventRegisterView, MyRegistrationsView, AdminRegistrationListView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/admin/dashboard/', AdminDashboardView.as_view()),
    path('api/events/', EventListView.as_view()),
    path('api/events/<int:pk>/', EventDetailView.as_view()),
    path('api/events/<int:pk>/register/', EventRegisterView.as_view()),
    path('api/my-registrations/', MyRegistrationsView.as_view()),
    path('api/registrations/', AdminRegistrationListView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
