



exports.validateCep = function(cep){

    let resultValidate;

    if(cep.length == 9 && cep.charAt(5) === '-'){
        resultValidate = verifyCep(getFormattedCep(cep));
    } else if(cep.length == 8){
        resultValidate = verifyCep(cep);
    } else {
        resultValidate = false;
    }

    return resultValidate;
}

function getFormattedCep(cep){

    return cep.substring(0, 5) + cep.substring(6, cep.length);
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