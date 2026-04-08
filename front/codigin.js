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

// Função para cadastrar
function cadastrar() {
    // Obter os inputs (nome, cidade e idade)
    let nome = document.getElementById("nome").value;
    let cidade = document.getElementById("cidade").value;
    let idade = parseInt(document.getElementById("idade").value);

    // Validação local antes de enviar a requisição
    if (!nome) {
        alert("O nome é obrigatório!");
        return;
    }
    if (!cidade) {
        alert("A cidade é obrigatória!");
        return;
    }
    if (isNaN(idade) || idade < 0 || idade > 120) {
        alert("A idade precisa estar entre 0 e 120!");
        return;
    }

    // Requisição
    fetch("http://localhost:5028/pessoa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            cidade: cidade,
            idade: idade
        })
    })
    .then(retorno => {
        if(retorno.status === 400) {
            // Extrair a mensagem da resposta
            return retorno.json().then(falha => {
                // Exibe a mensagem em um alert
                alert(falha.mensagem);
                throw new Error(falha.mensagem);
            });
        }else if(retorno.status === 201) {
            // Processa a resposta se tudo estiver ok
            return retorno.json();
        }
    })
    .then(objPessoa => {
        // Cadastrar pessoa no vetor
        vetor.push(objPessoa);

        // Atualizar tabela
        let tabela = document.getElementById("tabela");
        
        let linha = tabela.insertRow(-1);
        
        let colunaIndice = linha.insertCell(0);
        let colunaNome = linha.insertCell(1);
        let colunaCidade = linha.insertCell(2);
        let colunaIdade = linha.insertCell(3);
        let colunaSelecionar = linha.insertCell(4);

        colunaIndice.innerHTML = vetor.length;
        colunaNome.innerHTML = objPessoa.nome;
        colunaCidade.innerHTML = objPessoa.cidade;
        colunaIdade.innerHTML = objPessoa.idade;
        colunaSelecionar.innerHTML = `<button class="btn btn-primary" onclick="selecionarPessoa(${vetor.length - 1})">Selecionar</button>`;

        // Mensagem de sucesso
        alert("Pessoa cadastrada com sucesso!");

        // Limpar os elementos de formulário
        document.getElementById("nome").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("idade").value = "";
    });
}

// Índice da pessoa selecionada
let indicePessoaSelecionada = -1;

// Função para selecionar uma pessoa
function selecionarPessoa(indice) {

    // Especificar o índice da pessoa selecionada
    indicePessoaSelecionada = indice;
    
    // Exibir as informações nos inputs
    document.getElementById("nome").value = vetor[indice].nome;
    document.getElementById("cidade").value = vetor[indice].cidade;
    document.getElementById("idade").value = vetor[indice].idade;

    // Alterar a visibilidade dos botões
    document.getElementById("btnCadastrar").style.display = "none";
    document.getElementById("btnAlterar").style.display = "inline-block";
    document.getElementById("btnRemover").style.display = "inline-block";
    document.getElementById("btnCancelar").style.display = "inline-block";
}

// Função para alterar
function alterar() {
    // Obter os inputs (nome, cidade e idade)
    let nome = document.getElementById("nome").value;
    let cidade = document.getElementById("cidade").value;
    let idade = parseInt(document.getElementById("idade").value);

    // Validação local antes de enviar a requisição
    if (!nome) {
        alert("O nome é obrigatório!");
        return;
    }
    if (!cidade) {
        alert("A cidade é obrigatória!");
        return;
    }
    if (isNaN(idade) || idade < 0 || idade > 120) {
        alert("A idade precisa estar entre 0 e 120!");
        return;
    }
    
    // Requisição
    fetch(`http://localhost:5028/pessoa/${vetor[indicePessoaSelecionada].codigo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            cidade: cidade,
            idade: idade
        })
    })
    .then(retorno => {
        if(retorno.status === 400 || retorno.status == 404) {
            // Extrair a mensagem da resposta
            return retorno.json().then(falha => {
                // Exibe a mensagem em um alert
                alert(falha.mensagem);
                throw new Error(falha.mensagem);
            });
        }else if(retorno.status === 200) {
            // Processa a resposta se tudo estiver ok
            return retorno.json();
        }
    })
    .then(objPessoa => {
        // Atualiza o vetor
        vetor[indicePessoaSelecionada] = objPessoa;

        // Atualizar tabela
        let tabela = document.getElementById("tabela");
        
        let linha = tabela.rows[indicePessoaSelecionada];

        linha.cells[1].innerHTML = objPessoa.nome;
        linha.cells[2].innerHTML = objPessoa.cidade;
        linha.cells[3].innerHTML = objPessoa.idade;

        // Mensagem de sucesso
        alert("Pessoa alterada com sucesso!");

        // Limpar os elementos de formulário
        document.getElementById("nome").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("idade").value = "";

        // Alterar a visibilidade dos botões
        document.getElementById("btnCadastrar").style.display = "inline-block";
        document.getElementById("btnAlterar").style.display = "none";
        document.getElementById("btnRemover").style.display = "none";
        document.getElementById("btnCancelar").style.display = "none";
    });
}
function remover() {

    fetch(`http://localhost:5028/pessoa/${vetor[indicePessoaSelecionada].codigo}`, {
        method: "DELETE"
    })
    .then(async (res) => {

        // Se NÃO tem conteúdo
        if (res.status === 204) return null;

        // Pega como texto primeiro (SEMPRE seguro)
        const text = await res.text();

        // Se vier vazio
        if (!text) return null;

        // Converte pra JSON
        const data = JSON.parse(text);

        // Tratamento de erro
        if (!res.ok) {
            alert(data.mensagem || "Erro ao remover");
            throw new Error(data.mensagem);
        }

        return data;
    })
    .then(() => {
        // Atualização da tela (igual você já fez)
        vetor.splice(indicePessoaSelecionada, 1);
        document.getElementById("tabela").deleteRow(indicePessoaSelecionada);

        alert("Pessoa Removida com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("idade").value = "";

        document.getElementById("btnCadastrar").style.display = "inline-block";
        document.getElementById("btnAlterar").style.display = "none";
        document.getElementById("btnRemover").style.display = "none";
        document.getElementById("btnCancelar").style.display = "none";
    })
    .catch(err => {
        console.error("Erro:", err);
    });
}

// Função para cancelar
function cancelar() {

    // Limpar os elementos de formulário
    document.getElementById("nome").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("idade").value = "";

    // Alterar a visibilidade dos botões
    document.getElementById("btnCadastrar").style.display = "inline-block";
    document.getElementById("btnAlterar").style.display = "none";
    document.getElementById("btnRemover").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none"; 
}


