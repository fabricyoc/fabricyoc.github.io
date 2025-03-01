var botao = document.getElementById('btnContato');
botao.addEventListener('click', clicar);
botao.addEventListener('mouseenter', entrar);
botao.addEventListener('mouseout', sair);


function entrar(){
    botao.style.background = 'green';
    botao.style.color = 'white';
}
function sair(){
    botao.style.background = 'white';
    botao.style.color = '#FF9000';
}
function clicar(){
    
}
