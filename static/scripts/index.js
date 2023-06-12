function alterarVisibilidade(seletor, tipoId = false){
    const elementosArr = tipoId ? [ document.getElementById(seletor) ] : document.getElementsByClassName(seletor);

    for (const elemento of elementosArr)
        elemento.style.visibility = elemento.style.visibility == 'visible' ? 'hidden' : 'visible';
};