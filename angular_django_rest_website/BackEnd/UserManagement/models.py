from django.db import models
from django.conf import settings
from django.db.models import constraints
from django.forms import CharField
from django.utils.timezone import now
from django.contrib.auth.models import User
 
User._meta.get_field('email')._unique = True

class Profile(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    lower_username = models.CharField(max_length=150, unique=True)
    image = models.ImageField(upload_to ='Profile/',null=True, blank = True)
    bio = models.TextField(blank=True, null=True)
    emailVerified = models.BooleanField(default=False)
    publicFavorite = models.BooleanField(default=False)
    publicComment = models.BooleanField(default=False)

    owner = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.username} Profile {self.user.id}"
    

class ProfileLinks(models.Model):
    profile = models.ForeignKey(Profile, on_delete = models.CASCADE)
    urlLink = models.URLField()
    type = models.CharField(max_length=35)

    class Meta:
        unique_together =('type', 'urlLink')
    

