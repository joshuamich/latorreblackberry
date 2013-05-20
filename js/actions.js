
/****************************Navigation Functions****************************/
function highlight(e) {
    e.style.border = "2px solid #2175f7";
}


function unhighlight(e) {
    e.style.border = "2px solid transparent";
}

function highlightForm(e) {
    e.style.border = "2px solid #2175f7";
}

function unhighlightForm(e) {
    e.style.border = "2px solid #cdcdcd";
}

var anchopantalla = window.innerWidth;
var container_ancho = document.getElementById("container");
var anchoString = anchopantalla + "px";
container_ancho.style.width = anchoString;
var alto_listas_creadas = anchopantalla * 0.97 * 0.125;
alto_listas_creadas_string = alto_listas_creadas + "px";
var menu_alto = anchopantalla * 0.17;
var menu_alto_string = menu_alto + "px";

var alto_menu = document.getElementById("menuprincipal");
alto_menu.style.height = menu_alto_string;


/**********************************Actions************************************/

function showHome() {
    var myfileurl = "index.html";
    $('body').load(myfileurl, function() {
    });
}

function showNuevaLista() {
    var myfileurl = "nuevalista.html";
    $('body').load(myfileurl, function() {
    });
}

function showCrearLista() {
    var myfileurl = "crearLista.html";
    $('body').load(myfileurl, function() {
    });
}

function showPromociones() {
    var myfileurl = "promociones.html";
    $('body').load(myfileurl, function() {
    });
}

function showTiendas() {
    var myfileurl = "tiendas.html";
    $('body').load(myfileurl, function() {
    });
}

function showCalculadora() {
    var myfileurl = "calculadora.html";
    $('body').load(myfileurl, function() {
    });
}

function showContactenos() {
    var myfileurl = "contactenos.html";
    $('body').load(myfileurl, function() {
    });
}

function showLogin() {
    var myfileurl = "login.html";
    $('body').load(myfileurl, function() {
    });
}


/***********************************Fin de Actions******************************************/


$(document).ready(function() {
    $(".caja").focus(function() {
        if (this.value == this.defaultValue) {
            this.value = "";
        }
    }).blur(function() {
        if (!this.value.length) {
            this.value = this.defaultValue;
        }
    });
});