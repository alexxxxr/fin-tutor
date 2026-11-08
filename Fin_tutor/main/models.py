# pylint: disable=C0114,C0115
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    user_type = models.IntegerField(default=1, null=False)
    second_name = models.CharField(max_length=150, null=True)
    specialization = models.JSONField(null=True)
    starting_point = models.CharField(max_length=100, null=True)  # Новое поле "Отправная точка"
    goal = models.CharField(max_length=100, null=True)  # Новое поле "Цель"
    '''
    1 - Ученик
    0 - Учитель
    '''


class Event(models.Model):
    tutor = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='tutor_events', null=False)
    student = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='student_events', null=False)
    date = models.CharField(max_length=10, null=False)  # xx.xx.xxxx
    price = models.IntegerField(null=False)  # Рубли
    is_payed = models.BooleanField(default=False, null=False)
    start_time = models.CharField(max_length=5, null=False)  # xx:xx
    length = models.IntegerField(null=False)  # В минутах
    passed = models.BooleanField(default=False, null=False)  # Новое поле "Проведено"
    homework_files = models.FileField(upload_to='homework_files/',
                                      null=True)  # Поле для файлов для домашнего задания
    homework_progress = models.IntegerField(default=0)  # Прогресс за домашнюю работу в процентах


class Note(models.Model):
    text = models.CharField(max_length=1000)
    visibility = models.BooleanField(default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_notes')
    author = models.IntegerField(default=1, null=False)
    '''
    1 - Ученик
    0 - Учитель
    '''
