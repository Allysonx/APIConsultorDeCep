const express = require('express');
const router = express.Router();

const validator = require('../app/Validator.js');
const response = require('../app/Response.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Consultor de CEP' });
});

router.get('/api/v1/cep', function(req, res){

  let resultValidateCep = validator.validateCep(req.query.code);

  if(resultValidateCep){
    
    console.log("CEP Válido");
    response.consultCep(req.query.code)
      .then(cepJson => res.send(cepJson))
      .catch(error => res.send(error.message));

  } else {
    console.log("CEP Inválido");
    res.send(response.createResponseError());
  }

});

module.exports = router;