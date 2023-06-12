const FORM_ADICIONAR_VACINA = document.getElementsByClassName('adicionar_vacina_form')[0];
const COMPROVANTE_LABEL = document.getElementsByClassName('comprovante_vacina_label')[0];
const COMPROVANTE_INPUT = document.getElementsByClassName('foto_comprovante_vacina')[0];
const COMPROVANTE_IMG = document.getElementsByClassName('icon_comprovante_vacina')[0];
const COMPROVANTE_LEGENDA = document.getElementsByClassName('legenda_foto_comprovante_vacina')[0];
const ICON_COMPROVANTE_SRC = COMPROVANTE_IMG.src;

COMPROVANTE_INPUT.addEventListener('change', () => lerImagem(COMPROVANTE_INPUT, alterarInputComprovante));
FORM_ADICIONAR_VACINA.addEventListener('reset', resetarInputComprovante);

function alterarInputComprovante(event) {
    COMPROVANTE_IMG.src = event.target.result;
    COMPROVANTE_LEGENDA.innerHTML = 'Alterar a foto do comprovante';

    if (!COMPROVANTE_LABEL.classList.contains('comprovante_carregado'))
        COMPROVANTE_LABEL.classList.add('comprovante_carregado');
};

function resetarInputComprovante() {
    COMPROVANTE_IMG.src = ICON_COMPROVANTE_SRC;
    COMPROVANTE_LEGENDA.innerHTML = 'Adicione a foto do comprovante';
    COMPROVANTE_LABEL.classList.remove('comprovante_carregado');
};