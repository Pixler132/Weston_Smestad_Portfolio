from ipaddress import ip_address
from msilib import schema
from multiprocessing.dummy.connection import families
from sys import api_version
from weakref import finalize
from django.db.models import query
from django.shortcuts import render
from rest_framework import response
from rest_framework.fields import empty
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth import authenticate
from rest_framework import generics, serializers, status, viewsets
from django.urls import resolve
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404
from django.core.files.uploadedfile import InMemoryUploadedFile
import base64
from django.db.models import Sum
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.forms.models import model_to_dict
import coreapi
from rest_framework.schemas.openapi import AutoSchema

from hashlib import pbkdf2_hmac
import re

from .serializers import (
    ArticleSerializer,
    ContentSerializer,
    TagSerializer,
    FavoriteArticleSerializer,
    CommentSerializer,
    ReplySerializer,
    TrendingSerializer,
)
from .models import Tag, Article, FavoriteArticle, Comment, Content, Reply, Trending
from UserManagement.models import Profile
from django.contrib.auth.models import User

# from .views import (ArticleView, ArticleListView, ArticleTagListView,
# ListFavoriteArticleView, FavoriteArticleView)


def urlCreator(title, id):
    title = title.replace(" ", "-").lower()
    title = re.sub(r"[^a-zA-Z0-9\-]", "", title)
    our_app_iters = 500_000  # Application specific, read above.
    dk = pbkdf2_hmac("sha256", str.encode(str(id)), b"Gen3f3A", our_app_iters, dklen=3)
    return title + ":" + str(dk.hex())


def isBase64(sb):
    try:
        if isinstance(sb, str):
            # If there's any unicode here, an exception will be thrown and the function will return false
            sb_bytes = bytes(sb, "ascii")
        elif isinstance(sb, bytes):
            sb_bytes = sb
        else:
            raise ValueError("Argument must be string or bytes")
        return base64.b64encode(base64.b64decode(sb_bytes)) == sb_bytes
    except Exception:
        return False


def encodeImg(image, file_name):
    try:
        format, imgstr = image.split(";base64,")
        if isBase64(imgstr):
            if format == None or imgstr == None:
                return None
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData
        else:
            image = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
            format, imgstr = image.split(";base64,")
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData

    except:
        if file_name == "article":
            image = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
            format, imgstr = image.split(";base64,")
            ext = "." + format.split("/")[-1]
            file_name += ext
            imageData = ContentFile(base64.b64decode(imgstr), file_name)
            return imageData


def decodeImg(imageObject):
    try:
        # imageTemp = "data:image/jpeg;base64,UklGRiQAAABXRUJQVlA4TBcAAAAv4AA4AAcQ0f/+BwQkif//UxH9T/sfXwA="
        return "media/" + str(imageObject.image)
    except:
        return None


def commentFeed(article_id):
    comments = Comment.objects.filter(article=article_id)
    commentContent = [
        {
            "author": {
                "authorId": comment.author.id,
                "username": comment.author.username,
                "profileImg": "media/"
                + str(Profile.objects.get(user=comment.author).image),
            },
            "replies": [
                {
                    "author": {
                        "authorId": reply.author.id,
                        "username": reply.author.username,
                        "profileImg": "media/"
                        + str(Profile.objects.get(user=reply.author).image),
                    },
                    "comment_id": reply.id,
                    "content": reply.comment,
                    "creationDate": reply.created_at,
                    "updatedDate": reply.updated_at,
                }
                for reply in Reply.objects.filter(originalComment=comment.id)
            ],
            "comment_id": comment.id,
            "content": comment.comment,
            "creationDate": comment.created_at,
            "updatedDate": comment.updated_at,
        }
        for comment in comments
    ]
    commentData = {"commentFeed": {"comments": commentContent}}
    return commentData


