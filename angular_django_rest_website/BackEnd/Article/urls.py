from django.contrib import admin
from django.urls import path, re_path,include

from Article.serializers import FavoriteArticleSerializer
from .views import (ArticleGetView, ArticlePostView, ArticleListView,  
 FavoriteArticleView,ArticlePut_DeleteView, CommentPostView,
CommentGetView, CommentPutDeleteView, TrendingView, FeedView) #ListFavoriteArticleView,

urlpatterns = [
    path('article/',ArticlePostView.as_view(),name = 'postArticle'),
    path('article/<str:article_gen>/',ArticleGetView.as_view(),name='articleGet'),
    path('article/edit/<str:article_gen>/',ArticlePut_DeleteView.as_view(), name='articlePut'),
    path('listArticle/',ArticleListView.as_view(),name='articleList'),

    #comments
    path('article/comment/<int:article_comment_id>/', CommentPostView.as_view(), name ='commentPost'),
    path('article/commentFeed/<int:article_id>/',CommentGetView.as_view(), name ='commentGet'),
    path('article/edit/comment/<int:comment_id>/',CommentPutDeleteView.as_view(),name ="PutDeleteArticle"),
    path('article/favorite/<int:article_id>/', FavoriteArticleView.as_view(),name="Favorite"),

    #Feed
    path('article/feed/trending/', TrendingView.as_view(),name='TrendingFeed'),
    path('feed/', FeedView.as_view(),name= "FavoriteFeed")
   
   
   ]
    #path('listArticle/favorite/<int:user_id>/?limit=<int:limit>&offset=<int:offset>',  ListFavoriteArticleView.as_view(), name = 'listFavoriteArticle'),
