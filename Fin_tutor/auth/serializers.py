"""
This file contains serializers for all "/auth/*" requests (check auth/urls.py)
"""
from rest_framework import serializers
from main.models import User, Event


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
