// formata o resultado no padrão brasileiro
function formatarMoeda(valor) {
    let formatted = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL'
    }).format(valor);
    let partes = formatted.split(',');
    if (partes.length > 1) {
        partes[1] = partes[1].replace('.', ',');
    }
    return partes.join(',');
}

// limpa as informações em tela
function limpar(e) {
    e.preventDefault();
    document.getElementById("expressao").value = '';
    document.getElementById("resultado").textContent = '';
    document.getElementById("limpar").style.display = "none";
    document.getElementById("expressao").focus();
}

// realiza o calculo
function calcular() {
    let exp = document.getElementById("expressao");
    let resultado = document.getElementById("resultado");
    document.getElementById("limpar").style.display = "block";

    if (exp.value.trim() === '') {
        document.getElementById("limpar").style.display = "none";
        resultado.textContent = '';
        return;
    }

    try {
        let expressaoCorrigida = exp.value.replace(/x/g, '*').replace(/,/g, '.');
        expressaoCorrigida = resolverFatoriais(expressaoCorrigida);
        let calculo = new Function('return ' + expressaoCorrigida)();
        calculo = calculo.toFixed(2);
        calculo = formatarMoeda(calculo);

        resultado.textContent = "Resultado: " + calculo;
        resultado.style.color = "black";
    } catch (error) {
        resultado.textContent = "Erro!";
        resultado.style.color = "red";
    }
}

function fatorial(n) {
    if (n === 0 || n === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

function resolverFatoriais(exp) {
    return exp.replace(/(\d+)!/g, (match, numero) => fatorial(Number(numero)));
}

/**
 * Mega sena
 */

function gerarNumero() {
    let min = 1, max = 60;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarListaNumeros() {
    let numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(gerarNumero());
    }
    return [...numbers].sort((a, b) => a - b);
}

function gerarApostas() {
    let qntApostas = document.getElementById("quantidade-apostas").value;
    let listaApostas = document.getElementById("lista-apostas");
    listaApostas.innerHTML = '';
    document.getElementById("btnLimpar").style.display = "block";

    for (let i = 0; i < qntApostas; i++) {
        const li = document.createElement("li");
        li.onclick = function () { copiarParaAreaDeTransferencia(li.textContent); };
        li.textContent = gerarListaNumeros().join(", ");
        listaApostas.appendChild(li);
    }

    // rolar o scroll da lista de apostas suavemente para o topo
    listaApostas.scrollTo({ top: 0, behavior: 'smooth' });
}

function limparApostas() {
    document.querySelectorAll("li").forEach(i => i.remove());
    document.getElementById("quantidade-apostas").value = "1";
    document.getElementById("btnLimpar").style.display = "none";
}

function copiarParaAreaDeTransferencia(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => alert("Texto copiado para a área de transferência!"))
        .catch(err => console.error("Erro ao copiar o texto: ", err));
}

function verificarTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        gerarApostas();
    }
}
