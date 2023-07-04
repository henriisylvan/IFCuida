from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from IFCuida.decorators import only_normal_user
from adm.models import Vacinas
from .models import VacinasAdicionadas


@login_required
@only_normal_user('/adm/home')
def home_view(request):
    renderContexto = {
        "matricula": request.user.username,
        "nome": (request.user.first_name or '') + ' ' + (request.user.last_name or '')
    }

    return render(request, 'aluno/home.html', renderContexto)


@login_required
@only_normal_user('/adm/verificacoes-pendentes')
def vacinas_view(request):
    renderContexto = {
        "matricula": request.user.username,
        "nome": (request.user.first_name or '') + ' ' + (request.user.last_name or ''),
        "tipoUsuario": 'aluno',
        "paginaAtual": 'vacinas',
    }
    
    if (request.method == 'POST'):
        try:
            dadosVacina = {
                'vacina_fk': Vacinas.objects.get(id = request.POST.get('nome_vacina')),
                'data': request.POST.get('data_aplicacao'),
                'comprovante': request.FILES.get('foto_comprovante'),
                'estado': 'pendente',
                'usuario_fk': request.user
            }

            novaVacina = VacinasAdicionadas(**dadosVacina)
            novaVacina.save()

            renderContexto['sucesso'] = True
        except:
            renderContexto['erro'] = 'Ocorreu um erro, tente novamente.'
    
    renderContexto["vacinasPossiveis"] = Vacinas.objects.all()
    renderContexto["vacinasAdicionadas"] = VacinasAdicionadas.objects.filter(usuario_fk = request.user)
    
    return render(request, 'aluno/vacinas.html', renderContexto)


@login_required
@only_normal_user('/adm/verificacoes-pendentes')
def informacoes_saude_view(request):
    pass