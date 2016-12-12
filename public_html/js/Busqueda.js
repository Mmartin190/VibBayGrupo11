/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
        window.location.href = "index.html";
    }, 0);

}

function busqueda(){
    var cBusqueda = document.getElementById("Busca").value;
    if(cBusqueda.length===0){
        Materialize.toast("Introduce un nombre para buscar", 5000);
    }
    else{
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
            if (Articulos[key].Nombre === Nombre && Articulos[key].Estado==='Activo') {
                outerHTML += 'Articulo: ' + Articulos[key].Nombre + '  Precio: ' + Articulos[key].PrecioSalida + '  <li><a href="Login.html"> Registrate para poder pujar</a></li>';
            }
        }
        Articulos = [];
        document.querySelector("#Resultados").innerHTML = outerHTML;
    };
}