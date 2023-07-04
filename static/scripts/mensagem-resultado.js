const MENSAGEM_RESULTADO_BUTTON_ID = 'mensagem_resultado_botao_ok';
const MENSAGEM_RESULTADO_MODAL_ID = 'mensagem_resultado_modal';

const MENSAGEM_RESULTADO_BUTTON = document.getElementsByClassName(MENSAGEM_RESULTADO_BUTTON_ID)[0];
const MENSAGEM_RESULTADO_MODAL = document.getElementsByClassName(MENSAGEM_RESULTADO_MODAL_ID)[0];

MENSAGEM_RESULTADO_BUTTON.onclick = () => alterarVisibilidade(MENSAGEM_RESULTADO_MODAL_ID);

MENSAGEM_RESULTADO_MODAL.onclick = evento => {
    if (evento.target == MENSAGEM_RESULTADO_MODAL)
        alterarVisibilidade(MENSAGEM_RESULTADO_MODAL_ID);
};
