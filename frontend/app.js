//-- arquivo: app.js
//-- Para rodar: node app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

require('dotenv').config({
  path: path.join(__dirname, 'dw3frontend.env'),
  quiet: true
});

// Rotas
var indexRouter = require('./routes/rtIndex');
var loginRouter = require('./routes/rtLogin');
var homeRouter = require('./routes/rtHome');
var especialidadesRouter = require('./routes/rtEspecialidades');
var medicosRouter = require('./routes/rtMedicos');
var sairRouter = require('./routes/rtSair');

var app = express();

var viewsPath = path.join(__dirname, 'views');
var appsPath = path.join(__dirname, 'apps');

const port = process.env.PORT || 40100;

// Configuração do Nunjucks
app.set('view engine', 'njk');
nunjucks.configure([viewsPath, appsPath], {
  autoescape: true,
  express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/apps', express.static(appsPath));

// Disponibiliza o endereço do back-end para todas as views
app.use(function (req, res, next) {
  res.locals.servidorDw3 = process.env.SERVIDOR_DW3 || 'http://localhost:40000';
  next();
});

// Verifica se o usuário está logado (cookie criado no login)
function verificaLogin(req, res, next) {
  var cookies = req.headers.cookie || '';
  if (cookies.indexOf('IsLogged=true') === -1) {
    return res.redirect('/login');
  }
  next();
}

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/sair', sairRouter);
app.use('/home', verificaLogin, homeRouter);
app.use('/especialidades', verificaLogin, especialidadesRouter);
app.use('/medicos', verificaLogin, medicosRouter);

// Erro 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Tratamento de erros
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Erro',
    message: err.message,
    status: err.status || 500
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
