from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Event, Registration
from django.contrib.auth.models import User

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all().order_by('-created_at')
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetailView(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, context={'request': request})
        return Response(serializer.data)
        
    def put(self, request, pk):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        event = get_object_or_404(Event, pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        from .serializers import EventSerializer
        events = Event.objects.all()
        users = User.objects.all()
        regs = Registration.objects.all()
        
        recent_events = events.order_by('-created_at')[:5]
        recent_regs = regs.order_by('-registered_at')[:5]
        
        from registrations.serializers import RegistrationSerializer
        
        return Response({
            'total_events': events.count(),
            'total_users': users.count(),
            'total_registrations': regs.count(),
            'recent_events': EventSerializer(recent_events, many=True, context={'request': request}).data,
            'recent_registrations': RegistrationSerializer(recent_regs, many=True, context={'request': request}).data
        })
