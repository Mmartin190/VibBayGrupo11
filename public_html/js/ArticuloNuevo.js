var dataBase = null;

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
    var botonGuardar = document.getElementById("Guardar");
    var txtNombre = document.getElementById("Nombre");
    var txtPrecioSalida = document.getElementById("PrecioSalida");
    var txtCategoria = document.getElementById("Categoria");
    var btnNavInicio = document.getElementById("NavInicio");


    btnNavInicio.addEventListener('click', irAInicio, false);
    botonGuardar.addEventListener('click', addNuevoArticulo, false);
    txtNombre.addEventListener('blur', ponerNombre, false);
    txtPrecioSalida.addEventListener('blur', ponerPrecio, false);
    txtCategoria.addEventListener('blur', ponerCategoria, false);

}
function ponerNombre() {
    var pass = document.getElementById("Nombre").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un nombre', 2000);
    }
 }

function ponerPrecio() {
    var pass = document.getElementById("PrecioSalida").value;
    if (pass === "")
    {
        Materialize.toast('Es necesario que tenga un precio', 2000);
    }
    else{
        comprobarPrecio();
    }
}

function ponerCategoria() {
    var pass = document.getElementById("Categoria").value;
    if (pass === "Hogar" || pass === "Deporte" || pass === "Moda") {

    } else {
        Materialize.toast('Es necesario que pertenezca a una categoria disponible', 2000);
        document.getElementById("Categoria").value = "";
    }

}

function irAArticuloVendedor(){
    setTimeout(function () {
        window.location.href = "ArticuloVendedor.html";
    }, 0);

}
function irAInicio() {
    setTimeout(function () {
        window.location.href = "Index.html";
    }, 0);

}
function irAPerfil() {
    setTimeout(function () {
        window.location.href = "Perfil.html?Email="+getParameterByName('Email')+"&Nombre="+getParameterByName('Nombre');
    }, 0);

}
function comprobarPrecio() {
    var PrecioSalida = document.getElementById("PrecioSalida").value.toUpperCase();
    document.getElementById("PrecioSalida").value = PrecioSalida;
    var patron = new RegExp("^[0-9]{1,3}([\\.][0-9]{3})*[\\,][0-9]{2}$");
    //Comprueba la sintaxis
    if (patron.test(PrecioSalida) === false) {
        Materialize.toast('El precio de salida es erroneo', 4000);
        document.getElementById("PrecioSalida").value = "";
    }
}


function controlar(e) {
    var elemento = e.target;
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
        elemento.style.borderColor = '#2600FF';
    } else {
        elemento.style.background = '#FFDDDD';
        elemento.style.borderColor = '#FF0000';
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var arch = new FileReader();
    arch.addEventListener('load', leer, false);
    var data = arch.readAsDataURL(ev.dataTransfer.files[0]);
    // var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

}

function leer(ev) {
    document.getElementById('caja').style.backgroundImage = "url('" + ev.target.result + "')";
    document.getElementById('caja').value = ev.target.result;
    document.getElementById('imagen').value = "url('" + ev.target.result + "')";
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


}

function addNuevoArticulo() {

    var cNombre = document.getElementById("Nombre").value;
    var cPrecioSalida = document.getElementById("PrecioSalida").value;
    var cCategoria = document.getElementById("Categoria").value;
    var cCaja = document.getElementById('caja').style.backgroundImage;

    

    if (cNombre.length === 0 || cPrecioSalida.length === 0 || cCategoria.length === 0||cCaja.length===0) {
        Materialize.toast("Aun hay campos obligatorios sin rellenar", 5000);
    } else {
        var active = dataBase.result;
        var data = active.transaction(["Articulo"], "readwrite");
        var object = data.objectStore("Articulo");

        var request = object.put({
            Nombre: document.querySelector("#Nombre").value,
            PrecioSalida: document.querySelector("#PrecioSalida").value,
            Categoria: document.querySelector("#Categoria").value,
            Foto: cCaja,
            Descripcion: document.querySelector("#Descripcion").value,
            Estado: 'Activo',
            Dueño: getParameterByName('Email')
        });
        request.onerror = function (e) {
            alert(request.error.name + '\n\n' + request.error.message);
        };
        data.oncomplete = function (e) {
            document.querySelector("#Nombre").value = '';
            document.querySelector("#PrecioSalida").value = '';
            document.querySelector("#Categoria").value = '';
            document.querySelector("#Imagen").value = '';
            document.querySelector("#Descripcion").value = '';

            /*alert('Objeto agregado correctamente');*/
            irAPerfil();
        };
    }
}