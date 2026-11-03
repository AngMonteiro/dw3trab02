var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('especialidades', {
    title: 'Especialidades',
    showNavbar: true,
    activeMenu: 'especialidades'
  });
});

module.exports = router;