class ArticleGetView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request, article_gen, format=None):
        try:
            article = Article.objects.get(urlGen=article_gen)
            contents = Content.objects.filter(article_id=article.id)

            if Trending.objects.filter(
                article=article, ip_address=request.META["REMOTE_ADDR"]
            ):

                trend = Trending.objects.get(
                    article=article.id, ip_address=request.META["REMOTE_ADDR"]
                )
                count = int(trend.count) + 1
                trendingData = {
                    "article": article.id,
                    "ip_address": request.META["REMOTE_ADDR"],
                    "count": count,
                }
                tSerializer = TrendingSerializer(trend, data=trendingData)
                if tSerializer.is_valid():
                    tSerializer.save()
                else:
                    print(tSerializer.errors)

            else:
                trendingData = {
                    "article": article.id,
                    "ip_address": request.META["REMOTE_ADDR"],
                    "count": 1,
                }
                tSerializer = TrendingSerializer(data=trendingData)
                if tSerializer.is_valid():
                    tSerializer.save()
                else:
                    print(tSerializer.errors)

            author = User.objects.get(id=article.author_id)
            user = None
            if request.META.get("HTTP_AUTHORIZATION") and "Token " in request.META.get(
                "HTTP_AUTHORIZATION"
            ):
                token = str(request.META.get("HTTP_AUTHORIZATION")).split("Token ")[-1]
                if Token.objects.filter(key=token).exists():
                    user = Token.objects.get(key=token).user
            if (
                user != None
                and FavoriteArticle.objects.filter(
                    article=article, user=user.id
                ).exists()
            ):
                favorite = True
            else:
                favorite = False
            contents = [
                {
                    "title": content.title,
                    "body": content.body,
                    "type": content.type,
                    "imageOne": "media/" + str(content.imageOne),
                    "imageTwo": "media/" + str(content.imageTwo),
                    "customObject": content.customObject,
                    "position": content.position,
                }
                for content in contents
            ]

            for content in contents:
                if content["imageOne"] == "media/":
                    content["imageOne"] = None
                elif content["imageTwo"] == "media/":
                    content["imageTwo"] = None
            authorProfile = Profile.objects.get(user=author)
            favoriteCount = FavoriteArticle.objects.filter(
                article_id=article.id
            ).count()
            tags = Tag.objects.filter(article_id=article.id)
            tagList = [tag.tag for tag in tags]
            finalJson = {
                "article": {
                    "id": article.id,
                    "content": contents,
                    "author": {
                        "authorId": article.author.id,
                        "username": article.author.username,
                        "profileImg": decodeImg(authorProfile),
                    },
                    "articleTitle": article.title,
                    "articleImage": decodeImg(article),
                    "articleDescription": article.description,
                    "creationDate": article.created_at,
                    "tags": tagList,
                    "favorited": favorite,
                    "urlGen": article.urlGen,
                }
            }
            return Response(finalJson, status=status.HTTP_200_OK)
        except:
            return Response("No matching Article", status=status.HTTP_404_NOT_FOUND)


def articleValidator(items):
    try:
        validArticle = [
            ("tags", type([1, 2])),
            ("articleTitle", type("str")),  # error if blank
            ("articleDescription", type("str")),
            ("articleImage", type("str")),
            ("content", type([1, 2])),
        ]
        bodyContent = {
            "title": [type("str"), type(None)],
            "body": [type("str"), type(None)],
            "imageOne": [type("str"), type(None)],
            "imageTwo": [type("str"), type(None)],
            "type": [type("str")],
            "customObject": [type(True), type(None)],
            "position": [type(1)],
        }

        articleCheck = [
            (key, type(items["article"][key]))
            for key in items["article"]
            if len(items["article"][key]) > 0 or key == "articleImage" or key == "tags"
        ]

        tags = items["article"]["tags"]

        tagCheck = [1 for tag in tags if len(tag) > 200 or tags.count(tag) > 1]
        if len(tagCheck) != 0:
            return False

        articleContent = items["article"]["content"]
        if sorted(articleCheck) == sorted(validArticle):
            contentValidator = [
                1
                for content in articleContent
                if len(
                    [
                        key
                        for key in content
                        if key not in bodyContent.keys()
                        or type(content[key]) not in bodyContent[key]
                    ]
                )
                != 0
            ]
            requiredFields = [
                1
                for content in articleContent
                if "type" in content.keys()
                and "customObject" in content.keys()
                and "position" in content.keys()
            ]
            numbers = [content["position"] for content in articleContent]
            increase = []
            if len(numbers) > 1:
                increase = [
                    1
                    for index in range(len(numbers) - 1)
                    if numbers[index] != numbers[index + 1] - 1
                ]

            if (
                len(contentValidator) == 0
                and numbers == list(set(numbers))
                and len(increase) == 0
                and len(requiredFields) == len(articleContent)
            ):
                return True
            else:               
                return False
        else:
            return False
    except:
        return False


