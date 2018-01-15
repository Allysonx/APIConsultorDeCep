



exports.validateCep = function(cep){

    let resultValidate;

    if(cep.length == 9 && cep.charAt(5) === '-'){
    
        cep = cep.substring(0, 5) + cep.substring(6, cep.length);

        resultValidate = verifyCep(cep);

    } else if(cep.length == 8){

        resultValidate = verifyCep(cep);
    } else {

        resultValidate = false;
    }

    return resultValidate;
}

function isNumber(number){

    return !isNaN(number) && isFinite(number);
}

function verifyCep(cep){

    let resultVerify;

    for(let i = 0; i < cep.length; i++){

        if(!isNumber(cep.charAt(i))){
            resultVerify = false;
            break;
        } else {
            resultVerify = true;
        }
    }

    return resultVerify;
}