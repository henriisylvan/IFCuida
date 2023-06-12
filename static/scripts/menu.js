const MENU_BUTTON_CLASS = 'menu_button';
const MENU_MODAL_CLASS = 'menu_modal';

const MENU_BUTTON = document.getElementsByClassName(MENU_BUTTON_CLASS)[0];
const MENU_MODAL = document.getElementsByClassName(MENU_MODAL_CLASS)[0];

MENU_BUTTON.onclick = () => alterarVisibilidade(MENU_MODAL_CLASS);

MENU_MODAL.onclick = evento => {
    if (evento.target == MENU_MODAL)
        alterarVisibilidade(MENU_MODAL_CLASS);
};