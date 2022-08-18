from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import ImagePost, Data, ImportantData


class ImagePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePost
        fields = '__all__'

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'
    
class ImportantDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantData
        fields = '__all__'
    