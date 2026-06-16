from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from events.models import Event, Registration
from .serializers import RegistrationSerializer

class EventRegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        
        if Registration.objects.filter(user=request.user, event=event).exists():
            return Response(
                {"detail": "You have already registered for this event."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        Registration.objects.create(user=request.user, event=event)
        return Response({"detail": "Successfully registered."}, status=status.HTTP_201_CREATED)

class MyRegistrationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = Registration.objects.filter(user=request.user)
        serializer = RegistrationSerializer(registrations, many=True, context={'request': request})
        return Response(serializer.data)

class AdminRegistrationListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        registrations = Registration.objects.all().order_by('-registered_at')
        serializer = RegistrationSerializer(registrations, many=True, context={'request': request})
        return Response(serializer.data)
