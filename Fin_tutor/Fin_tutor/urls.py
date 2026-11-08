"""
This file contains all urls for non "/auth/*" api requests
If you looking for "/auth/*" request check auth/urls.py
"""
from django.urls import path, include
from main.views import (test, payment, create_event, delete_event, get_events_by_month,
                        create_note, get_notes, get_event_by_id, change_event)

urlpatterns = [
    path('auth/', include('auth.urls')),
    path('analytics/', include('analytics.urls')),
    path('test', test),
    path('payment', payment),
    path('post_lesson', create_event),
    path('delete_lesson', delete_event),
    path('get_events_by_month', get_events_by_month),
    path('create_note', create_note),
    path('get_notes', get_notes),
    path('get_lesson_by_id', get_event_by_id),
    path('put_lesson', change_event),
]
