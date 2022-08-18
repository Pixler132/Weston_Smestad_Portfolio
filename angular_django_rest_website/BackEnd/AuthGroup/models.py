from django.db import models
from django.conf import settings

class EmailMetaData(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    djangoToken = models.TextField(unique=True)
    category = models.CharField(max_length=50)
    secretToken = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    