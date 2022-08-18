from django.urls import path, re_path,include
from rest_framework.documentation import include_docs_urls
from django.conf.urls.static import static
from django.conf import settings
from .views import EmailMetaRegistration, EmailResendView, AllTagList
urlpatterns = [
    path('<str:djangoToken>/<str:secretToken>/',EmailMetaRegistration.as_view(),name = 'emailMeta' ),
    path('email/', EmailResendView.as_view(),name='emailResend'),
    path('taglist/', AllTagList.as_view(),name='mastertaglist'),
] 
