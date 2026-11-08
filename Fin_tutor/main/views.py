# pylint: disable=E1101
"""
This file contains all functions except related to users
Each function handle 1 api request (check main/urls.py)
"""
import calendar
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Event, User, Note
from .serializers import NoteSerializer, EventSerializer


@api_view(['POST'])
def test(request):
    return Response(request.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_events_by_month(request):
    """
    Get all events for a specific month
    :body request:
        {
            login: string,
            year: int,
            month: int
        }
    :return:
        List of events
    """
    login = request.data['login']
    target_year = request.data['year']
    target_month = request.data['month']
    if login is None or target_year is None or target_month is None:
        return Response({'error': 'login, year, and month must be provided'},
                        status=status.HTTP_400_BAD_REQUEST)
    ans = []
    tutor = get_object_or_404(User, username=login)
    events = list(Event.objects.filter(tutor=tutor.id))
    for event in events:
        date = event.date
        month = int(date[3:5])
        year = int(date[6:])
        if target_year == year and target_month == month:
            eve = {
                "id": event.id,
                "tutor": event.tutor.email,
                "student": event.student.email,
                "date": event.date,
                "price": event.price,
                "is_payed": event.is_payed,
                "start_time": event.start_time,
                "length": event.length
            }
            ans.append(eve)
    return Response(ans, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_event_by_id(request):
    event = get_object_or_404(Event, id=request.data['id'])
    data = {
        "tutor": event.tutor.id,
        "student": event.student.id,
        "date": event.date,
        "price": event.price,
        "is_payed": event.is_payed,
        "start_time": event.start_time,
        "length": event.length,
        "passed": event.passed,
        "homework_progress": event.homework_progress
    }
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['POST'])
def payment(request):
    """
    :body request:
        {
            "i": int
        }
    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'event_not_found',
        }
    """
    event_id = request.data['id']
    event = get_object_or_404(Event, id=event_id)
    event.is_payed = True
    event.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_event(request):
    """
    :body request:
        {
            tutor_id: int
            student_email: string
            start_week_day: xx.xx.xxxx (дата понедельника первой недели, на которой булет занятие)
            repeat_for_weeks: int
            repeat_days: list [mon, tue, wed, thu, fri, sat, sun]
            price_per_hour: int
            start_time: xx:xx
            length: int (минуты)
        }

    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'user_not_found',
        } | { // или
            status: "406",
            error_message: 'invalid_data',
        }
    """
    data = request.data
    days = {'mon': 0, 'tue': 1, 'wed': 2, 'thu': 3, 'fri': 4, 'sat': 5, 'sun': 6}
    student_id = get_object_or_404(User, email=data['student_email'])
    if not student_id.user_type:
        return Response({'detail': 'target user should be student'},
                        status=status.HTTP_400_BAD_REQUEST)
    if data['repeat_for_weeks'] <= 0 or data['price_per_hour'] <= 0 or data['length'] <= 0:
        return Response({'detail': 'expected values greater then 0'},
                        status=status.HTTP_400_BAD_REQUEST)
    date_prime = data['start_week_day']
    for _ in range(int(data['repeat_for_weeks'])):
        for j in range(len(data['repeat_days'])):
            year = int(date_prime[6:])
            month = int(date_prime[3:5])
            day = int(date_prime[:2])
            day_of_week = days[list(data['repeat_days'])[j]]
            day += day_of_week
            days_in_month = calendar.monthrange(year, month)[1]
            if day > days_in_month:
                day -= days_in_month
                month += 1
                if month == 13:
                    year += 1
                    month = 1
            event = {
                'tutor': data['tutor_id'],
                'student': student_id.id,
                'date': '{:02d}.{:02d}.{:02d}'.format(day, month, year),
                'price': int(data['price_per_hour']) * float(data['length']) // 60,
                'is_payed': False,
                'start_time': data['start_time'],
                'length': data['length']
            }
            enent_ser = EventSerializer(data=event)
            if not enent_ser.is_valid():
                return Response(enent_ser.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
            enent_ser.save()
        year = int(date_prime[6:])
        month = int(date_prime[3:5])
        day = int(date_prime[:2]) + 7
        days_in_month = calendar.monthrange(year, month)[1]
        if day > days_in_month:
            day -= days_in_month
            month += 1
            if month == 13:
                year += 1
                month = 1
        date_prime = '{:02d}.{:02d}.{:02d}'.format(day, month, year)
    event_id = Event.objects.all().last().id - len(data['repeat_days']) * data["repeat_for_weeks"] + 1
    return Response({"event_id": event_id}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def change_event(request):
    """
    Change event
    :body request:
        {
            id: int
            type: list (data, start_time, length, price_per_hour),
            если data, то new_data: xx.xx.xxxx,
            если start_time, то new_start_time: xx:xx,
            если length, то new_length: int,
            если price_per_hour, то new_price_per_hour: int
        }
    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'event_not_found',
        } | { // или
            status: "400",
            error_message: 'invalid_data'
        }
    """
    data = request.data
    event = get_object_or_404(Event, id=data['id'])
    for change_type in data['type']:
        if change_type == 'data':
            if len(data['new_data']) == 10:
                event.date = data['new_data']
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        elif change_type == 'start_time':
            if len(data['new_start_time']) == 5:
                event.start_time = data['new_start_time']
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        elif change_type == 'length':
            try:
                event.length = int(data['new_length'])
            except ValueError:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        elif change_type == 'price_per_hour':
            try:
                event.price = int(data['new_price_per_hour']) * int(event.length) / 60
            except ValueError:
                return Response(status=status.HTTP_400_BAD_REQUEST)
    event.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_event(request):
    """
    Delete event
    :body request:
        {
            id: int
        }
    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'event not found',
        } | { // или
            status: "409",
            error_message: 'error',
        }
    """
    event_id = request.data['id']
    get_object_or_404(Event, id=event_id).delete()
    if not Event.objects.filter(id=event_id).exists():
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_409_CONFLICT)


@api_view(['POST'])
def create_note(request):
    """
    :body request:
        {
            "login": string,
            "event_id": int,
            "text": str,
            "visibility": bool
        }
    :return:
        {
            status: "201"
        } | { // или
            status: "404" // User или Event не найдены
        } | { // или
            status: "401" // У пользователя нет доступа
        }| { // или
            status: "400" // Некорректные данные
        }
    """
    data = request.data
    user = get_object_or_404(User, username=data['login'])
    event = get_object_or_404(Event, id=data['event_id'])
    if user.id not in (event.tutor.id, event.student.id):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    note = NoteSerializer(data={
        'text': data['text'],
        'author': user.id,
        'event': event.id,
        'visibility': data['visibility'],
    })
    if note.is_valid():
        note.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_notes(request):
    """
    :body request:
        {
            "login": string,
            "event_id": int,
        }
    :return:
        {
            json: list
            status: "200"
        } | { // или
            status: "404" // User или Event не найдены
        } | { // или
            status: "401" // У пользователя нет доступа
        }
    """
    data = request.data
    user = get_object_or_404(User, username=data['login'])
    event = get_object_or_404(Event, id=data['event_id'])
    if user.id not in (event.tutor.id, event.student.id):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if user.user_type == 0:
        another_user = event.student
    else:
        another_user = event.tutor
    notes = Note.objects.filter(event=event).exclude(visibility=False, author=another_user)
    note_ser = NoteSerializer(instance=notes, many=True)
    return Response(note_ser.data, status=status.HTTP_200_OK)
