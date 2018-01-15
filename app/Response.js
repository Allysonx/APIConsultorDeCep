
const request = require('request');
const urlWebService = "https://viacep.com.br/ws/";


exports.consultCep = function(cep){

    let urlRequest = urlWebService + cep + "/json";

    return new Promise((resolve, reject) => {

        request.get(urlRequest, function(error, response, body){
            
            if(!error && response.statusCode == 200){
                console.log(body);
                resolve(createResponseJson(body));
            } else {
                reject(new Error(createResponseError()));
            }
        });
    });
}

exports.createResponseError = function(){

    let responseError = {
        message: "error",
        statusCode: "400"
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

