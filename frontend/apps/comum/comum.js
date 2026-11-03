// Funções usadas por todas as telas

// Endereço do back-end (vem do layout.njk)
var servidorDw3 = document.body.dataset.servidorDw3;

// Faz uma chamada à API enviando o token JWT salvo no login
async function chamarApi(metodo, rota, dados) {
  var opcoes = {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  if (dados) {
    opcoes.body = JSON.stringify(dados);
  }
  var resposta = await fetch(servidorDw3 + rota, opcoes);
  if (resposta.status === 401) {
    alert('Sua sessão expirou. Faça o login novamente.');
    sair();
    return null;
  }
  return await resposta.json();
}

// Limpa os dados do login e volta para a tela de login
function sair() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  document.cookie = 'IsLogged=; path=/; max-age=0';
  window.location.href = '/login';
}

// Mostra uma mensagem de sucesso ou erro no topo da página
function mostrarMensagem(texto, tipo) {
  var caixa = document.getElementById('mensagem');
  caixa.className = 'alert alert-' + tipo;
  caixa.textContent = texto;
  setTimeout(function () {
    caixa.className = 'alert d-none';
  }, 4000);
}

// Cria um botão pequeno para a coluna de ações das tabelas
function criarBotao(texto, classe, acao) {
  var botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'btn btn-sm ' + classe + ' ms-1';
  botao.textContent = texto;
  botao.addEventListener('click', acao);
  return botao;
}

// Cria uma célula de tabela com texto
function criarCelula(texto, classe) {
  var celula = document.createElement('td');
  celula.textContent = texto;
  if (classe) {
    celula.className = classe;
  }
  return celula;
}

// Converte 'AAAA-MM-DD' para 'DD/MM/AAAA'
function formatarData(data) {
  var partes = data.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Formata um número como moeda brasileira
function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
