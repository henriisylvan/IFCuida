const INPUTS_ESPECIFICACAO_FORM_SAUDE = document.getElementsByClassName('especificacao_form_info_saude_input');
const INPUTS_RADIO_FORM_SAUDE = document.getElementsByClassName('radio_form_info_saude_input');

const QUESTOES_DEPENDENTES_FORM_SAUDE = document.querySelectorAll('.sublista_formulario_info_saude .item_formulario_info_saude');


const especificacaoObserver = gerarObserverAtributo('disabled', callbackGerenciarEspecificacao);
const questaoDependenteObserver = gerarObserverAtributo('disabled', callbackGerenciarQuestaoDependente);


for (const input of INPUTS_ESPECIFICACAO_FORM_SAUDE) {
    especificacaoObserver.observe(input, { attributes: true });
    callbackGerenciarEspecificacao({ target: input });
};

for (const questao of QUESTOES_DEPENDENTES_FORM_SAUDE) {
    const input = questao.getElementsByClassName('radio_form_info_saude_input')[0];
    
    questaoDependenteObserver.observe(input, { attributes: true });
    callbackGerenciarQuestaoDependente({ target: input });
};

for (const input of INPUTS_RADIO_FORM_SAUDE) adicionarEventoRadioInput(input);
for (const input of INPUTS_RADIO_FORM_SAUDE) input.onchange();


function adicionarEventoRadioInput(input) {
    const questaoId = input.getAttribute('data-questao-pk');
    const alteraEspecificacao = input.getAttribute('data-ativa-especificacao');
    const alteraQuestoesDependentes = input.getAttribute('data-ativa-questao-dependente');

    input.onchange = () => {
        console.log(input.checked)
        if (input.checked) {
            if (alteraEspecificacao) alterarEstadoEspecificacao(Number(alteraEspecificacao), questaoId);
            if (alteraQuestoesDependentes) {
                console.log('test1')
                alterarEstadoQuestoesDependentes(Number(alteraQuestoesDependentes), questaoId);
            };
        };
    };
};

function alterarEstadoEspecificacao(ativar, questaoId) {
    const especificacaoInputElemento = document.querySelector(`[data-questao-id="${questaoId}"].especificacao_form_info_saude_container > .especificacao_form_info_saude_input`);

    especificacaoInputElemento.disabled = !(especificacaoInputElemento.required = ativar);

    if (!ativar) especificacaoInputElemento.value = '';
};

function alterarEstadoQuestoesDependentes(ativar, questaoId) {
    const radiosQuestoesDependentes = document.querySelectorAll(`[data-questao-pre-requisitada-id="${questaoId}"].sublista_formulario_info_saude .radio_form_info_saude_input`);

    for (const radio of radiosQuestoesDependentes) {
        radio.disabled = !ativar;

        if (!ativar && radio.getAttribute('data-pre-selecionada')) {
            radio.checked = true
            radio.onchange()
        };
    };      
};

function gerarObserverAtributo(atributo, callback) {
    return new MutationObserver((listaMutacoes) => {
        for(const mutacao of listaMutacoes)
            if (mutacao.type === 'attributes' && mutacao.attributeName == atributo) 
                callback(mutacao);
    });
};

function callbackGerenciarEspecificacao(mutacao) {
    const especificacaoElemento = mutacao.target.parentElement.getElementsByClassName('especificacao_form_info_saude_label')[0];
    especificacaoElemento.style.color = mutacao.target.disabled ? '#7c7c7c' : '#444444';
};

function callbackGerenciarQuestaoDependente(mutacao) {
    const questaoElemento = mutacao.target.parentElement.parentElement;
    questaoElemento.style.color = mutacao.target.disabled ? '#7c7c7c' : '#444444';
};



    



