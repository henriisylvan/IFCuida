from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from IFCuida.decorators import only_normal_user
from adm.models import Vacinas, QuestaoFormSaude, RespostaQuestaoFormSaude
from .models import VacinasAdicionadas, RespostaSelecionadaFormSaude, EspecificacaoFormSaude


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
        "paginaAtual": 'vacinas'
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
@only_normal_user('/adm/home')
def informacoes_saude_view(request):
    renderContexto = {
        "matricula": request.user.username,
        "nome": (request.user.first_name or '') + ' ' + (request.user.last_name or ''),
        "tipoUsuario": 'aluno',
        "paginaAtual": 'informacoes-saude',
        "editar": bool(request.GET.get('editar')),
        "questoesSemPreRequisito": QuestaoFormSaude.objects.filter(pre_requisito__isnull = True),
        "questoesComPreRequisito": QuestaoFormSaude.objects.filter(pre_requisito__isnull = False),
        "respostas": RespostaQuestaoFormSaude.objects.all()
    }

    if (request.method == 'POST'):
        try:
            for questao in QuestaoFormSaude.objects.all():
                respostaStr = request.POST.get(f'questao_{questao.pk}')
                especificacaoStr = request.POST.get(f'especificacao_questao_{questao.pk}')

                if (respostaStr != None):
                    respostaId = respostaStr.split('_')[1]
                    respostaObj = RespostaQuestaoFormSaude.objects.get(id = respostaId)
                else:
                    respostaObj = RespostaQuestaoFormSaude.objects.get(questao_fk = questao, pre_selecionada = True)

                respostaExistente = RespostaSelecionadaFormSaude.objects.filter(questao_fk = questao, usuario_fk = request.user)

                if (respostaExistente.exists()):
                    respostaExistente.update(resposta_fk = respostaObj)
                else:
                    respostaData = {
                        'usuario_fk': request.user,
                        'questao_fk': questao, 
                        'resposta_fk': respostaObj
                    }

                    novaRespostaSelecionada = RespostaSelecionadaFormSaude(**respostaData)
                    novaRespostaSelecionada.save()

                if (especificacaoStr != None):
                    especificacaoExistente = EspecificacaoFormSaude.objects.filter(questao_fk = questao, usuario_fk = request.user)

                    if (especificacaoExistente.exists()):
                        especificacaoExistente.update(descricao = especificacaoStr)
                    else:
                        especificacaoData = {
                            'descricao': especificacaoStr, 
                            'usuario_fk': request.user, 
                            'questao_fk': questao
                        }
                        
                        novaEspecificacao = EspecificacaoFormSaude(**especificacaoData)
                        novaEspecificacao.save()

            renderContexto['sucesso'] = True
        except:
            renderContexto['erro'] = 'Ocorreu um erro, tente novamente.'
    
    renderContexto['respostasSelecionadasQuestoesNaoDependentes'] = RespostaSelecionadaFormSaude.objects.filter(usuario_fk = request.user,  questao_fk__pre_requisito__isnull=True)
    renderContexto['respostasSelecionadasQuestoesDependentes'] = RespostaSelecionadaFormSaude.objects.filter(usuario_fk = request.user, questao_fk__pre_requisito__isnull=False)
    renderContexto['especificacoes'] = EspecificacaoFormSaude.objects.filter(usuario_fk = request.user)

    if (renderContexto['respostasSelecionadasQuestoesNaoDependentes'].exists() and not(renderContexto['editar'])):
        return render(request, 'aluno/informacoes-saude-preenchido.html', renderContexto)
    else:
        return render(request, 'aluno/informacoes-saude-nao-preenchido.html', renderContexto)