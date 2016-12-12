/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dataBase = null;

window.addEventListener('load', inicioBD, false);


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


function inicioBD() {

    dataBase = indexedDB.open("VibBay", 1);

    dataBase.onupgradeneeded = function (e) {
        active = dataBase.result;
        //Tabla usuario
        Usuario = active.createObjectStore("Usuario", {keyPath: 'Email', autoIncrement: false});
        Usuario.createIndex('by_Nombre', 'Nombre', {unique: false});
        Usuario.createIndex('by_DNI', 'DNI', {unique: true});
        Usuario.createIndex('by_FechaNacimiento', 'FechaNacimiento', {unique: false});
        Usuario.createIndex('by_Telefono', 'Telefono', {unique: true});
        Usuario.createIndex('by_Contraseña', 'Contraseña', {unique: false});


        //Tabla Articulo
        Articulo = active.createObjectStore("Articulo", {keyPath: 'id', autoIncrement: true});
        Articulo.createIndex('by_Nombre', 'Nombre', {unique: false});
        Articulo.createIndex('by_PrecioSalida', 'PrecioSalida', {unique: false});
        Articulo.createIndex('by_Categoria', 'Categoria', {unique: false});
        Articulo.createIndex('by_Descripcion', 'Descripcion', {unique: false});
        Articulo.createIndex('by_Estado', 'Estado', {unique: false});
        Articulo.createIndex('by_Dueño', 'Dueño', {unique: false});
        Articulo.createIndex('by_Foto', 'Foto', {unique: false});




        //Tabla puja
        Puja = active.createObjectStore("Puja", {keyPath: 'id', autoIncrement: true});
        Puja.createIndex('by_Cantidad', 'Cantidad', {unique: false});
        Puja.createIndex('by_FechaHora', 'FechaHora', {unique: false});
        Puja.createIndex('by_Dueño', 'Dueño', {unique: false});
        Puja.createIndex('by_Articulo', 'Articulo', {unique: false});
        Puja.createIndex('by_NombreArticulo', 'NombreArticulo', {unique: false});
        Puja.createIndex('by_Estado', 'Estado', {unique: false});


    };

    dataBase.onsuccess = function (e) {
        /*alert('Base de datos cargada correctamente');*/

    };

    dataBase.onerror = function (e) {
       /* alert('Error cargando la base de datos');*/
    };
}
