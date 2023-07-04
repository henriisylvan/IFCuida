from django.db import models


class Vacinas(models.Model):
    nome = models.CharField(max_length=500)

