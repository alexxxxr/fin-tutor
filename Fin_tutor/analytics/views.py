# pylint: disable=E1101
"""
This is file with all  analytics"
"""
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from sklearn.linear_model import LinearRegression
import pandas as pd
from main.models import Event, User


@api_view(['POST'])
def selected_month_analytics(request):
    """
    request body:
    {
      tutor_login: string,
      password: string,
      year: number,
      month: number,
    }
    response = {
        'total_earning': total_earning,
        'lesson_price_mean': lesson_price_mean,
        'most_profitable_month': mx_month,
        'most_profitable_month_income': mx_income_per_month,
        'least_profitable_month': mn_month,
        'least_profitable_month_income': mn_income_per_month,
        'most_profitable_student': mx_student,
        'most_profitable_student_income': mx_student_income,
        'least_profitable_student': mn_student,
        'least_profitable_student_income': mn_student_income
    }
    """
    data = request.data
    tutor = get_object_or_404(User, username=data['tutor_login'])
    events = Event.objects.filter(is_payed=True, tutor=tutor.id)
    total_earning = sum([event.price for event in events])
    events_in_current_month = [event for event in events if int(event.date[3:5]) == int(
        data['month']) and int(event.date[6:]) == int(data['year'])]
    lesson_price_mean = sum([event.price for event in events_in_current_month]) / len(
        events_in_current_month) if len(events_in_current_month) != 0 else 0
    events_in_current_year = [event for event in events if int(event.date[6:]) == int(data['year'])]
    income_per_months = {}
    for event in events_in_current_year:
        cr_month = int(event.date[3:5])
        if cr_month in income_per_months:
            income_per_months[cr_month] += event.price
        else:
            income_per_months[cr_month] = event.price
    mx_income_per_month = float('-inf')
    mx_month = str()
    mn_income_per_month = float('inf')
    mn_month = str()
    if len(income_per_months) == 1:
        mn_income_per_month = None
        mn_month = 'Null'
        mx_income_per_month = income_per_months[list(income_per_months.keys())[0]]
        mx_month = list(income_per_months.keys())[0]
    else:
        for key in income_per_months:
            if income_per_months[key] > mx_income_per_month:
                mx_income_per_month = income_per_months[key]
                mx_month = key
            if income_per_months[key] < mn_income_per_month:
                mn_income_per_month = income_per_months[key]
                mn_month = key
    yearly_income_mean = sum(income_per_months.values()) / len(income_per_months)
    income_per_students = {}
    for event in events_in_current_month:
        email = event.student.email
        if email in income_per_students:
            income_per_students[email] += event.price
        else:
            income_per_students[email] = event.price
    mx_student = str()
    mx_student_income = float('-inf')
    mn_student = str()
    mn_student_income = float('inf')
    for email in income_per_students:
        if income_per_students[email] > mx_student_income:
            mx_student_income = income_per_students[email]
            mx_student = email
        if income_per_students[email] < mn_student_income:
            mn_student_income = income_per_students[email]
            mn_student = email
    response = {
        'total_earning': total_earning,
        'yearly_income_mean': yearly_income_mean,
        'lesson_price_mean': lesson_price_mean,
        'most_profitable_month': mx_month,
        'most_profitable_month_income': mx_income_per_month,
        'least_profitable_month': mn_month,
        'least_profitable_month_income': mn_income_per_month,
        'most_profitable_student': mx_student,
        'most_profitable_student_income': mx_student_income,
        'least_profitable_student': mn_student,
        'least_profitable_student_income': mn_student_income
    }
    return Response(response, status=status.HTTP_200_OK)


@api_view(['POST'])
def linear_regression(request):
    """
    :param request:
        {
            login: string,
            year: int,
            month: int
        }
    :return:
        {
        "current_month_income": int,
        "next_month_income": float,
        "following_month_income": float
    }
    """
    if (request.data['tutor_login'] is None or request.data['year'] is None
            or request.data['month'] is None):
        return Response({'error': 'login, year, and month must be provided'},
                        status=status.HTTP_400_BAD_REQUEST)

    tutor = get_object_or_404(User, username=request.data['tutor_login'])
    events = list(Event.objects.filter(tutor=tutor.id))

    target_month_events = []
    previous_month_events = []
    past_month_events = []
    for event in events:
        date = event.date
        month = int(date[3:5])
        year = int(date[6:])
        if request.data['year'] == year and request.data['month'] == month:
            target_month_events.append(event)
        elif request.data['year'] == year and request.data['month'] == month - 1:
            previous_month_events.append(event)
        elif request.data['year'] == year and request.data['month'] == month - 2:
            past_month_events.append(event)

    # Calculating income for the current month
    current_month_income = sum(event.price for event in target_month_events)
    previous_month_income = sum(event.price for event in previous_month_events)
    past_month_income = sum(event.price for event in past_month_events)

    # Preparing data for linear regression
    dates = [datetime.strptime(event.date, '%d.%m.%Y') for event in target_month_events]
    prices = [event.price for event in target_month_events]
    df = pd.DataFrame({'date': dates, 'price': prices})
    df['day_of_month'] = df['date'].dt.day

    x = df[['day_of_month']]
    y = df['price']

    # Creating and training linear regression model
    model = LinearRegression()
    model.fit(x, y)
    # Predicting income for the next two months
    next_month_prices = model.predict(pd.DataFrame({'day_of_month': range(1, df.shape[0]*2+1)}))
    next_month_income = sum(next_month_prices[:df.shape[0]])
    following_month_income = sum(next_month_prices[df.shape[0]:])

    result = {
        "past_month_income": past_month_income,
        "previous_month_income": previous_month_income,
        "current_month_income": current_month_income,
        "next_month_income": round(next_month_income),
        "following_month_income": round(following_month_income)
    }

    return Response(result, status=status.HTTP_200_OK)
