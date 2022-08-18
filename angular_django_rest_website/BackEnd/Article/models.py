from ipaddress import ip_address
from django.db import models
from django.conf import settings
from django.utils.timezone import now
from django.contrib.auth.models import User
#Change tag models


def article_Default():
    return User.objects.get(id=3)

class Article(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        default=article_Default,
        on_delete=models.SET_DEFAULT,
    )
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to ='articles/%Y/%m/%d/')
    urlGen = models.CharField(max_length=100, unique=True)
    # is visible option

    def __str__(self) -> str:
        return self.title + " " + str(self.pk)

class Content(models.Model):
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    title = models.CharField(max_length=100,blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    imageOne = models.ImageField(upload_to ='articles/%Y/%m/%d/',null=True, blank=True)
    imageTwo = models.ImageField(upload_to ='articles/%Y/%m/%d/',null=True, blank=True)
    type = models.CharField(max_length=50)
    customObject = models.BooleanField(default=False,null=True, blank=True)
    position = models.IntegerField(default=-1)

    class Meta:
        unique_together =('article','position')


class Tag(models.Model):
    article = models.ForeignKey(Article, related_name='articleTag', on_delete = models.CASCADE)
    tag = models.CharField(max_length=300)

    class Meta:
        unique_together =('article','tag')

    def __str__(self) -> str:
        return self.tag

class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    comment = models.CharField(max_length=800)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Reply(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    originalComment = models.ForeignKey(Comment, on_delete = models.CASCADE)
    comment = models.CharField(max_length=800)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class FavoriteArticle(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    class Meta:
        unique_together =('user', 'article')

    def __str__(self) -> str:
        return self.article.title


class Trending(models.Model):
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    ip_address = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    count = models.IntegerField(default=0)

    class Meta:
        unique_together =('article','ip_address')
