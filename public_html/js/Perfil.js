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
function inicioDB() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    dataBase = indexedDB.open("VibBay");  
    loadDatosUsuario();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    

}

function listeners() {
    var btnComprar = document.getElementById("Comprar");
    var btnVender = document.getElementById("Vender");
    var btnSalir = document.getElementById("Salir");
    var btnNavInicio = document.getElementById("NavInicio");
    var btnCargaArticulos = document.getElementById("CargarMisArticulos");
    var btnCargaPujas = document.getElementById("CargarMisPujas");

    btnCargaPujas.addEventListener('click', loadPujas, false);
    btnCargaArticulos.addEventListener('click', loadObjetos, false);
    btnNavInicio.addEventListener('click', irAInicio, false);
    btnSalir.addEventListener('click', irAInicio, false);
    btnComprar.addEventListener('click', irABusqueda, false);
    btnVender.addEventListener('click', irANuevoArticulo, false);
}
function irABusqueda() {
    setTimeout(function () {
        window.location.href = "BusquedaConectado.html?Email="+getParameterByName('Email');
    }, 0);

}
function irANuevoArticulo() {
    setTimeout(function () {
        window.location.href = "ArticuloNuevo.html?Email="+getParameterByName('Email')+"&Nombre="+getParameterByName('Nombre');
    }, 0);

}
function irAInicio() {
    setTimeout(function () {
        window.location.href = "Index.html";
    }, 0);

}
function loadDatosUsuario(){
    loadEmail();
    loadNombre();
}
function loadNombre() {
    var Nombre =getParameterByName('Nombre');
    var outerHTML = '';
    outerHTML += Nombre;        
    document.querySelector('#Nombre').innerHTML = outerHTML;
}
function loadEmail() {
    var Email = getParameterByName('Email');
    var outerHTML = '';
    outerHTML += Email;
    document.querySelector('#CorreoElectronico').innerHTML = outerHTML;
}


function loadObjetos() {
    var active = dataBase.result;
    var data = active.transaction(["Articulo"], "readonly");
    var objetosAlmacenados = data.objectStore("Articulo");
    var index =objetosAlmacenados.index("by_Nombre");
    var Articulos=[];
    
    index.openCursor().onsuccess= function (e){
        var resultado = e.target.result;
        if(resultado===null){
            return;
        }
        Articulos.push(resultado.value);
        resultado.continue();
    };
    
    data.oncomplete=function (){ 
        var outerHTML = '';
        for(var key in Articulos){
            if(Articulos[key].Dueño===getParameterByName('Email') && Articulos[key].Estado ==='Activo'){
                outerHTML +='<p> Articulo: '+Articulos[key].Nombre+'  Precio: '+Articulos[key].PrecioSalida+'  <li><a href="ArticuloVendedor.html?Nombre=' + Articulos[key].Nombre + '&Email=' + getParameterByName('Email') +'&Propietario=' + getParameterByName('Nombre')+ '&ID=' + Articulos[key].id + '&PrecioSalida=' + Articulos[key].PrecioSalida + '&PujaAnterior=' + Articulos[key].PujaAnterior +'&Categoria=' + Articulos[key].Categoria + '&Descripcion=' + Articulos[key].Descripcion + '&Foto=' + Articulos[key].Foto + '">Modificar</a></li></p>';
            }
        }
        Articulos=[];
        document.querySelector("#MisObjetos").innerHTML=outerHTML;
    };
}
function loadPujas() {
    var active = dataBase.result;
    var data = active.transaction(["Puja"], "readonly");
    var pujasAlmacenadas = data.objectStore("Puja");
    var Pujas = [];

    pujasAlmacenadas.openCursor().onsuccess = function (e) {
        var resultado = e.target.result;
        if (resultado === null) {
            return;
        }
        Pujas.push(resultado.value);
        resultado.continue();
    };

    data.oncomplete = function () {
        var outerHTML = '';
        for (var key in Pujas) {
            if (Pujas[key].Dueño === getParameterByName('Email') && Pujas[key].Estado ==='Activo') {
                outerHTML += '<p> Puja: ' + Pujas[key].Cantidad + '  Nombre: ' + Pujas[key].NombreArticulo +' Fecha: '+Pujas[key].FechaHora + '</p> ';
            }
        }
        Pujas = [];
        document.querySelector("#MisPujas").innerHTML = outerHTML;
    };
}
