const express = require('express');
const router = express.Router();
const response = require('../app/Response.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Consultor de CEP' });
});

router.get('/api/v1/cep', function(req, res){

  response.consultCep(req.query.code)
    .then(cepJson => res.send(cepJson))
    .catch(error => res.send(error.message));

});

module.exports = router;