class ArticlePostView(APIView):
    def post(self, request, format=None):
        validation = articleValidator(request.data)
        if validation:
            try:
                data = request.data["article"]
                token = request.auth
                user = Token.objects.get(key=token.key).user
                idNum = Article.objects.all().count() + 1
                articleData = {
                    "author": user.id,
                    "title": data["articleTitle"],
                    "description": data["articleDescription"],
                    "image": encodeImg(data["articleImage"], "article"),
                    "urlGen": urlCreator(data["articleTitle"], idNum),
                }
                articleSerializer = ArticleSerializer(data=articleData)
            except:
                return Response(
                    "Incomplete Article Data", status=status.HTTP_406_NOT_ACCEPTABLE
                )
            if articleSerializer.is_valid():
                articleObject = articleSerializer.save()
                tags = data["tags"]
                tags = [tag.lower() for tag in tags]
                for tag in tags:
                    tagData = {"article": articleObject.id, "tag": tag}
                    tagSerializer = TagSerializer(data=tagData)
                    if tagSerializer.is_valid():
                        tagSerializer.save()
                    else:
                        return Response(
                            "invalid data 1", status=status.HTTP_400_BAD_REQUEST
                        )

                contents = data["content"]
                for content in contents:
                    if (
                        "imageOne" in content.keys()
                        and type(content["imageOne"]) == str
                        and content["imageOne"].find(";base64,") > 0
                    ):
                        content["imageOne"] = encodeImg(content["imageOne"], "Content")
                    else:
                        if "imageOne" in content.keys():
                            content.pop("imageOne")
                    if (
                        "imageTwo" in content.keys()
                        and type(content["imageTwo"]) == str
                        and content["imageTwo"].find(";base64,") > 0
                    ):
                        content["imageTwo"] = encodeImg(content["imageTwo"], "Content")
                    else:
                        if "imageTwo" in content.keys():
                            content.pop("imageTwo")

                    content["article"] = articleObject.pk
                    contentSerializer = ContentSerializer(data=content)
                    if contentSerializer.is_valid(raise_exception=True):
                        contentSerializer.save()
                    else:
                        return Response(
                            contentSerializer.error_messages,
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                finalData = {"article": {"urlGen": articleObject.urlGen}}
                return Response(finalData, status=status.HTTP_202_ACCEPTED)
            else:
                return Response("Invalid Post", status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response("Invalid Post", status=status.HTTP_406_NOT_ACCEPTABLE)


class ArticlePut_DeleteView(APIView):
    def put(self, request, article_gen, format=None):
        validation = articleValidator(request.data)
        if validation:
            try:
                article = Article.objects.get(urlGen=article_gen)
                data = request.data["article"]
                token = request.auth
                user = Token.objects.get(key=token.key).user
                if user.username != article.author.username:
                    return Response(
                        "Error!! Wrong user", status=status.HTTP_403_FORBIDDEN
                    )
                if not data["articleImage"].startswith("media/"):
                    articleData = {
                        "title": data["articleTitle"],
                        "description": data["articleDescription"],
                        "image": encodeImg(data["articleImage"], "article"),
                    }
                else:
                    articleData = {
                        "title": data["articleTitle"],
                        "description": data["articleDescription"],
                    }
                articleSerializer = ArticleSerializer(
                    article, data=articleData, partial=True
                )
            except:
                return Response(
                    "Incomplete Article Data", status=status.HTTP_406_NOT_ACCEPTABLE
                )
            if articleSerializer.is_valid():
                articleObject = articleSerializer.save()
                Tag.objects.filter(article=articleObject.id).delete()
                tags = data["tags"]
                tags = [tag.lower() for tag in tags]
                for tag in tags:
                    tagData = {"article": articleObject.id, "tag": tag}
                    tagSerializer = TagSerializer(data=tagData)
                    if tagSerializer.is_valid():
                        tagSerializer.save()
                    else:
                        return Response(
                            tagSerializer.error_messages,
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                contents = data["content"]
                oldMax = Content.objects.filter(article=article.id).count()
                newMax = len(contents)

                newContent = []
                for content in contents:
                    if (
                        "imageOne" in content.keys()
                        and type(content["imageOne"]) == str
                        and content["imageOne"].find(";base64,") > 0
                        and not content["imageOne"].startswith("media/")
                    ):
                        content["imageOne"] = encodeImg(content["imageOne"], "Content")
                    else:
                        if "imageOne" in content.keys():
                            content.pop("imageOne")
                    if (
                        "imageTwo" in content.keys()
                        and type(content["imageTwo"]) == str
                        and content["imageTwo"].find(";base64,") > 0
                        and not content["imageTwo"].startswith("media/")
                    ):
                        content["imageTwo"] = encodeImg(content["imageTwo"], "Content")
                    else:
                        if "imageTwo" in content.keys():
                            content.pop("imageTwo")
                    content["article"] = articleObject.pk
                    newContent.append(content)
                if oldMax < newMax:
                    oldContent = Content.objects.filter(article=article.id).order_by(
                        "position"
                    )
                    for index, content in enumerate(newContent):
                        if index < len(oldContent):
                            contentSerializer = ContentSerializer(
                                oldContent[index], data=content
                            )
                            if contentSerializer.is_valid():
                                contentSerializer.save()
                            else:
                                return Response(
                                    contentSerializer.error_messages,
                                    status=status.HTTP_400_BAD_REQUEST,
                                )
                        else:
                            contentSerializer = ContentSerializer(data=content)
                            if contentSerializer.is_valid():
                                contentSerializer.save()
                            else:
                                return Response(
                                    contentSerializer.error_messages,
                                    status=status.HTTP_400_BAD_REQUEST,
                                )

                elif oldMax > newMax:
                    Content.objects.filter(
                        article=article.id, position__gt=(newMax - 1)
                    ).delete()
                    oldContent = Content.objects.filter(article=article.id).order_by(
                        "position"
                    )
                    for index, content in enumerate(newContent):
                        contentSerializer = ContentSerializer(
                            oldContent[index], data=content
                        )
                        if contentSerializer.is_valid():
                            contentSerializer.save()
                        else:
                            return Response(
                                contentSerializer.error_messages,
                                status=status.HTTP_400_BAD_REQUEST,
                            )

                else:
                    oldContent = Content.objects.filter(article=article.id).order_by(
                        "position"
                    )
                    for index, content in enumerate(newContent):
                        contentSerializer = ContentSerializer(
                            oldContent[index], data=content
                        )
                        if contentSerializer.is_valid():
                            contentSerializer.save()
                        else:
                        
                            return Response(
                                contentSerializer.error_messages,
                                status=status.HTTP_400_BAD_REQUEST,
                            )

                finalData = {"article": {"urlGen": articleObject.urlGen}}
                return Response(finalData, status=status.HTTP_202_ACCEPTED)
            else:
                return Response("Invalid Post", status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response("Invalid Post", status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, article_gen, format=None):
        try:
            token = request.auth
            article = Article.objects.get(urlGen=article_gen)
            user = Token.objects.get(key=token.key).user
            if article.author.id == user.id:
                article.delete()
                return Response("Article Deleted", status=status.HTTP_200_OK)
            else:
                return Response("Invalid Article", status=status.HTTP_403_FORBIDDEN)
        except:
            return Response("Invalid Article", status=status.HTTP_403_FORBIDDEN)


def articleListing(request, articles, articleCount):
    # return Response("day start")
    articleHolder = []
    user = None
    if request.META.get("HTTP_AUTHORIZATION") and "Token " in request.META.get(
        "HTTP_AUTHORIZATION"
    ):
        token = str(request.META.get("HTTP_AUTHORIZATION")).split("Token ")[-1]
        if Token.objects.filter(key=token).exists():
            user = Token.objects.get(key=token).user

    for article in articles:
        authorId = User.objects.get(id=article.author_id)
        authorProfile = Profile.objects.get(user=authorId.id)
        tagObject = list(Tag.objects.filter(article=article.id).values_list("tag"))
        tagObject = [item for sublist in tagObject for item in sublist]
        favoriteCount = FavoriteArticle.objects.filter(article=article.id).count()
        if (
            user != None
            and FavoriteArticle.objects.filter(article=article.id, user=user.id).count()
        ):
            favorite = True
        else:
            favorite = False
        temp = {
            "id": article.id,
            "author": {
                "authorId": authorId.id,
                "username": authorId.username,
                "profileImg": decodeImg(authorProfile),
            },
            "creationDate": article.created_at,
            "favorited": favorite,
            "favoriteCount": favoriteCount,
            "tags": tagObject,
            "articleImage": decodeImg(article),
            "articleDescription": article.description,
            "articleTitle": article.title,
            "urlGen": article.urlGen,
        }
        articleHolder.append(temp)
    finalJson = {"articles": articleHolder, "articleCount": articleCount}
    return finalJson


class ArticleListView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request):

        try:
            ##AUTHOR FEED, FAVORITE FEED
            parameters = request.GET  # Gets URL parameters
            if "offset" in parameters.keys() and "limit" in parameters.keys():
                limit = int(parameters["limit"])
                offset = int(parameters["offset"])
                limit = limit + offset
                if ["author", "tags", "favorite", "offset", "limit"] == list(
                    parameters.keys()
                ):
                    return Response("unfinished", status=status.HTTP_200_OK)
                elif ["author", "tags", "offset", "limit"] == list(parameters.keys()):
                    return Response("unfinished", status=status.HTTP_200_OK)
                elif ["author", "favorite", "offset", "limit"] == list(
                    parameters.keys()
                ):
                    return Response("unfinished", status=status.HTTP_200_OK)
                elif ["tags", "favorite", "offset", "limit"] == list(parameters.keys()):
                    return Response("unfinished", status=status.HTTP_200_OK)
                elif "favorite" in parameters.keys():
                    if (
                        Profile.objects.filter(
                            lower_username=parameters["favorite"]
                        ).exists()
                        and Profile.objects.get(
                            lower_username=parameters["favorite"]
                        ).publicFavorite
                    ):
                        user = Profile.objects.get(
                            lower_username=parameters["favorite"]
                        ).user
                        articleCount = FavoriteArticle.objects.filter(user=user).count()
                        articles = [
                            favArticle.article
                            for favArticle in FavoriteArticle.objects.filter(user=user)
                        ]
                        finalJson = articleListing(request, articles, articleCount)
                        return Response(finalJson, status=status.HTTP_200_OK)
                    else:
                        return Response("unfinished", status=status.HTTP_200_OK)
                elif "author" in parameters.keys():
                    author = Profile.objects.get(
                        lower_username=parameters["author"]
                    ).user
                    articleCount = Article.objects.filter(author=author).count()
                    articles = Article.objects.filter(author=author).order_by("-id")[
                        offset:limit
                    ]
                    finalJson = articleListing(request, articles, articleCount)
                    return Response(finalJson, status=status.HTTP_200_OK)
                elif "tags" in parameters.keys():
                    tagParameters = str(parameters["tags"]).split(",")
                    articleIds = Tag.objects.filter(
                        tag=str(tagParameters[0].lower())
                    ).values_list("article_id")
                    articleCount = Article.objects.filter(pk__in=articleIds).count()
                    articles = Article.objects.filter(pk__in=articleIds).order_by(
                        "-id"
                    )[offset:limit]
                    finalJson = articleListing(request, articles, articleCount)
                    return Response(finalJson, status=status.HTTP_200_OK)
                else:
                    articleCount = Article.objects.all().count()
                    articles = Article.objects.all().order_by("-id")[offset:limit]
                    finalJson = articleListing(request, articles, articleCount)
                    return Response(finalJson, status=status.HTTP_200_OK)
            else:
                return Response(
                    "404 invalid request", status=status.HTTP_405_METHOD_NOT_ALLOWED
                )
        except:
            return Response(
                "Broken 404 invalid request", status=status.HTTP_405_METHOD_NOT_ALLOWED
            )


class FavoriteArticleView(APIView):
    def get(self, request, article_id):
        try:
            token = request.auth
            user = Token.objects.get(key=token.key).user
            data = {"user": user.id, "article": article_id}
            serializer = FavoriteArticleSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response("Article Favorited", status=status.HTTP_201_CREATED)
            else:
                return Response(
                    "Article Already Favorited", status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response("Error", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, article_id):
        try:
            token = request.auth
            user = Token.objects.get(key=token.key).user
            fArticle = FavoriteArticle.objects.get(user=user.id, article=article_id)
            fArticle.delete()
            return Response("UnFavorited", status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Not Favorited", status=status.HTTP_400_BAD_REQUEST)


# Comment CommentSerializer
class CommentPostView(APIView):
    def post(self, request, article_comment_id):
        try:
            parameters = request.GET  # Gets URL parameters
            token = request.auth
            content = request.data["comment"]["content"]
            user = Token.objects.get(key=token.key).user
            if 'reply' in parameters:
                if Comment.objects.filter(id=article_comment_id).exists():
                    comment = Comment.objects.get(id=article_comment_id)
                    data = {
                        "author" : user.id,
                        "originalComment" : comment.id,
                        "comment" : content
                    }
                    replySerializer = ReplySerializer(data=data)
                    if replySerializer.is_valid():
                        replySerializer.save()
                        return Response(
                            commentFeed(comment.article.id),
                            status=status.HTTP_200_OK,
                    )
                    else:
                        return Response("Invalid info")
                else:
                    return Response("Comment Doesn't Exist")
            else:
                if Article.objects.filter(id=article_comment_id).exists():
                    article = Article.objects.get(id=article_comment_id)
                    data = {
                        "author" : user.id,
                        "article" : article.id,
                        "comment" : content
                    }
                    commentSerializer = CommentSerializer(data=data)
                    if commentSerializer.is_valid():
                        commentSerializer.save()
                        return Response(
                            commentFeed(article.id),
                            status=status.HTTP_200_OK,
                    )
                    else:
                        return Response(commentSerializer.errors)
                else:
                    return Response("Article Doesn't Exist")
        except:
            return Response("Error")



class CommentGetView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request, article_id):
        try:
            return Response(commentFeed(article_id), status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Error", status.HTTP_400_BAD_REQUEST)


class CommentPutDeleteView(APIView):
    def put(self, request, comment_id):
        try:
            parameters = request.GET  # Gets URL parameters
            token = request.auth
            comment = Comment.objects.get(id=comment_id)
            content = request.data["comment"]["content"]
            user = Token.objects.get(key=token.key).user
            if 'reply' in parameters and Reply.objects.filter(id=comment_id):
                reply = Reply.objects.get(id=comment_id)
                print('hello there')
                data = {
                    "comment" : content
                }
                serializer = ReplySerializer(reply, data=data, partial=True)
                if serializer.is_valid() and user.id == reply.author.id:
                    serializer.save()
                    return Response(
                        commentFeed(reply.originalComment.article.id),
                        status=status.HTTP_200_OK,
                    )
                else:
                    print(serializer.errors)
                    return Response(
                        "Invalid Credentials", status=status.HTTP_400_BAD_REQUEST
                    )
            if user.id == comment.author.id:
                data = model_to_dict(comment)
                data["comment"] = content
                serializer = CommentSerializer(comment, data=data)
                if serializer.is_valid():
                    serializer.save()
                    commentFeed(comment.article.id)
                    return Response(
                        commentFeed(comment.article.id),
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        "Invalid Credentials", status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response("wrong author", status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Invalid Credentials", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, comment_id):
        try:
            parameters = request.GET
            token = request.auth
            print(parameters)
            if "reply" in parameters:
                comment = Reply.objects.get(id=comment_id)
                user = Token.objects.get(key=token.key).user
                if user.id == comment.author.id:
                    comment.delete()
                    return Response(
                        commentFeed(comment.originalComment.article.id),
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        "Invalid Credentials", status=status.HTTP_403_FORBIDDEN
                    )
            else:
                comment = Comment.objects.get(id=comment_id)
                user = Token.objects.get(key=token.key).user
                if user.id == comment.author.id:
                    comment.delete()
                    return Response(
                        commentFeed(comment.article.id),
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        "Invalid Credentials", status=status.HTTP_403_FORBIDDEN
                    )
        except:
            return Response(
                "Comment Doesn't exist", status=status.HTTP_406_NOT_ACCEPTABLE
            )


class TrendingView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request):
        results = Trending.objects.raw(
            """
            select id, article_id, sum(count) as total                       
            from Article_trending group by article_id 
            order by total DESC"""
        )[:4]
        results = [result.article for result in results]
        return Response(articleListing(request, results, len(results)))


class FeedView(APIView):
    authentication_classes = ()
    permission_classes = ()
    def get(self, request):
        parameters = request.GET  # Gets URL parameters
        if (
            "type" in parameters.keys()
            and "user" in parameters.keys()
            and "offset" in parameters.keys()
            and "limit" in parameters.keys()
            and Profile.objects.filter(lower_username=parameters['user']).exists()
        ):
            limit = int(parameters["limit"])
            offset = int(parameters["offset"])
            limit = limit + offset
            profile = Profile.objects.get(lower_username=parameters['user'].lower())
            if parameters['type'] == 'favorite':
                if profile.publicFavorite:
                    articles = [article.article for article in FavoriteArticle.objects.filter(user=profile.user)]
                    return Response(articleListing(request, articles[offset:limit], len(articles[offset:limit])))
                else:
                    return Response("Private", status=status.HTTP_204_NO_CONTENT)
            elif parameters['type'] == 'comment':
                if profile.publicComment:
                    content =[{
                        "article": {
                            'title' : comment.article.title,
                            'urlGen' : comment.article.urlGen,
                        },
                        "id" : comment.id,
                        "content" : comment.comment,
                        "created_at" : comment.created_at,
                        "updated_at" : comment.updated_at,
                    } for comment in Comment.objects.filter(author=profile.user).order_by('-updated_at')]
                    finaljson = {"comments" : content}
                    return Response(finaljson)
                else:    
                    return Response("Private", status=status.HTTP_204_NO_CONTENT)

            else:
                return Response('error', status=status.HTTP_400_BAD_REQUEST)

        elif len(parameters) == 0:
            results = Trending.objects.raw(
            """
            select id, article_id, sum(count) as total                       
            from Article_trending group by article_id 
            order by total DESC"""
            )[:4]
            results = [result.article for result in results]
            return Response(articleListing(request, results, len(results)))
        else:
            return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)
