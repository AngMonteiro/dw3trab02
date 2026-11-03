//-- arquivo: apps/medicos/model/mdlMedicos.js
const db = require('../../../database/databaseconfig');

const GetAllMedicos = async () => {
  return (
    await db.query(
      'SELECT m.*, e.descricao AS especialidade ' +
        'FROM medicos m INNER JOIN especialidades e ON e.especialidadeid = m.especialidadeid ' +
        'WHERE m.removido = false ORDER BY m.nome ASC'
    )
  ).rows;
};

const GetMedicoByID = async (medicoIDPar) => {
  return (
    await db.query(
      'SELECT m.*, e.descricao AS especialidade ' +
        'FROM medicos m INNER JOIN especialidades e ON e.especialidadeid = m.especialidadeid ' +
        'WHERE m.medicoid = $1 AND m.removido = false',
      [medicoIDPar]
    )
  ).rows;
};

const InsertMedico = async (registroPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'INSERT INTO medicos (crm, nome, salario, dataadmissao, especialidadeid) ' +
          'VALUES ($1, $2, $3, $4, $5)',
        [
          registroPar.crm,
          registroPar.nome,
          registroPar.salario,
          registroPar.dataadmissao,
          registroPar.especialidadeid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlMedicos|InsertMedico] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const UpdateMedico = async (medicoIDPar, registroPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query(
        'UPDATE medicos SET crm = $2, nome = $3, salario = $4, dataadmissao = $5, especialidadeid = $6 ' +
          'WHERE medicoid = $1 AND removido = false',
        [
          medicoIDPar,
          registroPar.crm,
          registroPar.nome,
          registroPar.salario,
          registroPar.dataadmissao,
          registroPar.especialidadeid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = '[mdlMedicos|UpdateMedico] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

// Soft delete: apenas marca o registro como removido
const DeleteMedico = async (medicoIDPar) => {
  let linhasAfetadas;
  let msg = 'ok';
  try {
    linhasAfetadas = (
      await db.query('UPDATE medicos SET removido = true WHERE medicoid = $1', [medicoIDPar])
    ).rowCount;
  } catch (error) {
    msg = '[mdlMedicos|DeleteMedico] ' + (error.detail || error.message);
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllMedicos,
  GetMedicoByID,
  InsertMedico,
  UpdateMedico,
  DeleteMedico,
};
