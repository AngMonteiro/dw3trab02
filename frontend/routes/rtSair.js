var express = require('express');
var router = express.Router();

// Página que limpa o token do navegador e volta para o login
router.get('/', function (req, res) {
  res.clearCookie('IsLogged', { path: '/' });
  res.render('sair', {
    title: 'Saindo',
    showNavbar: false
  });
});

module.exports = router;
