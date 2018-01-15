const express = require('express');
const router = express.Router();

const validator = require('../app/Validator.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Consultor de CEP' });
});

router.get('/api/v1/cep', function(req, res){

  let result = validator.validateCep(req.query.code);

  if(result){
    console.log("CEP Válido");
  } else {
    console.log("CEP Inválido");
  }

  res.render('test', { title: "Página Teste", cep: req.query.code});
});

module.exports = router;
