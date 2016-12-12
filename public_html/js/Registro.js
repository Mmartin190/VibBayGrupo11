/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dataBase = null;

window.addEventListener('load', inicioPagina, false);

function inicioPagina() {
    listeners();
}
function listeners() {
    var btnNavInicio = document.getElementById("NavInicio");
    var txtNombre = document.getElementById("iNombreUsuario");
    var txtDNI = document.getElementById("iDNI");
    var txtEmail = document.getElementById("iEmail");
    var txtTelefono = document.getElementById("iTelefono");
    var txtContraseña = document.getElementById("iContraseña");
    var txtContraseña2 = document.getElementById("iContraseña2");
    var txtFechaNacimiento= document.getElementById("iFechaNacimiento");
    var txtTelefono = document.getElementById("iTelefono");
    var btnRegistrarse = document.getElementById("iRegistrarse");

    btnRegistrarse.addEventListener('click', addNuevoUsuario, false);
    txtFechaNacimiento.addEventListener('blur', esMayorDeEdad, false);
    btnNavInicio.addEventListener('click', irAInicio, false);
    txtNombre.addEventListener('blur', ponerNombre, false);
    txtDNI.addEventListener('blur', ponerDNI, false);
    txtEmail.addEventListener('blur', ponerEmail, false);
    txtTelefono.addEventListener('blur', ponerTelefono, false);
    txtContraseña.addEventListener('blur', ponerContraseña, false);
    txtContraseña2.addEventListener('blur', ponerContraseña2, false);

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    dataBase = indexedDB.open("VibBay");
}

function irAInicio() {
    setTimeout(function () {
        window.location.href = "index.html";
    }, 0);

}

function irALogin() {
    setTimeout(function () {
        window.location.href = "Login.html";
    }, 0);

}

