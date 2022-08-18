from os import stat
from re import I
from traceback import print_exception
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth import authenticate
from rest_framework import generics, serializers, status, viewsets
from django.core.files.base import ContentFile
from django.http import FileResponse

import base64
import random
import pprint
import json

from .models import ImagePost, Data, ImportantData
from .serializers import ImagePostSerializer, DataSerializer, ImportantDataSerializer
from .example import foo
def encodeImg(image, file_name):
    format, imgstr = image.split(';base64,')
    ext = '.' + format.split('/')[-1]  
    file_name += ext
    imageData = ContentFile(base64.b64decode(imgstr), file_name)
    return imageData 
    
def decodeImg(imageObject):
    try:
        image_data = 'data:image/jpeg;base64,' + base64.b64encode(imageObject.image.read()).decode('utf-8')
        return image_data
    except:
        return 'data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA='


class imagePost(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self,request):
        print(request.data)
        return Response("kk sending data")

    def get(self, request):


        data = {"A" : 1, "b" :2 , "c" :3}
        return Response(data)



class dataPost(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self,request):
        data = {
            "text" : "Lorem ipsum " * 900,
            "number" : random.randint(1,9999999999)
        }
        serializer = DataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response("Valid", status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error_messages, status=status.HTTP_403_FORBIDDEN)


class ImportantDataView(APIView):
    authentication_classes = ()
    permission_classes     = ()
    def post(self, request):
        print("DataCheck".center(40,'_'))
        print(json.dumps(dict(request.data), indent=3))
        print("".center(40,'_'))

        return Response(status=status.HTTP_200_OK)

    def get(self, request):
        try:
            value = int(request.GET['id'])
            iData = ImportantData.objects.get(id =value)
            print(iData.created_at )
            data = {
                "content" :{
                    "text"      : iData.text,
                    "number"    : iData.number,
                    "created_at": iData.created_at
                }
            }
            return Response(data,status=status.HTTP_200_OK)
        except:
            return Response("Error",status=status.HTTP_400_BAD_REQUEST)

class ExampleView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self,request):
        x = foo()

        return Response("hello there!!", status=status.HTTP_200_OK)


class  EntityJson(APIView):
    authentication_classes = ()
    permission_classes = ()
    def get(self, request):
      
        entityObject = [
                {'id': 'j1', 'title': 'Core Java Tutorial', 'category': 'Java'},
                {'id': 'a1', 'title': 'Angular Tutorial', 'category': 'Angular'},
            ]
        
        return Response(entityObject)

class Showoff(APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, request):
        print(request.data)
        return Response('hello there')
