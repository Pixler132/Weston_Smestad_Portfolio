from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import Content, Tag, Article, FavoriteArticle, Comment, Reply, Trending

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class FavoriteArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteArticle
        fields = '__all__'


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'

class TrendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trending
        fields = '__all__'
