var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('medicos', {
    title: 'Médicos',
    showNavbar: true,
    activeMenu: 'medicos'
  });
});

module.exports = router;
