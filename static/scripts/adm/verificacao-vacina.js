const DETALHE_VERIFICACAO_MODAL_ID = 'detalhe_verificacao_modal';
const MENSAGEM_CARREGAMENTO_MODAL_ID = 'mensagem_carregamento_modal';
const MENSAGEM_ERRO_MODAL_ID = 'mensagem_resultado_modal';

const MENSAGEM_ERRO_TEXTO_ID = document.getElementsByClassName('texto_mensagem_resultado')[0];

const BOTOES_DETALHE_VACINAS = document.getElementsByClassName('exibir_detalhe_verificacao');
const BOTAO_CANCELAR_CARREGAMENTO_DADOS = document.getElementsByClassName("mensagem_carregamento_botao_cancelar")[0];

const BOTAO_CANCELAR_VERIFICACAO = document.getElementsByClassName('detalhe_verificacao_cancelar')[0];
const BOTAO_RECUSAR_VERIFICACAO = document.getElementsByClassName('detalhe_verificacao_recusar')[0];
const BOTAO_CANCELAR_REJEICAO = document.getElementsByClassName('motivo_rejeicao_botao_cancelar')[0];

const MOTIVO_REJEICAO_MODAL = document.getElementsByClassName('motivo_rejeicao_modal')[0];
const MOTIVO_REJEICAO_STATUS = document.getElementsByClassName('motivo_rejeicao_vacina_status')[0];
const MOTIVO_REJEICAO_INPUT = document.getElementsByClassName('motivo_rejeicao_input')[0];
const MOTIVO_REJEICAO_VACINA_ID = document.getElementsByClassName('motivo_rejeicao_vacina_id')[0];

const DETALHE_VERIFICACAO_USUARIO = document.getElementsByClassName('detalhe_verificacao_user')[0];
const DETALHE_VERIFICACAO_VACINA = document.getElementsByClassName('detalhe_verificacao_vacina')[0];
const DETALHE_VERIFICACAO_DATA = document.getElementsByClassName('detalhe_verificacao_data')[0];
const DETALHE_VERIFICACAO_COMPROVANTE = document.getElementsByClassName('detalhe_verificacao_comprovante')[0];


for (const btnDetalhe of BOTOES_DETALHE_VACINAS)
    btnDetalhe.addEventListener("click", function () {
        alterarVisibilidade(MENSAGEM_CARREGAMENTO_MODAL_ID);

        const vacinaId = this.getAttribute("data-vacina-id");

        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "/adm/verificacoes-pendentes/detalhe-verificacao", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("X-CSRFToken", obterCookie("csrftoken"));

        BOTAO_CANCELAR_CARREGAMENTO_DADOS.onclick = () => xhttp.abort();
        
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4)
                if (xhttp.status === 200) {
                    const response = JSON.parse(xhttp.responseText);

                    MOTIVO_REJEICAO_VACINA_ID.value = response.id;
                    DETALHE_VERIFICACAO_USUARIO.innerText = 'Usuário: ' + response.usuario;
                    DETALHE_VERIFICACAO_VACINA.innerText = 'Nome da vacina: ' + response.vacina;
                    DETALHE_VERIFICACAO_DATA.innerText = 'Data de aplicação: ' + response.data;
                    DETALHE_VERIFICACAO_COMPROVANTE.src = response.comprovante;

                    alterarVisibilidade(DETALHE_VERIFICACAO_MODAL_ID);
                } else if (xhttp.status) {
                    MENSAGEM_ERRO_TEXTO_ID.innerText = 'Ocorreu um erro, tente novamente.';
                    alterarVisibilidade(MENSAGEM_ERRO_MODAL_ID);
                };

            alterarVisibilidade(MENSAGEM_CARREGAMENTO_MODAL_ID);
        };

        xhttp.send(`vacinaId=${vacinaId}`);
    });

    
BOTAO_CANCELAR_VERIFICACAO.onclick = verificacaoCancelada
BOTAO_RECUSAR_VERIFICACAO.onclick = statusRecusado;
BOTAO_CANCELAR_REJEICAO.onclick = rejeicaoCancelada;

function verificacaoCancelada() {
    alterarVisibilidade(DETALHE_VERIFICACAO_MODAL_ID);
    DETALHE_VERIFICACAO_COMPROVANTE.src = '';
};

function statusRecusado() {
    MOTIVO_REJEICAO_STATUS.value = 'recusado';
    MOTIVO_REJEICAO_MODAL.style.visibility = 'visible';
    MOTIVO_REJEICAO_INPUT.required = true;
};

function rejeicaoCancelada() {
    MOTIVO_REJEICAO_STATUS.value = 'verificado';
    MOTIVO_REJEICAO_MODAL.style.visibility = 'hidden';
    MOTIVO_REJEICAO_INPUT.required = false;
};