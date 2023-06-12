const DETALHE_VERIFICACAO_MODAL_ID = 'detalhe_verificacao_modal';

const BOTOES_DETALHE_VACINAS = document.getElementsByClassName('exibir_detalhe_verificacao');
const BOTAO_CANCELAR_VERIFICACAO = document.getElementsByClassName('detalhe_verificacao_cancelar')[0];
const BOTAO_RECUSAR_VERIFICACAO = document.getElementsByClassName('detalhe_verificacao_recusar')[0];
const BOTAO_CANCELAR_REJEICAO = document.getElementsByClassName('motivo_rejeicao_botao_cancelar')[0];

const MOTIVO_REJEICAO_MODAL = document.getElementsByClassName('motivo_rejeicao_modal')[0];
const MOTIVO_REJEICAO_STATUS = document.getElementsByClassName('motivo_rejeicao_vacina_status')[0];
const MOTIVO_REJEICAO_INPUT = document.getElementsByClassName('motivo_rejeicao_input')[0];

//temporário
for (const element of BOTOES_DETALHE_VACINAS) 
    element.onclick = () => alterarVisibilidade(DETALHE_VERIFICACAO_MODAL_ID);

BOTAO_CANCELAR_VERIFICACAO.onclick = () => alterarVisibilidade(DETALHE_VERIFICACAO_MODAL_ID);
BOTAO_RECUSAR_VERIFICACAO.onclick = statusRecusado;
BOTAO_CANCELAR_REJEICAO.onclick = rejeicaoCancelada;

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