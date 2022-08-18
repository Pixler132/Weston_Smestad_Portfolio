from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmailMetaData

class EmailMetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailMetaData
        fields = '__all__'