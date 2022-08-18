from django.shortcuts import render

from django.urls import path, re_path,include

from PlayGround.models import ImportantData
from .views import (imagePost, dataPost, ImportantDataView, ExampleView,  EntityJson, Showoff)

urlpatterns = [
    path('',imagePost.as_view(),name="imagePost"),
    path("poster/", dataPost.as_view(), name ="dataPost"),
    path("importantData/", ImportantDataView.as_view(), name= "importantPost"),
    path("example:1060b0b41f/", ExampleView.as_view(), name="example"),
    path("entityJson/", EntityJson.as_view(), name = "EntityJson"),
    path("showoff/", Showoff.as_view(), name= 'showoff')
]