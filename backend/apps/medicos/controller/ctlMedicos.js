//-- arquivo: apps/medicos/controller/ctlMedicos.js
const mdlMedicos = require('../model/mdlMedicos');

const GetAllMedicos = async (req, res) => {
  const registro = await mdlMedicos.GetAllMedicos();
  res.json({ status: 'ok', registro: registro });
};

const GetMedicoByID = async (req, res) => {
  const medicoID = parseInt(req.params.medicoid);
  const registro = await mdlMedicos.GetMedicoByID(medicoID);
  res.json({ status: 'ok', registro: registro });
};

const InsertMedico = async (req, res) => {
  const registro = req.body;
  const { msg, linhasAfetadas } = await mdlMedicos.InsertMedico(registro);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

const UpdateMedico = async (req, res) => {
  const medicoID = parseInt(req.params.medicoid);
  const registro = req.body;
  const { msg, linhasAfetadas } = await mdlMedicos.UpdateMedico(medicoID, registro);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

const DeleteMedico = async (req, res) => {
  const medicoID = parseInt(req.params.medicoid);
  const { msg, linhasAfetadas } = await mdlMedicos.DeleteMedico(medicoID);
  res.json({ status: msg, linhasAfetadas: linhasAfetadas });
};

module.exports = {
  GetAllMedicos,
  GetMedicoByID,
  InsertMedico,
  UpdateMedico,
  DeleteMedico,
};
