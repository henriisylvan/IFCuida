from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', lambda req: redirect('login'), name=''),
    path('login/', views.login_view, name = 'login'),
    path('logout/', views.logout_view, name = 'logout')
]