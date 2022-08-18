from tkinter import Image
from django.db.models import query
from django.shortcuts import render
from rest_framework import response
from rest_framework.fields import empty
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth import authenticate
from rest_framework import generics, serializers, status, viewsets
from django.urls import resolve
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404
from django.forms.models import model_to_dict
import json
from .serializers import (ProfileSerializer, UserSerializer)
from .models import (Profile)
# self.request gets paramaters from url
from django.core.files.base import ContentFile
import base64
from AuthGroup.tokenValidation import token_timeout_check
from AuthGroup.registration import registration_email
import re
from Article.views import articleListing
from Article.models import FavoriteArticle, Article, Comment

def isBase64(sb):
    
    try:
        if isinstance(sb, str):
            # If there's any unicode here, an exception will be thrown and the function will return false
            sb_bytes = bytes(sb, "ascii")
        elif isinstance(sb, bytes):
            sb_bytes = sb
        else:
            raise ValueError("Argument must be string or bytes")
        return base64.b64encode(base64.b64decode(sb_bytes)) == sb_bytes
    except Exception:
        return False

def encodeImg(image, file_name):
    try:
        format, imgstr = image.split(";base64,")
        if isBase64(imgstr):
            if format == None or imgstr == None:
                return None
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData
        else:
            
            image = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
            format, imgstr = image.split(";base64,")
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData

    except:
        if file_name == "article":
            image = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
            format, imgstr = image.split(";base64,")
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData


def decodeImg(imageObject):
    try:
        # imageTemp = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
        return "media/" + str(imageObject.image)
    except:
        return None




class RegisterView(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request, format=None):
        token_timeout_check(request)
        try:
            rematch = '[a-zA-Z0-9]*$'
            holder = request.data['user']
            userInfo = {
                'username' : holder['userName'],
                'email': holder['email'],
                'password' : holder['password'],
                'first_name' : holder['firstName'],
                'last_name' : holder['lastName']
            }
            errors = {'errors': []}
            if holder['confirmPassword'] != holder['password']:
                errors['errors'].append("Passwords are not identical")
            if type(userInfo['password']) != str or len(userInfo['password']) < 8:
                errors['errors'].append("Password has 8 character minimum")
            if Profile.objects.filter(lower_username=userInfo['username'].lower()).exists():
                errors['errors'].append("Username already exists")
            if User.objects.filter(email=userInfo['email']).exists():
                errors['errors'].append("Email already exists")
            if not re.match(rematch, userInfo['username']):
                errors['errors'].append("Invalid characters in username")
            if len(errors['errors']) != 0:
                return Response(errors, status = status.HTTP_400_BAD_REQUEST)
            
            serializer = UserSerializer(data=userInfo)
            if serializer.is_valid():
                user = serializer.save()
                defaultImage = encodeImg('data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA=','default')
                Profile.objects.create(user=user, image = defaultImage, lower_username=user.username.lower())
                registration_email(user)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('exception hit',status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request, format=None):
        # token = token_timeout_check(request)
        if ('user' in request.data and 'userObject' in request.data['user'] 
            and 'password' in request.data['user'] and type(request.data['user']['userObject']) == str
            and type(request.data['user']['password']) == str):
            emailCheck = '@' in request.data['user']['userObject']
            if emailCheck and User.objects.filter(email=request.data['user']['userObject']).exists():
                user = User.objects.get(email=request.data['user']['userObject'])
            elif User.objects.filter(username=request.data['user']['userObject']).exists():
                user = User.objects.get(username=request.data['user']['userObject'])
            else:
                return Response({"errors": ["Invalid Credentials"]} , status=status.HTTP_406_NOT_ACCEPTABLE)
            password = request.data['user']['password']
            if user.check_password(password):
                data = {}
                profile = Profile.objects.get(user=user.id)
                token =Token.objects.get_or_create(user_id=user.id)
                data['currentUser'] = {
                    "id" : user.id,
                    "userName" : user.username,
                    "image" : decodeImg(profile),
                    "bio" : profile.bio,
                    "firstName" : user.first_name,
                    "lastName": user.last_name,
                    "email" : user.email,
                    "joinDate" : user.date_joined,
                    "token" : token[0].key,
                }
                return Response(data,status=status.HTTP_200_OK)
            else:
                return Response({"errors": ["Invalid Credentials"]} , status=status.HTTP_406_NOT_ACCEPTABLE)
        else: 
            return Response({"errors": ["Invalid Credentials"]} , status=status.HTTP_406_NOT_ACCEPTABLE)


class AutoLoginView(APIView):
    authentication_classes = ()
    permission_classes = ()
    def get(self, request):
        token = token_timeout_check(request)
        if token == None:
            return Response({"errors" : ['Invalid Token']},status=status.HTTP_406_NOT_ACCEPTABLE)
        user = Token.objects.get(key=token[0].key).user
        profile = Profile.objects.get(user=getattr(user,'id'))
        data = {}
        data['currentUser'] = {
            "id" : getattr(user,'id'),
            "userName" : getattr(user,'username'),
            "image" : decodeImg(profile),
            "bio" : profile.bio,
            "firstName" : getattr(user,'first_name'),
            "lastName": getattr(user,'last_name'),
            "email" : getattr(user,'email'),
            "joinDate" : getattr(user,'date_joined'),
            "token" : token[0].key,
        }
        return Response(data,status=status.HTTP_200_OK)

