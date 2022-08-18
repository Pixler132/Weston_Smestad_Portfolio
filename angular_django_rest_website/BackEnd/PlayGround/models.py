from django.db import models

class ImagePost(models.Model):
    image = models.ImageField(upload_to ='uploads/%Y/%m/%d/',null=True, blank = True)
    file = models.FileField(upload_to ='uploads/%Y/%m/%d/'  ,null=True, blank = True)
    description = models.TextField(null=True,blank=True)

class Data(models.Model):
    text = models.TextField()
    number = models.IntegerField()

class ImportantData(models.Model):
    text = models.TextField()
    number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
