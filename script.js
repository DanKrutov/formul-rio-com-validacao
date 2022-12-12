var nome, email, tel, cpf;

function limparForm() {
    document.getElementById("form").reset();
    vars = ["nome", "email", "tel", "cpf"];
    for (i = 0; i < vars.length; i++) {
        document.getElementById(vars[i]).classList.remove('faltante');
    }
    document.getElementById("emailInvalido").style.display = "none";
    document.getElementById("telInvalido").style.display = "none";
    document.getElementById("cpfInvalido").style.display = "none";
    document.getElementById("msgvazio").style.display = "none";

}

function MsgValidoInvalido(id, passou) {
    if (passou) {
        console.log(id + " passou da validação")
        document.getElementById(id).classList.remove('faltante');
        document.getElementById(id + "Invalido").style.display = "none";
    } else {
        console.log(id + " não passou da validação")
        document.getElementById(id).classList.add('faltante');
        document.getElementById(id + "Invalido").style.display = "block";
    }
}

function puxarValores() {
    document.getElementById("msgSucesso").style.display = "none";
    //armazena todos os valores informados em variaveis
    nome = document.getElementById('nome').value;
    email = document.getElementById('email').value;
    tel = document.getElementById('tel').value;
    cpf = document.getElementById('cpf').value;

    //se passar do validaSeVazio passa pro validaValores
    if (validaSeVazio()) {
        validaValores();
    }
}

//valida se todos os campos foram preenchidos e não estao vazios
function validaSeVazio() {
    ids = [nome, email, tel, cpf];
    vars = ["nome", "email", "tel", "cpf"];

    //for que procura pelos campos vazios
    for (i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById(vars[i]).classList.add('faltante');
        } else {
            document.getElementById(vars[i]).classList.remove('faltante');
        }
    }

    if (!nome || !email || !tel || !cpf) {
        document.getElementById("msgvazio").style.display = "block";
        return false;
    }
    else {
        document.getElementById("msgvazio").style.display = "none";
        return true;
    }
}

//valida se os valores inseridos são válidos ao contexto
function validaValores() {
    console.log("todos os campos estão preenchidos!");
    invalido = false;

    /*
    //for pra passar por todas as funcoes, so nao sei como chama funcao com string lol
    validacoes =["validaNome", "validaEmail", "validaTelefone", "validaCPF"];

    for(i=0; i<validacoes.length; i++){
        
    }*/

    if(validaNome()) {
        MsgValidoInvalido("nome", 1);
    } else{
        MsgValidoInvalido("nome", 0);
    }

    if (validaEmail()) {
        MsgValidoInvalido("email", 1);
    } else {
        invalido = true;
        MsgValidoInvalido("email", 0);
    }

    if (validaTelefone()) {
        MsgValidoInvalido("tel", 1);
    } else {
        invalido = true;
        MsgValidoInvalido("tel", 0);
    }

    if (validaCPF()) {
        MsgValidoInvalido("cpf", 1);
    } else {
        invalido = true;
        MsgValidoInvalido("cpf", 0);
    }

    if (!invalido) {
        console.log("sucesso no cadastro!");
        document.getElementById("msgSucesso").style.display = "block";
        limparForm();
    } else {
        document.getElementById("msgSucesso").style.display = "none";
        console.log("ALERTA: um ou mais campos não passaram da validação");
    }
}

function validaNome(){
    // checa se o nome possui somente letras e se possui pelo menos 3 digitos
    if (/\p{L}/u.test(nome) && nome.length >3){
        return true;
    }else{
        return false;
    }
}

function validaEmail() {
    if (email.includes("@") && email.includes(".") && !email.includes(" ")) { //confere se não tem espaço e se tem caracteres "@","."
        return true;
    } else {
        return false;
    }
}

function validaTelefone() {
    ddd_lista = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
        37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
        65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
        89, 91, 92, 93, 94, 95, 96, 97, 98, 99];

    //remove simbolos especiais do telefone
    tel = tel.replace(/\D/g, "");
    //puxa ddd pra comparar
    telcod = tel.substring(0, 2);
    dddEncontrado = false;
    //verifica se o DDD existe, se existir dddencontrado=true pra avancar na validacao
    for (i = 0; i < ddd_lista.length; i++) {
        if (telcod == ddd_lista[i]) {
            console.log("DDD encontrado! " + ddd_lista[i]);
            dddEncontrado = true;
        }
    }
    //passa somente se o DDD existir e tiver o tamanho de um número de celular ou telefone
    if (dddEncontrado && tel.length == 10 || dddEncontrado && tel.length == 11) {
        return true;
    } else {
        return false;
    }
}

function validaCPF() {
    //remove simbolos especiais do cpf
    cpf = cpf.replace(/\D/g, "");
    soma = 0;
    if (cpf == "00000000000" || cpf == "" || cpf.length < 11) {
        return false;
    }
    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    restante = (soma * 10) % 11;
    if ((restante == 10) || (restante == 11)) restante = 0;
    if (restante != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    restante = (soma * 10) % 11;
    if ((restante == 10) || (restante == 11)) restante = 0;
    if (restante != parseInt(cpf.substring(10, 11))) return false;
    return true;
}              