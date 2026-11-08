# pylint: disable=R0903
"""
This file contains serializers for non "/auth/*" requests (check main/urls.py)
"""
from rest_framework import serializers
from main.models import User, Event, Note


class UserSerializer(serializers.ModelSerializer):
    """
    basic serializer for User-type objects
    """
    class Meta:
        """
        serialize all fields
        """
        model = User
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    """
    basic serializer for Event-type objects
    """
    class Meta:
        """
        serialize all fields
        """
        model = Event
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    """
    basic serializer for Note-type objects
    """
    class Meta:
        """
        serialize all fields
        """
        model = Note
        fields = '__all__'
