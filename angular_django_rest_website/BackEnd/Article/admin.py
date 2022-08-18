from django.contrib import admin
from .models import Article, Content, Tag, Comment, FavoriteArticle, Reply, Trending

admin.site.register(Article)
admin.site.register(Content)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(FavoriteArticle)
admin.site.register(Reply)
admin.site.register(Trending)




# from .models import UserInfo, Articles, Tags, Comments, FavoriteArticles, Followers

# admin.site.register(UserInfo)