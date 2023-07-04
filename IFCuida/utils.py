import uuid

class GeradorNomeArquivo():
    def __init__(self, caminho = ''):
        self.caminho = caminho if (caminho.endswith('/')) else caminho + '/'

    def gerar(self, model, nomePreDefinido = '.png'):
        extensao = nomePreDefinido.split('.')[-1]
        nomeArquivo = f'{uuid.uuid4()}.{extensao}'

        return self.caminho + nomeArquivo