class LogoutView(APIView):
    def get(self, request):
        token= request.auth
        user = Token.objects.get(key= token).user
        user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class ProfilePutView(APIView):
    def put(self, request):
        try:
            token = token_timeout_check(request)
            if token == None:
                return Response({"errors" : ['Invalid Token']})
            user = Token.objects.get(key= token[0]).user
            profile = Profile.objects.get(user=user)
            data = request.data["user"]
            changes = request.data["user"].keys()
            newUserData = model_to_dict(user)
            newProfile = {}

   
            errors = {'errors': []} 
            if "userName" in changes: #check if taken Error Username taken or Invalid Username
                if ('newUserName' in data["userName"] and type(data["userName"]['newUserName']) == str and
                data["userName"]['newUserName'].count(' ') == 0):
                    if Profile.objects.filter(lower_username=data["userName"]['newUserName'].lower()).exists():
                        errors['errors'].append("Username already exists")
                    else:
                        newUserData["username"] = data['userName']['newUserName']
                        newProfile['lower_username'] = data['userName']['newUserName'].lower()
                else: 
                    errors['errors'].append("Username invalid")
            if "firstName" in changes:
                if 'newFirstName' in data["firstName"] and type(data["firstName"]['newFirstName']) == str:
                    newUserData["first_name"] = data["firstName"]['newFirstName']
                else: 
                    errors['errors'].append("Invalid First Name")
            if "lastName" in changes:
                if 'newLastName' in data["lastName"] and type(data['lastName']['newLastName']) == str:
                    newUserData["last_name"] = data['lastName']['newLastName']
                else: 
                    errors['errors'].append("Invalid Last Name")
            if "email" in changes:
                if True:
                    pass
                else:
                    pass
            if "password" in changes:
                if ('newPassword' in data["password"] and 'confirmPassword' in data["password"] and 'oldPassword' in data["password"]
                and data['password']['newPassword'] == data['password']['confirmPassword'] and type(data['password']['newPassword']) == str and
                user.check_password(data['password']['oldPassword']) and data['password']['oldPassword'] != data['password']['newPassword']):
                    if data['password']['oldPassword'] != data['password']['newPassword']:
                        errors['errors'].append("new password must be different from old password")
                    if len(data['password']['newPassword']) < 8:
                        errors['errors'].append("Password has 8 character minimum")
                    if len(errors['errors']) == 0:
                        newUserData["password"] = data['password']['newPassword'] 
                else: 
                    errors['errors'].append("Password Invalid")
            if "bio" in changes:
                if 'newBio' in data["bio"] and type(data["bio"]['newBio']) == str:
                    newProfile['bio'] = data['bio']['newBio']
                else:
                    errors['errors'].append("Bio Invalid")

            if "image" in changes:
                if ("newImage" in data['image'] and type(data["image"]['newImage']) == str and
                data["image"]['newImage'].startswith("data:image/jpeg;base64,")):
                    newProfile['image'] = encodeImg(data["image"]['newImage'], "Profile")
                    if newProfile['image'] == None:
                        errors['errors'].append("Invalid Image")
                else:
                    errors['errors'].append("Invalid Image")
            
            if len(errors['errors']) != 0:
                return Response(errors, status = status.HTTP_400_BAD_REQUEST)
            userSerializer = UserSerializer(user, data=newUserData)
            if userSerializer.is_valid():
                user = userSerializer.save()
            if len(newProfile) > 0:
                profileSerializer = ProfileSerializer(profile, data=newProfile, partial=True)
                if profileSerializer.is_valid():
                    profile = profileSerializer.save()
                else:
                    return Response(profileSerializer.error_messages,status=status.HTTP_400_BAD_REQUEST)
            data = { "currentUser" : {
                        "id" : getattr(user,'id'),
                        "userName" : getattr(user,'username'),
                        "image" : decodeImg(profile),
                        "bio" : profile.bio,
                        "firstName" : getattr(user,'first_name'),
                        "lastName": getattr(user,'last_name'),
                        "email" : getattr(user,'email'),
                        "joinDate" : getattr(user,'date_joined'),
                        "token" : token[0].key,
                        }
                    }
            return Response(data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'errors':  ["invalid update"]},status=status.HTTP_403_FORBIDDEN)


class ProfileGet(APIView):
    authentication_classes = ()
    permission_classes = ()
    def get(self, request, username):
        token_timeout_check(request)
        username = username.lower()
        if Profile.objects.filter(lower_username=username).exists():
            profile = Profile.objects.get(lower_username=username)
            user = User.objects.get(id=profile.user.id)
            profile = Profile.objects.get(user=user)
            data ={
                "profile" : {
                    "image"          : decodeImg(profile),
                    "bio"            : profile.bio,			
                    "privacy"        : profile.publicFavorite, #was publicFavorite
                    "firstName"      : user.first_name,
                    "lastName"       : user.last_name,
                    "creationDate"   : user.date_joined,
                    "userName"       : user.username
                }
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'errors':["No such user"]}, status=status.HTTP_400_BAD_REQUEST)

class AdminLogin(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        if User.objects.filter(email=request.data['user']['email']).exists():
            user = User.objects.get(email=request.data['user']['email'])
        else:
            return Response("error")

        if ('user' in request.data and 'email' in request.data['user'] 
            and 'password' in request.data['user'] and type(request.data['user']['email']) == str
            and type(request.data['user']['password']) == str
            and user.is_superuser
            and user.check_password(request.data['user']['password'])
            ):
            token =Token.objects.get_or_create(user_id=user.id)
            return Response({"token" :token[0].key})

        else:
            return Response("Error")
