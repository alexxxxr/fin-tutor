"""
This is file with all urls "/analytics/*"
"""
from django.urls import path
from .views import (selected_month_analytics, linear_regression)


urlpatterns = [
    path('month', selected_month_analytics),
    path('linear_regression', linear_regression)
]
