const MENSAGEM_CONCLUIDO_BUTTON_ID = 'mensagem_concluido_botao_ok';
const MENSAGEM_CONCLUIDO_MODAL_ID = 'mensagem_concluido_modal';

const MENSAGEM_CONCLUIDO_BUTTON = document.getElementsByClassName(MENSAGEM_CONCLUIDO_BUTTON_ID)[0];
const MENSAGEM_CONCLUIDO_MODAL = document.getElementsByClassName(MENSAGEM_CONCLUIDO_MODAL_ID)[0];

MENSAGEM_CONCLUIDO_BUTTON.onclick = () => alterarVisibilidade(MENSAGEM_CONCLUIDO_MODAL_ID);

MENSAGEM_CONCLUIDO_MODAL.onclick = evento => {
    if (evento.target == MENSAGEM_CONCLUIDO_MODAL)
        alterarVisibilidade(MENSAGEM_CONCLUIDO_MODAL_ID);
};
