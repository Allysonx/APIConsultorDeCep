
const request = require('request');
const validator = require('../app/Validator.js');
const urlWebService = "https://viacep.com.br/ws/";


exports.consultCep = function(cep){

    let promiseRequest = new Promise((resolve, reject) => {

        let resultValidateCep = validator.validateCep(cep);

        if(resultValidateCep){

            const urlRequest = urlWebService + cep + "/json";

            request.get(urlRequest, function(error, response, body){

                if(!error && response.statusCode == 200 && !verifyRequestBody(body)){
                    resolve(createResponseJson(body));
                } else {
                    reject(new Error(createResponseError()));
                }
            });

        } else {
            reject(new Error(createResponseError()));
        }

    });

    return promiseRequest;
}

function verifyRequestBody(body){

    return JSON.parse(body).erro;
}

function createResponseError(){

    let responseError = {
        message: "error",
        status_code: "400"
    }

    return JSON.stringify(responseError);
}

function createResponseJson(cepJson){

    const cepObject = JSON.parse(cepJson);

    let formattedCep = {
        zipcode: cepObject.cep,
        street: cepObject.logradouro,
        street_number: cepObject.complemento,
        neighborhood: cepObject.bairro,
        city: cepObject.localidade,
        state: cepObject.uf,
        ibge: cepObject.ibge
    }

    return JSON.stringify(formattedCep);
}