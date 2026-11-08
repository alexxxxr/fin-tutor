"""
This file contains functions related to users
such as registration, login and etc.
Each function handle 1 api request (check auth/urls.py)
"""
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import User, UserSerializer


@api_view(['POST'])
def register(request):
    """
    :param request:
        {
            "login": string,
            "password": string,
            "email": string,
            "user_type": bool
        }
    :return:
        {
            id: int
            status: "200",
        } | { // или
            status: "404",
            error_message: 'user_not_found',
        }
    """
    data = request.data
    if len(User.objects.filter(username=data['login'])) != 0:
        return Response({'message': 'login not unique'}, status=status.HTTP_409_CONFLICT)
    if len(User.objects.filter(email=data['email'])) != 0:
        return Response({'message': 'email not unique'}, status=status.HTTP_409_CONFLICT)
    user = {
        'username': data['login'],
        'password': "1",
        'email': data['email'],
        'user_type': data['user_type']
        # 'first_name': data['first_name'],
        # 'second_name': data['second_name'],
        # 'last_name': data['last_name'],
    }
    user_ser = UserSerializer(data=user)
    if user_ser.is_valid():
        user_ser.save()
        user = User.objects.all().last()
        user.set_password(data['password'])
        user.save()
        return Response({"id": user.id}, status=status.HTTP_201_CREATED)
    return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    :param request:
        {
            "login": string,
            "password": string,
        }
    :return:
        {
            id: int
            status: "200"
        } | { // или
            status: "404",
            detail: 'Now found'
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    if user.check_password(request.data['password']):
        return Response({"id": user.id}, status=status.HTTP_200_OK)
    return Response({'detail': 'Now found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def logout(request):
    """
    :param request:
        {
            "login": string,
            "password": string,
        }
    :return:
        {
            status: "200"
        } | { // или
            status: "409",
        }
    """
    data = request.data
    user = get_object_or_404(User, username=data['login'])
    if user.check_password(data['password']):
        user.delete()
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if not User.objects.filter(username=request.data['login']).exists():
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_409_CONFLICT)


@api_view(['POST'])
def change_password(request):
    """
    Change password
    :param request:
        {
            "login": string,
            "new_password": string
        }
    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'user_not_found',
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    user.set_password(request.data['new_password'])
    # Нужно сделать подтверждение по email
    user.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def change_email(request):
    """
    Change email
    :param request:
        {
            "login": string,
            "new_mail": string
        }
    :return:
        {
            status: "200",
        } | { // или
            status: "404",
            error_message: 'user_not_found',
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    user.email = request.data['new_mail']
    user.save()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def change_login(request):
    """
    Change login
    :param request:
        {
            "login": string,
            "password": string,
            "new_login": string
        }
    :return:
        {
            status: "200"
        } | { // или
            status: "404",
            error_message: 'user_not_found'
        } | { // или
            status: "400",
            error_message: 'new login must be unique'
        } | { // или
            status: "400",
            error_message: 'wrong password'
        }
    """
    if len(User.objects.filter(username=request.data['new_login'])) != 0:
        return Response({'error': "new login must be unique"}, status=status.HTTP_400_BAD_REQUEST)
    user = get_object_or_404(User, username=request.data['login'])
    if not user.check_password(request.data['password']):
        return Response({'error': "wrong password"}, status=status.HTTP_400_BAD_REQUEST)
    user.username = request.data['new_login']
    user.save()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def change_firstname(request):
    """
    Change first name
    :param request:
        {
            "login": string,
            "first_name": string
        }
    :return:
        {
            status: "200"
        } | { // или
            status: "404",
            error_message: 'user_not_found'
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    user.first_name = request.data['first_name']
    user.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def change_lastname(request):
    """
    Change last name
    :param request:
        {
            "login": string,
            "last_name": string
        }
    :return:
        {
            status: "200"
        } | { // или
            status: "404",
            error_message: 'user_not_found'
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    user.last_name = request.data['last_name']
    user.save()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def get_profile(request):
    """
    Get profile
    :param request:
        {
            login: str
        }
    :return:
        {
            'login': str,
            'password': str,
            'email': str,
            'user_type': int,
            'fist_name': str,
            'last_name': str
        }
    """
    usr_login = request.data['login']
    user = get_object_or_404(User, username=usr_login)
    profile = {
        'login': usr_login,
        'email': user.email,
        'user_type': user.user_type,
        'fist_name': user.first_name,
        'last_name': user.last_name
    }
    return Response(data=profile, status=status.HTTP_200_OK)
