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
 
    var btnMostrar = document.getElementById("Mostrar");
    var btnModificar = document.getElementById("Modificar");
    var btnCerrar = document.getElementById("Cerrar");
    var btnMostrar2 = document.getElementById("Mostrar2");
    var btnModificar2 = document.getElementById("Modificar2");
    var btnCerrar2 = document.getElementById("Cerrar2");
    var btnNavInicio = document.getElementById("NavInicio");
    var btnOBN = document.getElementById("OrderByNombre");
    var btnOBF = document.getElementById("OrderByFecha");
    var btnOBP = document.getElementById("OrderByPuja");


    btnOBN.addEventListener('click', loadPujasByNombre, false);
    btnOBF.addEventListener('click', loadPujasByFecha, false);
    btnOBP.addEventListener('click', loadPujasByCantidad, false);
    btnNavInicio.addEventListener('click', irAInicio, false);   
    btnCerrar2.addEventListener('click', irAPerfil, false);
    btnModificar2.addEventListener('click', modificable, false);
    btnMostrar2.addEventListener('click', abrirHistorial, false);
    btnCerrar.addEventListener('click',cerrarPuja , false);
    btnModificar.addEventListener('click', modificable, false);
    btnMostrar.addEventListener('click', abrirHistorial, false);
   

}

function saltoAOtraPagina() {
    setTimeout(function () {
        window.location.href = "Articulo.html";
    }, 0);

}
function irAInicio() {
    setTimeout(function () {
        window.location.href = "Index.html";
    }, 0);

}
function irAPerfil() {
    setTimeout(function () {
        window.location.href = "Perfil.html?Email="+getParameterByName('Email')+'&Nombre='+getParameterByName('Propietario');
    }, 0);

}
function modificable(){
        irAEditor();
}
function irAEditor() {
    setTimeout(function () {
        window.location.href = 'ArticuloEdicion.html?&Email=' + getParameterByName('Email') + '&ID=' + getParameterByName('ID')+ '&Propietario=' + getParameterByName('Propietario')+ '&Nombre=' + getParameterByName('Nombre');
    }, 0);

}
function abrirHistorial() {
    loadPujas();
    $('#modal1').openModal({
        dismissible: false
    });
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

}



function cargarDatos() {
    loadPrecioSalida();
    loadDescripcion();
    loadCategoria();
    loadFoto();
    loadNombre();   
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
            if (Pujas[key].Articulo === getParameterByName('ID') && Pujas[key].Estado === 'Activo') {
                outerHTML += '<p> Usuario: ' + Pujas[key].Dueño + '  |Fecha: ' + Pujas[key].FechaHora + ' |Cantidad: ' + Pujas[key].Cantidad + '</p> ';
            }
        }
        Pujas = [];
        document.querySelector("#MisPujas").innerHTML = outerHTML;
    };
}
function loadPujasByNombre() {
    var active = dataBase.result;
    var data = active.transaction(["Puja"], "readonly");
    var pujasAlmacenadas = data.objectStore("Puja");
    var index = pujasAlmacenadas.index("by_Dueño");
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
        var outerHTML = '';
        for (var key in Pujas) {
            if (Pujas[key].Articulo === getParameterByName('ID') && Pujas[key].Estado === 'Activo') {
                outerHTML += '<p> Usuario: ' + Pujas[key].Dueño + '  |Fecha: ' + Pujas[key].FechaHora + ' |Cantidad: ' + Pujas[key].Cantidad + '</p> ';
            }
        }
        Pujas = [];
        document.querySelector("#MisPujas").innerHTML = outerHTML;
    };
}
function loadPujasByFecha() {
    var active = dataBase.result;
    var data = active.transaction(["Puja"], "readonly");
    var pujasAlmacenadas = data.objectStore("Puja");
    var index = pujasAlmacenadas.index("by_FechaHora");
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
        var outerHTML = '';
        for (var key in Pujas) {
            if (Pujas[key].Articulo === getParameterByName('ID') && Pujas[key].Estado === 'Activo') {
                outerHTML += '<p> Usuario: ' + Pujas[key].Dueño + '  |Fecha: ' + Pujas[key].FechaHora + ' |Cantidad: ' + Pujas[key].Cantidad + '</p> ';
            }
        }
        Pujas = [];
        document.querySelector("#MisPujas").innerHTML = outerHTML;
    };
}
function loadPujasByCantidad() {
    var active = dataBase.result;
    var data = active.transaction(["Puja"], "readonly");
    var pujasAlmacenadas = data.objectStore("Puja");
    var index = pujasAlmacenadas.index("by_Cantidad");
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
        var outerHTML = '';
        for (var key in Pujas) {
            if (Pujas[key].Articulo === getParameterByName('ID') && Pujas[key].Estado === 'Activo') {
                outerHTML += '<p> Usuario: ' + Pujas[key].Dueño + '  |Fecha: ' + Pujas[key].FechaHora + ' |Cantidad: ' + Pujas[key].Cantidad + '</p> ';
            }
        }
        Pujas = [];
        document.querySelector("#MisPujas").innerHTML = outerHTML;
    };
}
function cerrarPuja (){
    var request;
    var active = dataBase.result;
    var data = active.transaction(["Articulo"], "readwrite");
    var object = data.objectStore("Articulo");
    request = object.delete(parseInt(getParameterByName('ID')));
    quitarPujas();
    irAPerfil();
    request.onerror=function (){
        alert('Fallo al cerrar');  
    };
}
function quitarPujas() {
    var request;
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
        for (var key in Pujas) {
            if (Pujas[key].Articulo === parseInt(getParameterByName('ID'))) {
                request = pujasAlmacenadas.delete(Pujas[key].id);
            }
        }
        Pujas = [];
    };
}

$(document).ready(function () {
    $('.tabs-wrapper .row').pushpin({top: $('.tabs-wrapper').offset().top});
});

/*Inicializa los activadores de los modales*/
$(document).ready(function () {
    $('.modal-trigger').leanModal();
});

/*Inicializa la seleccion multiple*/
$(document).ready(function () {
    $('select').material_select();
});

$('#textarea1').trigger('autoresize');