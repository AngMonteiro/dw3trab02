//-- arquivo: routes/router.js
const express = require('express');
const routerApp = express.Router();
const appEspecialidades = require('../apps/especialidades/controller/ctlEspecialidades');
const appMedicos = require('../apps/medicos/controller/ctlMedicos');
const appLogin = require('../apps/login/controller/ctlLogin');

routerApp.get('/', (req, res) => {
  res.send('API DW3 - Módulo Saúde');
});

// Rotas de Especialidades
routerApp.get('/getAllEspecialidades', appLogin.AutenticaJWT, appEspecialidades.GetAllEspecialidades);
routerApp.get('/getEspecialidadeByID/:especialidadeid', appLogin.AutenticaJWT, appEspecialidades.GetEspecialidadeByID);
routerApp.post('/insertEspecialidade', appLogin.AutenticaJWT, appEspecialidades.InsertEspecialidade);
routerApp.put('/updateEspecialidade/:especialidadeid', appLogin.AutenticaJWT, appEspecialidades.UpdateEspecialidade);
routerApp.delete('/deleteEspecialidade/:especialidadeid', appLogin.AutenticaJWT, appEspecialidades.DeleteEspecialidade);

// Rotas de Médicos
routerApp.get('/getAllMedicos', appLogin.AutenticaJWT, appMedicos.GetAllMedicos);
routerApp.get('/getMedicoByID/:medicoid', appLogin.AutenticaJWT, appMedicos.GetMedicoByID);
routerApp.post('/insertMedico', appLogin.AutenticaJWT, appMedicos.InsertMedico);
routerApp.put('/updateMedico/:medicoid', appLogin.AutenticaJWT, appMedicos.UpdateMedico);
routerApp.delete('/deleteMedico/:medicoid', appLogin.AutenticaJWT, appMedicos.DeleteMedico);

// Rotas de Login
routerApp.post('/Login', appLogin.Login);
routerApp.post('/Logout', appLogin.Logout);

module.exports = routerApp;
