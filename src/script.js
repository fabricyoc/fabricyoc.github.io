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
