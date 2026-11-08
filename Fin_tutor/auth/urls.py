"""
This is file with all urls "/auth/*"
"""
from django.urls import path
from .views import (register, login, logout, change_password, change_email, change_login,
                    change_firstname, change_lastname, get_profile)

urlpatterns = [
    path('register', register),
    path('login', login),
    path('logout', logout),
    path('change_password', change_password),
    path('change_email', change_email),
    path('change_login', change_login),
    path('change_firstname', change_firstname),
    path('change_lastname', change_lastname),
    path('get_profile', get_profile),
]
