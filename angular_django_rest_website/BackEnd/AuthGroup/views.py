from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.tokens import default_token_generator    
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from uritemplate import partial
from UserManagement.models import Profile
from UserManagement.serializers import ProfileSerializer
from .models import EmailMetaData
from rest_framework import status
import datetime
from .registration import registration_email

class EmailMetaRegistration(APIView):
    authentication_classes = ()
    permission_classes = ()
    def get(self, request, djangoToken, secretToken):
        if EmailMetaData.objects.filter(djangoToken=djangoToken, secretToken=secretToken).exists():
            emailObject = EmailMetaData.objects.get(djangoToken=djangoToken, secretToken=secretToken)
            currentTime = datetime.datetime.now(datetime.timezone.utc)
            tokenTime = emailObject.created_at
            timeExpended = (currentTime - tokenTime).total_seconds()
            if timeExpended > 3600:
                emailObject.delete()
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            if emailObject.category == 'Registration':
                profile = Profile.objects.get(user=emailObject.user)
                serializer = ProfileSerializer(profile,data={"emailVerified" : True},partial=True)
                if serializer.is_valid():
                    print('serializer would validate')
                    serializer.save()
                    emailObject.delete()
                
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
class EmailResendView(APIView):
    def get(self,request):
        user = Token.objects.get(key=request.auth).user
        if not Profile.objects.get(user=user).emailVerified:
            registration_email(user)
            return Response("Email Sent", status=status.HTTP_202_ACCEPTED)
        else:
            return Response("Already verified user",status.HTTP_409_CONFLICT)

class AllTagList(APIView):
    def get(self, request):
        tags = ['coding', 'living', 'family', 'joy','sadness','candy', 'tech', 'politics','news','space','cats','dog','#@#!$@#']
        data = {
            'tags' : {
                "MasterTagList" : tags
            }
        }
        return Response(data,status=status.HTTP_200_OK)