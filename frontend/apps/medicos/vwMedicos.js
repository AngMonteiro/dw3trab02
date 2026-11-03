// ===== Funções que usam as APIs do back-end =====

async function getAllMedicos() {
  return await chamarApi('GET', '/getAllMedicos');
}

async function getMedicoByID(id) {
  return await chamarApi('GET', '/getMedicoByID/' + id);
}

async function insertMedico(medico) {
  return await chamarApi('POST', '/insertMedico', medico);
}

async function updateMedico(id, medico) {
  return await chamarApi('PUT', '/updateMedico/' + id, medico);
}

async function deleteMedico(id) {
  return await chamarApi('DELETE', '/deleteMedico/' + id);
}

// ===== Funções da tela =====

// Preenche o select de especialidades usando a API de especialidades
async function carregarEspecialidades() {
  var resposta = await chamarApi('GET', '/getAllEspecialidades');
  if (!resposta) return;
  var select = document.getElementById('especialidadeid');
  select.innerHTML = '<option value="">Selecione...</option>';
  resposta.registro.forEach(function (item) {
    var opcao = document.createElement('option');
    opcao.value = item.especialidadeid;
    opcao.textContent = item.descricao;
    select.appendChild(opcao);
  });
}

async function carregarTabela() {
  var resposta = await getAllMedicos();
  if (!resposta) return;
  var tabela = document.getElementById('tabelaMedicos');
  tabela.innerHTML = '';

  if (resposta.registro.length === 0) {
    tabela.innerHTML = '<tr><td colspan="7" class="text-center text-secondary">Nenhum médico cadastrado.</td></tr>';
    return;
  }

  resposta.registro.forEach(function (item) {
    var linha = document.createElement('tr');
    linha.appendChild(criarCelula(item.medicoid));
    linha.appendChild(criarCelula(item.crm));
    linha.appendChild(criarCelula(item.nome));
    linha.appendChild(criarCelula(item.especialidade));
    linha.appendChild(criarCelula(formatarMoeda(item.salario), 'text-end'));
    linha.appendChild(criarCelula(formatarData(item.dataadmissao)));
    var acoes = criarCelula('', 'text-end text-nowrap');
    acoes.appendChild(criarBotao('Editar', 'btn-outline-primary', function () { editar(item.medicoid); }));
    acoes.appendChild(criarBotao('Excluir', 'btn-outline-danger', function () { excluir(item.medicoid); }));
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
}

async function editar(id) {
  var resposta = await getMedicoByID(id);
  if (!resposta || resposta.registro.length === 0) return;
  var item = resposta.registro[0];
  document.getElementById('medicoid').value = item.medicoid;
  document.getElementById('crm').value = item.crm;
  document.getElementById('nome').value = item.nome;
  document.getElementById('salario').value = item.salario;
  document.getElementById('dataadmissao').value = item.dataadmissao;
  document.getElementById('especialidadeid').value = item.especialidadeid;
  document.getElementById('tituloForm').textContent = 'Editar médico #' + item.medicoid;
  document.getElementById('crm').focus();
}

async function excluir(id) {
  if (!confirm('Deseja realmente excluir este médico?')) return;
  var resposta = await deleteMedico(id);
  if (!resposta) return;
  if (resposta.status === 'ok') {
    mostrarMensagem('Médico excluído com sucesso.', 'success');
    limparFormulario();
    carregarTabela();
  } else {
    mostrarMensagem('Erro ao excluir: ' + resposta.status, 'danger');
  }
}

function limparFormulario() {
  document.getElementById('formMedico').reset();
  document.getElementById('medicoid').value = '';
  document.getElementById('tituloForm').textContent = 'Novo médico';
}

async function salvar(event) {
  event.preventDefault();
  var id = document.getElementById('medicoid').value;
  var medico = {
    crm: document.getElementById('crm').value,
    nome: document.getElementById('nome').value,
    salario: document.getElementById('salario').value,
    dataadmissao: document.getElementById('dataadmissao').value,
    especialidadeid: document.getElementById('especialidadeid').value
  };

  var resposta;
  if (id) {
    resposta = await updateMedico(id, medico);
  } else {
    resposta = await insertMedico(medico);
  }
  if (!resposta) return;

  if (resposta.status === 'ok') {
    mostrarMensagem('Médico salvo com sucesso.', 'success');
    limparFormulario();
    carregarTabela();
  } else {
    mostrarMensagem('Erro ao salvar: ' + resposta.status, 'danger');
  }
}

document.getElementById('formMedico').addEventListener('submit', salvar);
document.getElementById('btnCancelar').addEventListener('click', limparFormulario);
carregarEspecialidades();
carregarTabela();
