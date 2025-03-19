function formatarMoeda(valor) {
    // Formatar o número como moeda com separador de milhar como ponto
    let formatted = new Intl.NumberFormat('pt-BR', {
        // style: 'currency',
        currency: 'BRL'
    }).format(valor);

    // Substituir o ponto decimal por vírgula
    let partes = formatted.split(',');  // Dividir o valor nas partes inteira e decimal
    if (partes.length > 1) {
        // Se tiver parte decimal, substituir ponto por vírgula
        partes[1] = partes[1].replace('.', ',');
    }

    // Juntar as partes novamente
    return partes.join(',');
}

function limpar(e) {
    e.preventDefault();  // Impede o comportamento padrão do link (navegação)
    document.getElementById("expressao").value = '';  // Limpa o campo de expressão
    document.getElementById("resultado").textContent = '';  // Limpa o resultado, se necessário
    document.getElementById("limpar").style = "display: none;";
    // Coloca o foco novamente no campo de expressão para manter o teclado visível
    document.getElementById("expressao").focus();

}

function calcular() {
    let exp = document.getElementById("expressao");
    let resultado = document.getElementById("resultado");
    document.getElementById("limpar").style = "display: block;";

    // Se o campo estiver vazio, desaparece
    if (exp.value.trim() === '') {
        document.getElementById("limpar").style = "display: none;";
        resultado.textContent = '';
        return;
    }

    try {
        // Substituir "x" por "*" e avaliar a expressão de forma segura
        let expressaoCorrigida = exp.value.replace(/x/g, '*').replace(/,/g, '.');
        let calculo = new Function('return ' + expressaoCorrigida)();

        // Limitar o resultado a duas casas decimais
        calculo = calculo.toFixed(2);

        // Formatar o resultado com separadores corretos
        calculo = formatarMoeda(calculo);

        resultado.textContent = "Resultado: " + calculo;
        resultado.style = "color:black;";
    } catch (error) {
        resultado.textContent = "Erro!";
        resultado.style = "color: red;"
    }
}

/**
 * Sena
 */
function gerarNumero() {
    let min = 1;
    let max = 60;
    let numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numberRandom;
}

function gerarListaNumeros() {
    // Set garante a unicidade
    let numbers = new Set();

    // Gerar 6 números únicos
    while (numbers.size < 6) {
        // Adiciona um número ao Set, se for único
        numbers.add(gerarNumero());
    }

    // Converter o Set para um array e retornar o array ordenado
    return [...numbers].sort((a, b) => a - b);
}

function gerarApostas() {
    let qntApostas = document.getElementById("quantidade-apostas").value;
    let listaApostas = document.getElementById("lista-apostas"); // ul

    // Limpar a lista de apostas antes de adicionar novas apostas
    listaApostas.innerHTML = '';

    // Exibe o botão limpar
    document.getElementById("btnLimpar").style.display = "block";

    for (let i = 0; i < qntApostas; i++) {
        const li = document.createElement("li");

        // Adiciona um evento de clique para copiar o conteúdo do <li>
        li.onclick = function () {
            copiarParaAreaDeTransferencia(li.textContent);
        };


        // Gerar os números da aposta
        let listaNumeros = gerarListaNumeros();

        // Adicionar os números ao <li> como texto
        // Junta os números em uma string separada por vírgulas
        li.textContent = listaNumeros.join(", ");

        // Adiciona o <li> à lista de apostas
        listaApostas.appendChild(li);
    }
    // setava 1 para qntApostas quando gerava as apostas
    // document.getElementById("quantidade-apostas").value = "1";
}

function limparApostas() {
    // seleciona todos os li
    const linhas = document.querySelectorAll("li");

    // remove todas as li
    linhas.forEach(i => i.remove());

    // seta 1 para qntApostas
    document.getElementById("quantidade-apostas").value = "1";

    // remove o botão Limpar do HTML
    document.getElementById("btnLimpar").style.display = "none";
}

function copiarParaAreaDeTransferencia(texto) {
    // Usando a Clipboard API para copiar o texto para a área de transferência
    navigator.clipboard.writeText(texto)
        .then(function () {
            alert("Texto copiado para a área de transferência!");
        })
        .catch(function (err) {
            console.error("Erro ao copiar o texto: ", err);
        });
}

function verificarTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão
        gerarApostas(); // Chama a função desejada
    }
}
