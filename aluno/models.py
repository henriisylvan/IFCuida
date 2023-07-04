from django.db import models
from django.contrib.auth import get_user_model
from IFCuida.utils import GeradorNomeArquivo
from adm.models import Vacinas

class VacinasAdicionadas(models.Model):
    vacina_fk = models.ForeignKey(Vacinas, on_delete=models.CASCADE)
    usuario_fk = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    data = models.DateField()
    comprovante = models.ImageField(upload_to = GeradorNomeArquivo('comprovante-vacina').gerar)
    estado = models.CharField(max_length=50)
    motivo_rejeicao = models.TextField(null=True)