function ponerNombre() {
    var pass = document.getElementById("iNombreUsuario").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un nombre', 2000);
    }

}
function ponerDNI() {
    var pass = document.getElementById("iDNI").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un DNI', 2000);
    }
    else{
        comprobarDNI();
    }

}
function ponerEmail() {
    var pass = document.getElementById("iEmail").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un Email', 2000);
    }
    else{
        comprobarEmail();
    }
}
function ponerTelefono() {
    var pass = document.getElementById("iTelefono").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un telefono', 2000);
    }

}
function ponerContraseña() {
    var pass = document.getElementById("iContraseña").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un contraseña', 2000);
    }
    else{
        contraseñaMinima();
    }

}
function ponerContraseña2() {
    var pass = document.getElementById("iContraseña2").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario verificar la contraseña', 2000);
    }
    else{
        mismaContraseña();
    }
}
function ponerTelefono() {
    var pass = document.getElementById("iTelefono").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario poner un numero de movil', 2000);
    }
    else{
        telefonoReal();
    }

}
function esMayorDeEdad(){
    var fechaNac = new Date(document.getElementById("iFechaNacimiento").value);
    var hoy = new Date();
    hoy = hoy.toISOString().substring(0, 10);
    var fechaHoy = new Date(hoy);
    var diferenciaMilisegundos = fechaHoy - fechaNac; //la diferencia de tiempo en milisegundos
    var diferenciaAños = parseInt(((((diferenciaMilisegundos / 1000) / 60) / 60) / 24) / 365); //pasa esos milisegundos a años
    //si son menos de 18 salta
    if (diferenciaAños < 18){
        Materialize.toast('Tienes que ser mayor de edad para registrarte', 4000);
        document.getElementById("iFechaNacimiento").value = "";
    }
}
function telefonoReal(){
    var movil = document.getElementById("iTelefono").value;
    //los moviles españoles empiezan por 6
    if (movil.charAt(0) !== "6"){
        document.getElementById("iTelefono").value = "";
        Materialize.toast('El numero de movil introducido no existe', 4000);
    }else{
        //y tienen 9 numeros
        if (movil.length !== 9){
            document.getElementById("iTelefono").value = "";
            Materialize.toast('El numero de movil introducido no existe', 4000);
        } else{
            for (i = 1; i < movil.length; i++){
                if (isNaN(movil.charAt(i))){
                    document.getElementById("iTelefono").value = "";
                    Materialize.toast('El numero de movil introducido no existe', 4000);
                    i = movil.length + 1;
                }
            }
        }
    }
}
function mismaContraseña(){
    var pass = document.getElementById("iContraseña").value;
    var pass2 = document.getElementById("iContraseña2").value;
    if (pass !== pass2){
        Materialize.toast('Las contraseñas tienen que coincidir', 4000);
        document.getElementById("iContraseña").value = "";
        document.getElementById("iContraseña2").value = "";
    }
}
function contraseñaMinima(){
    var pass = document.getElementById("iContraseña").value;
    if (pass.length < 3){
        Materialize.toast('La contraseña debe tener 3 caracteres minimo', 4000);
        document.getElementById("iContraseña").value = "";
    }

}
function comprobarDNI(){
    var dni = document.getElementById("iDNI").value.toUpperCase();
    document.getElementById("iDNI").value = dni;
    var patron = new RegExp("[0-9]{7}[A-Z]");
    var letraDNI = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    //Comprueba la sintaxis
    if (patron.test(dni) === false){ 
        Materialize.toast('El DNI es erroneo', 4000);
        document.getElementById("iDNI").value = "";
    }
    //Comprueba la letra
    else{
        var num = dni.replace(dni.charAt(8), "");
        var mod = num % 23;
        if (letraDNI[mod] !== dni.charAt(8)){
            Materialize.toast('El DNI es erroneo', 4000);
            document.getElementById("iDNI").value = "";
        }
    }
}
function comprobarEmail() {
    var email = document.getElementById("iEmail").value.toUpperCase();
    document.getElementById("iEmail").value = email;
    var patron = new RegExp("^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$");
    //Comprueba la sintaxis
    if (patron.test(email) === false) {
        Materialize.toast('El Email es erroneo', 4000);
        document.getElementById("iEmail").value = "";
    }
}


function addNuevoUsuario() {
    
    
    var cNombre = document.getElementById("iNombreUsuario").value;
    var cDNI = document.getElementById("iDNI").value;
    var cEmail = document.getElementById("iEmail");
    var cTelefono = document.getElementById("iTelefono").value;
    var cContraseña = document.getElementById("iContraseña").value;
    var cContraseña2 = document.getElementById("iContraseña2").value;

    if (cNombre.length === 0 || cDNI.length === 0 || cEmail.length === 0 || cTelefono === 0 || cContraseña === 0 || cContraseña2 === 0) {
        Materialize.toast("Aun hay campos obligatorios sin escribir", 5000);
    } 
    else {
        var active = dataBase.result;
        var data = active.transaction(["Usuario"], "readwrite");
        var object = data.objectStore("Usuario");

        var request = object.put({
            Nombre: document.querySelector("#iNombreUsuario").value,
            DNI: document.querySelector("#iDNI").value,
            FechaNacimiento: document.querySelector("#iFechaNacimiento").value,
            Email: document.querySelector("#iEmail").value,
            Telefono: document.querySelector("#iTelefono").value,
            Contraseña: document.querySelector("#iContraseña").value
        });
        request.onerror = function (e) {
            alert(request.error.name + '\n\n' + request.error.message);
        };
        data.oncomplete = function (e) {
            document.querySelector("#iNombreUsuario").value = '';
            document.querySelector("#iDNI").value = '';
            document.querySelector("#iFechaNacimiento").value = '';
            document.querySelector("#iEmail").value = '';
            document.querySelector("#iTelefono").value = '';
            document.querySelector("#iContraseña").value = '';

            /*alert('Objeto agregado correctamente');*/
            irALogin();
        };
    }
}

