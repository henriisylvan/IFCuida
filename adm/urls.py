from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', lambda req: redirect('home'), name=''),
    path('home/', views.home_view, name='home'),
    path('verificacoes-pendentes/', views.verificacoes_pendentes_view, name='verificacoes-pendentes'),
    path('verificacoes-pendentes/detalhe-verificacao', views.detalhe_verificacao_view, name='detalhe-verificacao')
]