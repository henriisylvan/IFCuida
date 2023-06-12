const ADICIONAR_VACINA_BUTTON_ID = 'adicionar_vacina';
const ADICIONAR_VACINA_MODAL_ID = 'adicionar_vacina_modal';
const RESETAR_FORM_ADICIONAR_VACINA_ID = 'reset_form_adcionar_vacina';

const ADICIONAR_VACINA_BUTTON = document.getElementsByClassName(ADICIONAR_VACINA_BUTTON_ID)[0];
const RESETAR_FORM_ADICIONAR_VACINA = document.getElementsByClassName(RESETAR_FORM_ADICIONAR_VACINA_ID)[0];

RESETAR_FORM_ADICIONAR_VACINA.onclick = ADICIONAR_VACINA_BUTTON.onclick = () => alterarVisibilidade(ADICIONAR_VACINA_MODAL_ID);