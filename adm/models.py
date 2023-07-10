from django.db import models


class Vacinas(models.Model):
    nome = models.CharField(max_length=500)


class QuestaoFormSaude(models.Model):
    descricao = models.TextField()
    tipo = models.CharField(max_length=100)
    necessita_especificacao = models.BooleanField()
    pre_requisito = models.ForeignKey('self', null = True, on_delete=models.CASCADE)


class RespostaQuestaoFormSaude(models.Model):
    valor = models.CharField(max_length=500)
    pre_selecionada = models.BooleanField()
    ativa_especificacao = models.BooleanField()
    ativa_questao_dependente = models.BooleanField()
    questao_fk = models.ForeignKey(QuestaoFormSaude, on_delete=models.CASCADE)