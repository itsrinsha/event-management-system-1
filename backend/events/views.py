from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Event, Registration

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = EventSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetailView(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

class EventRegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        event = get_object_or_404(Event, pk=pk)

        registration, created = Registration.objects.get_or_create(
            user=request.user,
            event=event
        )

        if not created:
            return Response(
                {"message": "You have already registered for this event"},
                status=400
            )

        return Response(
            {"message": "Registration successful"},
            status=status.HTTP_201_CREATED
        )

class MyRegistrationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = Registration.objects.filter(
            user=request.user
        )

        events = [reg.event for reg in registrations]

        serializer = EventSerializer(events, many=True)

        return Response(serializer.data)
