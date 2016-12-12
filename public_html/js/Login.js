/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dataBase = null;

window.addEventListener('load', inicioPagina, false);

function inicioPagina() {
    listeners();
    inicioDB();
}
function inicioDB(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    dataBase = indexedDB.open("VibBay");
}
function listeners() {
    var btnLogin = document.getElementById("Login");
    var btnNavInicio = document.getElementById("NavInicio");
    var txtEmail = document.getElementById("Email");
    var txtContraseña = document.getElementById("Contraseña");

    txtEmail.addEventListener('blur', ponerEmail, false);
    txtContraseña.addEventListener('blur', ponerContraseña, false);
    btnNavInicio.addEventListener('click', irAInicio, false);
    btnLogin.addEventListener('click', login, false);
}
function irAPerfil(Email,Nombre,Foto) {
    setTimeout(function () {
        window.location.href = "Perfil.html?Email="+Email+"&Nombre="+Nombre;
    }, 0);

}
function irAInicio() {
    setTimeout(function () {
        window.location.href = "index.html";
    }, 0);

}
function ponerContraseña() {
    var pass = document.getElementById("Contraseña").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un contraseña', 2000);
}
}
function ponerEmail() {
        var pass = document.getElementById("Email").value;
        if (pass === "")
        {
            Materialize.toast('Es necesario que tenga un Email', 2000);
        }

}



function login(){
    var Email = document.getElementById("Email").value;
    var Contraseña = document.getElementById("Contraseña").value;
    if (Email.length === 0 || Contraseña.length === 0){
        Materialize.toast("Inserte sus datos para entrar", 2000);
    }else{
        var active = dataBase.result;
        var data = active.transaction(["Usuario"], "readonly");
        var objetosAlmacenados = data.objectStore("Usuario");
        var infoUsuarios = objetosAlmacenados.get(Email);

        infoUsuarios.onsuccess = function (e) {
            if (Contraseña !== infoUsuarios.result.Contraseña){
                Materialize.toast("La contraseña es incorrecta o el usuario no existe", 2000);

            }else{
                irAPerfil(Email, infoUsuarios.result.Nombre);
            }
        };

        infoUsuarios.onerror = function (e) {
            alert("Error inesperado al entrar");
        };

    }
}