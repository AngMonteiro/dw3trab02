//-- arquivo: apps/especialidades/controller/ctlEspecialidades.js
const mdlEspecialidades = require('../model/mdlEspecialidades');

const GetAllEspecialidades = async (req, res) => {
  const registro = await mdlEspecialidades.GetAllEspecialidades();
  res.json({ status: 'ok', registro: registro });
};

const GetEspecialidadeByID = async (req, res) => {
  const especialidadeID = parseInt(req.params.especialidadeid);
  const registro = await mdlEspecialidades.GetEspecialidadeByID(especialidadeID);
  res.json({ status: 'ok', registro: registro });
};

const InsertEspecialidade = async (req, res) => {
  const registro = req.body;
  const { msg, linhasAfetadas } = await mdlEspecialidades.InsertEspecialidade(registro);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

const UpdateEspecialidade = async (req, res) => {
  const especialidadeID = parseInt(req.params.especialidadeid);
  const registro = req.body;
  const { msg, linhasAfetadas } = await mdlEspecialidades.UpdateEspecialidade(especialidadeID, registro);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

const DeleteEspecialidade = async (req, res) => {
  const especialidadeID = parseInt(req.params.especialidadeid);
  const { msg, linhasAfetadas } = await mdlEspecialidades.DeleteEspecialidade(especialidadeID);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

module.exports = {
  GetAllEspecialidades,
  GetEspecialidadeByID,
  InsertEspecialidade,
  UpdateEspecialidade,
  DeleteEspecialidade,
};
