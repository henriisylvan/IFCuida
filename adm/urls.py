from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home_view, name='home'),
    path('verificacoes-pendentes/', views.verificacoes_pendentes_view, name='verificacoes-pendentes'),
    path('verificacoes-pendentes/detalhe-verificacao', views.detalhe_verificacao_view, name='detalhe-verificacao')
]