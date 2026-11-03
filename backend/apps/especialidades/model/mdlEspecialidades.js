//-- arquivo: apps/especialidades/model/mdlEspecialidades.js
const db = require('../../../database/databaseconfig');

const GetAllEspecialidades = async () => {
  return (
    await db.query(
      'SELECT * FROM especialidades WHERE removido = false ORDER BY descricao ASC'
    )
  ).rows;
};

const GetEspecialidadeByID = async (especialidadeIDPar) => {
  return (
    await db.query(
      'SELECT * FROM especialidades WHERE especialidadeid = $1 AND removido = false',
      [especialidadeIDPar]
    )
  ).rows;
};

const InsertEspecialidade = async (registroPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO especialidades (codigo, descricao) VALUES ($1, $2)',
        [registroPar.codigo, registroPar.descricao]
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlEspecialidades|InsertEspecialidade] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const UpdateEspecialidade = async (especialidadeIDPar, registroPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE especialidades SET codigo = $2, descricao = $3 ' +
          'WHERE especialidadeid = $1 AND removido = false',
        [especialidadeIDPar, registroPar.codigo, registroPar.descricao]
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlEspecialidades|UpdateEspecialidade] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

// Soft delete: apenas marca o registro como removido
const DeleteEspecialidade = async (especialidadeIDPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE especialidades SET removido = true WHERE especialidadeid = $1',
        [especialidadeIDPar]
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlEspecialidades|DeleteEspecialidade] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllEspecialidades,
  GetEspecialidadeByID,
  InsertEspecialidade,
  UpdateEspecialidade,
  DeleteEspecialidade,
};
