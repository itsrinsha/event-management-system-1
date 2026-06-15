from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from events.models import Event, Registration
from events.serializers import EventSerializer

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
