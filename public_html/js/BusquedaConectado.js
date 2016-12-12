/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Hacer: Modificar datos de usuario
 * titular a nuevo articulo
 */

window.addEventListener('load', inicioPagina, false);

function inicioPagina() {
    listeners();
    inicioDB();
}
function inicioDB() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    dataBase = indexedDB.open("VibBay");
}
function listeners() {
    var btnBuscar = document.getElementById("Buscar");
    var btnNavInicio = document.getElementById("NavInicio");


    btnNavInicio.addEventListener('click', irAInicio, false);
    btnBuscar.addEventListener('click', busqueda, false);
}

function irAInicio() {
    setTimeout(function () {
        window.location.href = "Index.html";
    }, 0);

}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


}
function busqueda() {
    var cBusqueda = document.getElementById("Busca").value;
    if (cBusqueda.length === 0) {
        Materialize.toast("Introduce un nombre para buscar", 5000);
    } else {
        loadObjetos(cBusqueda);
    }
}

function loadObjetos(Nombre) {
    var active = dataBase.result;
    var data = active.transaction(["Articulo"], "readonly");
    var objetosAlmacenados = data.objectStore("Articulo");
    var Articulos = [];

    objetosAlmacenados.openCursor().onsuccess = function (e) {
        var resultado = e.target.result;
        if (resultado === null) {
            return;
        }
        Articulos.push(resultado.value);
        resultado.continue();
    };

    data.oncomplete = function () {
        var outerHTML = '';
        for (var key in Articulos) {
            if (Articulos[key].Nombre === Nombre && Articulos[key].Dueño !== getParameterByName('Email') && Articulos[key].Estado === 'Activo') {
                outerHTML += '<p> Articulo: ' + Articulos[key].Nombre + '  Precio: ' + Articulos[key].PrecioSalida + '  <li><a href="ArticuloComprador.html?Nombre=' + Articulos[key].Nombre + '&Email=' + getParameterByName('Email') + '&ID=' + Articulos[key].id + '&PrecioSalida=' + Articulos[key].PrecioSalida + '&Categoria=' + Articulos[key].Categoria + '&Descripcion=' + Articulos[key].Descripcion + '&PujaAnterior=' + buscarPujaAnterior(Articulos[key].id, Articulos[key].PrecioSalida) + '&Foto=' + Articulos[key].Foto + '"> Puja aqui</a></li></p>';
            }
        }
        Articulos = [];
        document.querySelector("#Resultados").innerHTML = outerHTML;
    };
}

function buscarPujaAnterior(id, PrecioSalida) {
    var active = dataBase.result;
    var data = active.transaction(["Puja"], "readonly");
    var pujasAlmacenadas = data.objectStore("Puja");
    var index = pujasAlmacenadas.index("by_Cantidad");
    var PujaMasAlta = PrecioSalida;
    var Pujas = [];

    index.openCursor().onsuccess = function (e) {
        var resultado = e.target.result;
        if (resultado === null) {
            return;
        }
        Pujas.push(resultado.value);
        resultado.continue();
    };
    data.oncomplete = function () {
        for (var key in Pujas) {
            if (parseInt(Pujas[key].Articulo) === parseInt(id)) {
                PujaMasAlta=Pujas[key].Cantidad,toString();
            }
        }
        return PujaMasAlta;
    };
    return data.oncomplete();
}
function preaparComparacion(numero) {
    numero = numero.replace(".", "");
    numero = numero.replace(",", "");
    return numero;
}