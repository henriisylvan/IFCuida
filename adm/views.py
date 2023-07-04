from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from IFCuida.decorators import only_superadmin
from aluno.models import VacinasAdicionadas
from django.conf import settings


@login_required
@only_superadmin('/aluno/home')
def home_view(request):
    renderContexto = {
        "matricula": request.user.username,
        "nome": (request.user.first_name or '') + ' ' + (request.user.last_name or '')
    }

    return render(request, 'adm/home.html', renderContexto)


@login_required
@only_superadmin('/aluno/vacinas')
def verificacoes_pendentes_view(request):
    renderContexto = {
        "matricula": request.user.username,
        "nome": (request.user.first_name or '') + ' ' + (request.user.last_name or ''),
        "tipoUsuario": 'adm',
        "paginaAtual": 'verificacoes-pendentes',
    }
    
    if (request.method == 'POST'):
        try:
            vacinaId = request.POST.get('vacina')

            vacinaVerificada = VacinasAdicionadas.objects.get(id = vacinaId)

            vacinaVerificada.estado = request.POST.get('status')
            vacinaVerificada.motivo_rejeicao = request.POST.get('motivo_rejeicao') or None

            vacinaVerificada.save()

            renderContexto['sucesso'] = True
        except:
            renderContexto['erro'] = 'Ocorreu um erro, tente novamente.'

    renderContexto["vacinasAdicionadas"] = VacinasAdicionadas.objects.filter(estado = 'pendente')

    return render(request, 'adm/verificacoes-pendentes.html', renderContexto)


def detalhe_verificacao_view(request):
    if (not(request.method == 'POST')):
        return redirect('verificacoes-pendentes')

    vacinaId = request.POST.get('vacinaId')

    vacina = VacinasAdicionadas.objects.get(id = vacinaId)
    
    detalhes = {
        'id': vacina.pk,
        'data': '/'.join(reversed(vacina.data.isoformat().split('-'))),
        'comprovante': settings.MEDIA_URL + vacina.comprovante.name,
        'usuario': (vacina.usuario_fk.first_name or '') + ' ' + (vacina.usuario_fk.last_name or ''),
        'vacina': vacina.vacina_fk.nome
    }
    
    return JsonResponse(detalhes)
