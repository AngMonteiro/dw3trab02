// ===== Funções que usam as APIs do back-end =====

async function getAllEspecialidades() {
  return await chamarApi('GET', '/getAllEspecialidades');
}

async function getEspecialidadeByID(id) {
  return await chamarApi('GET', '/getEspecialidadeByID/' + id);
}

async function insertEspecialidade(especialidade) {
  return await chamarApi('POST', '/insertEspecialidade', especialidade);
}

async function updateEspecialidade(id, especialidade) {
  return await chamarApi('PUT', '/updateEspecialidade/' + id, especialidade);
}

async function deleteEspecialidade(id) {
  return await chamarApi('DELETE', '/deleteEspecialidade/' + id);
}

// ===== Funções da tela =====

async function carregarTabela() {
  var resposta = await getAllEspecialidades();
  if (!resposta) return;
  var tabela = document.getElementById('tabelaEspecialidades');
  tabela.innerHTML = '';

  if (resposta.registro.length === 0) {
    tabela.innerHTML = '<tr><td colspan="4" class="text-center text-secondary">Nenhuma especialidade cadastrada.</td></tr>';
    return;
  }

  resposta.registro.forEach(function (item) {
    var linha = document.createElement('tr');
    linha.appendChild(criarCelula(item.especialidadeid));
    linha.appendChild(criarCelula(item.codigo));
    linha.appendChild(criarCelula(item.descricao));
    var acoes = criarCelula('', 'text-end text-nowrap');
    acoes.appendChild(criarBotao('Editar', 'btn-outline-primary', function () { editar(item.especialidadeid); }));
    acoes.appendChild(criarBotao('Excluir', 'btn-outline-danger', function () { excluir(item.especialidadeid); }));
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
}

async function editar(id) {
  var resposta = await getEspecialidadeByID(id);
  if (!resposta || resposta.registro.length === 0) return;
  var item = resposta.registro[0];
  document.getElementById('especialidadeid').value = item.especialidadeid;
  document.getElementById('codigo').value = item.codigo;
  document.getElementById('descricao').value = item.descricao;
  document.getElementById('tituloForm').textContent = 'Editar especialidade #' + item.especialidadeid;
  document.getElementById('codigo').focus();
}

async function excluir(id) {
  if (!confirm('Deseja realmente excluir esta especialidade?')) return;
  var resposta = await deleteEspecialidade(id);
  if (!resposta) return;
  if (resposta.status === 'ok') {
    mostrarMensagem('Especialidade excluída com sucesso.', 'success');
    limparFormulario();
    carregarTabela();
  } else {
    mostrarMensagem('Erro ao excluir: ' + resposta.status, 'danger');
  }
}

function limparFormulario() {
  document.getElementById('formEspecialidade').reset();
  document.getElementById('especialidadeid').value = '';
  document.getElementById('tituloForm').textContent = 'Nova especialidade';
}

async function salvar(event) {
  event.preventDefault();
  var id = document.getElementById('especialidadeid').value;
  var especialidade = {
    codigo: document.getElementById('codigo').value,
    descricao: document.getElementById('descricao').value
  };

  var resposta;
  if (id) {
    resposta = await updateEspecialidade(id, especialidade);
  } else {
    resposta = await insertEspecialidade(especialidade);
  }
  if (!resposta) return;

  if (resposta.status === 'ok') {
    mostrarMensagem('Especialidade salva com sucesso.', 'success');
    limparFormulario();
    carregarTabela();
  } else {
    mostrarMensagem('Erro ao salvar: ' + resposta.status, 'danger');
  }
}

document.getElementById('formEspecialidade').addEventListener('submit', salvar);
document.getElementById('btnCancelar').addEventListener('click', limparFormulario);
carregarTabela();
