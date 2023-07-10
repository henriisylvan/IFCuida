from django import template

register = template.Library()


@register.filter
def filtrar_resposta_por_questao(respostas, questao):
    return respostas.filter(questao_fk=questao)


@register.filter
def filtrar_questoes_dependentes_por_questao(questoesDependentes, questao):
    questoes = questoesDependentes.filter(pre_requisito=questao)

    return questoes if questoes.exists() else None


@register.filter
def encontrar_resposta_selecionada_por_questao(respostas, questao):
    try:
        resposta = respostas.get(questao_fk=questao)
        return resposta
    except:
        return None


@register.filter
def checar_existe_resposta_selecionada(respostas, questao):
    resposta = respostas.filter(questao_fk=questao)

    return resposta.exists()
        

@register.filter
def encontrar_especificacao_por_questao(especificacoes, questao):
    try:
        especificacao = especificacoes.get(questao_fk=questao)
        return especificacao
    except:
        return None


@register.filter
def filtrar_respostas_questoes_dependentes_por_questao(repostasQstDependentes, questao):
    respostas = repostasQstDependentes.filter(questao_fk__pre_requisito=questao)

    return respostas if respostas.exists() else None