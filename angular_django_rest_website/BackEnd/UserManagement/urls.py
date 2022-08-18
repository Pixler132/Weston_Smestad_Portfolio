from django.urls import path, re_path,include
from .views import (RegisterView, LoginView, LogoutView, 
    AutoLoginView, ProfilePutView, ProfileGet, AdminLogin)

urlpatterns = [
    path('register/',RegisterView.as_view(),name="register"),
    path('login/',LoginView.as_view(),name="login"),
    path('adminlogin/', AdminLogin.as_view(), name="adminlogin"),
    path('autoLogin/', AutoLoginView.as_view(),name='autoLogin'),
    path('logout/',LogoutView.as_view(),name="logout"),
    path('profileUpdate/', ProfilePutView.as_view(),name='profileUpdate'),
    path('profile/<str:username>/',ProfileGet.as_view(),name='profileGet')
]