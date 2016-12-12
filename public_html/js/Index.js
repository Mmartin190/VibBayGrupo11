/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener('load', inicioPagina, false);

function inicioPagina() {
    listeners();
}
function listeners() {
    var btnComprar = document.getElementById("Comprar");
    var btnVender = document.getElementById("Vender");
    var btnNavInicio = document.getElementById("NavInicio");


    btnNavInicio.addEventListener('click', irAInicio, false);
    btnComprar.addEventListener('click', irABusqueda, false);
    btnVender.addEventListener('click', irALogin, false);
}
function irAInicio() {
    setTimeout(function () {
        window.location.href = "index.html";
    }, 0);

}
function irAPerfil() {
    setTimeout(function () {
        window.location.href = "Perfil.html";
    }, 0);

}
function irABusqueda() {
    setTimeout(function () {
        window.location.href = "BusquedaDesconectado.html";
    }, 0);

}
function irALogin() {
    setTimeout(function () {
        window.location.href = "Login.html";
    }, 0);

}