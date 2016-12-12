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
    cargarDatos();
}
function inicioDB() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    dataBase = indexedDB.open("VibBay");
}
function listeners() {
    var btnNavInicio = document.getElementById("NavInicio");
    var btnPuja = document.getElementById("puja");
    var btnPujaMin = document.getElementById("pujaMin");
    var txtPujaNueva = document.getElementById("pujaNueva");
    var txtPujaNuevaMin = document.getElementById("pujaNuevaMin");

    txtPujaNueva.addEventListener('blur', ponerPrecio, false);
    txtPujaNuevaMin.addEventListener('blur', ponerPrecioMin, false);
    btnPuja.addEventListener('click', addNuevaPuja, false);
    btnPujaMin.addEventListener('click', addNuevaPujaMin, false);
    btnNavInicio.addEventListener('click', irAInicio, false);
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
function cargarDatos() {
    loadNombre();
    loadPrecioSalida();
    loadDescripcion();
    loadCategoria();
    loadFoto();
    loadPujaAnterior();
}
function loadNombre() {
    var Nombre = getParameterByName('Nombre');
    var outerHTML = '';
    outerHTML += Nombre;
    document.querySelector('#Nombre').innerHTML = outerHTML;
}
function loadCategoria() {
    var Categoria = getParameterByName('Categoria');
    var outerHTML = '';
    outerHTML += Categoria;
    document.querySelector('#Categoria').innerHTML = outerHTML;
}
function loadPrecioSalida() {
    var PrecioSalida = getParameterByName('PrecioSalida');
    var outerHTML = '';
    outerHTML += PrecioSalida + ' €';
    document.querySelector('#PrecioSalidaDeArticulo').innerHTML = outerHTML;
}
function loadDescripcion() {
    var Descripcion = getParameterByName('Descripcion');
    var outerHTML = '';
    outerHTML += Descripcion;
    document.querySelector('#Descripcion').innerHTML = outerHTML;
}
function loadFoto() {
    var Foto = getParameterByName('Foto');
    var outerHTML = '';
    outerHTML += Foto;
    document.querySelector('#Imagen').innerHTML = outerHTML;
}
function loadPujaAnterior() {
    var outerHTML = '';
    outerHTML += getParameterByName('PujaAnterior') + ' €';
    document.querySelector('#PujaAnteriorMax').innerHTML = outerHTML;
    document.querySelector('#PujaAnteriorMin').innerHTML = outerHTML;


}
function irABusqueda() {
    setTimeout(function () {
        window.location.href = "BusquedaConectado.html?Email=" + getParameterByName('Email');
    }, 0);
}
function preaparComparacion(numero) {
    numero = numero.replace(".", "");
    numero = numero.replace(",", "");
    return numero;
}
function addNuevaPuja() {
    
    var cPuja = document.getElementById("pujaNueva").value;
     
     if (cPuja.length === 0) {
     Materialize.toast("Haz una puja", 5000);
     } else {
     var active = dataBase.result;
     var data = active.transaction(["Puja"], "readwrite");
     var object = data.objectStore("Puja");
     var d =new Date();
     
     var request = object.put({
     Cantidad: document.querySelector("#pujaNueva").value,
     FechaHora: d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(),
     Dueño: getParameterByName('Email'),
     Articulo: getParameterByName('ID'),
     NombreArticulo:getParameterByName('Nombre'),
     Estado: 'Activo'
     });
     
     request.onerror = function (e) {
     alert(request.error.name + '\n\n' + request.error.message);
     };
     data.oncomplete = function (e) {
     document.querySelector("#pujaNueva").value = '';
     irABusqueda();
     };
     }
}

function ponerPrecio() {
    var pass = document.getElementById("pujaNueva").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga una cantidad', 2000);
    } else {
        comprobarPrecio();
    }
}
function comprobarPrecio() {
    var pujaNueva = document.getElementById("pujaNueva").value.toUpperCase();
    document.getElementById("pujaNueva").value = pujaNueva;
    var patron = new RegExp("^[0-9]{1,3}([\\,][0-9]{3})*[\\.][0-9]{2}$");
    //Comprueba la sintaxis
    if (patron.test(pujaNueva) === false) {
        Materialize.toast('Puja erronea', 4000);
        document.getElementById("pujaNueva").value = "";
    } else {
        if (parseFloat(pujaNueva) < parseFloat(getParameterByName('PujaAnterior'))) {
            Materialize.toast('Puja insuficiente', 4000);
            document.getElementById("pujaNueva").value = "";
        }
    }
}






function addNuevaPujaMin() {

    var cPuja = document.getElementById("pujaNuevaMin").value;

    if (cPuja.length === 0) {
        Materialize.toast("Haz una puja", 5000);
    } else {
        var active = dataBase.result;
        var data = active.transaction(["Puja"], "readwrite");
        var object = data.objectStore("Puja");
        var d = new Date();

        var request = object.put({
            Cantidad: document.querySelector("#pujaNuevaMin").value,
            FechaHora: d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
            Dueño: getParameterByName('Email'),
            Articulo: getParameterByName('ID'),
            NombreArticulo: getParameterByName('Nombre'),
            Estado: 'Activo'
        });
        request.onerror = function (e) {
            alert(request.error.name + '\n\n' + request.error.message);
        };
        data.oncomplete = function (e) {
            document.querySelector("#pujaNuevaMin").value = '';

            irABusqueda();
        };
    }
}

function ponerPrecioMin() {
    var pass = document.getElementById("pujaNuevaMin").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga unaCantidad', 2000);
    } else {
        comprobarPrecioMin();
    }
}
function comprobarPrecioMin() {
    var pujaNueva = document.getElementById("pujaNuevaMin").value.toUpperCase();
    document.getElementById("pujaNuevaMin").value = pujaNueva;
    var patron = new RegExp("^[0-9]{1,3}([\\,][0-9]{3})*[\\.][0-9]{2}$");
    //Comprueba la sintaxis
    if (patron.test(pujaNueva) === false) {
        Materialize.toast('Puja erronea', 4000);
        document.getElementById("pujaNuevaMin").value = "";
    } else {
        if (preaparComparacion(pujaNueva) > preaparComparacion(getParameterByName('PujaAnterior'))) {


        } else {
            Materialize.toast('Puja insuficiente', 4000);
            document.getElementById("pujaNuevaMin").value = "";
        }
    }
}


