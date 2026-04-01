// Vetor
let vetor = [];

// Função para listar todas as pessoas
fetch("http://localhost:5028/pessoa")
.then(retorno => retorno.json())
.then(pessoas => vetor = pessoas)
.then(() => {

    // Obter o elemento de tabela (tbody)
    let tabela = document.getElementById("tabela");

    // Laço de repetição
    for(let indice=0; indice<vetor.length; indice++){

        // Criar linha de tabela (tr)
        let linha = tabela.insertRow(-1);

        // Criar coluna de tabela (td)
        let colunaIndice = linha.insertCell(0);
        let colunaNome = linha.insertCell(1);
        let colunaCidade = linha.insertCell(2);
        let colunaIdade = linha.insertCell(3);
        let colunaSelecionar = linha.insertCell(4);

        // Especificar valores de cada coluna
        colunaIndice.innerHTML = indice+1;
        colunaNome.innerHTML = vetor[indice].nome;
        colunaCidade.innerHTML = vetor[indice].cidade;
        colunaIdade.innerHTML = vetor[indice].idade;
        colunaSelecionar.innerHTML = `<button class="btn btn-primary" onclick="selecionarPessoa(${indice})">Selecionar</button>`;

    }
});