'Use Strict';
//Função para apagar dados automaticamente do formulario;
const limparFormulario = (informacoes) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
}
//Função para atualizar os dados do formulario;
const completeFormulario = (informacoes) => {
    document.getElementById('endereco').value = informacoes.logradouro;
    document.getElementById('bairro').value = informacoes.bairro;
    document.getElementById('estado').value = informacoes.uf;
    document.getElementById('cidade').value = informacoes.localidade;
}
//Validação do CEP;
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//Função para pegar dados da API
const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const informacoes = await dados.json();
        if (informacoes.hasOwnProperty('erro')) {
            document.getElementById('estado').value = "CEP não encontrado!";
        } else {
            completeFormulario(informacoes);
        }
    } else {
        document.getElementById('estado').value = 'CEP incorreto!';
    }
};

//DEclaração de Variaveis
let CEP = document.getElementById('cep').addEventListener('focusout', pesquisarCep);
let Busca = document.getElementById('cep').addEventListener('click', pesquisarCep);
let busca0 = document.getElementById('cep').addEventListener('mouseover', pesquisarCep);
