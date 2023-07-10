from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', lambda req: redirect('home'), name=''),
    path('home/', views.home_view, name='home'),
    path('vacinas/', views.vacinas_view, name='vacinas'),
    path('informacoes-saude/', views.informacoes_saude_view, name='informacoes-saude')
]