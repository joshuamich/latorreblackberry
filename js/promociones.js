/* 
 * Javascript para la sección de promociones
 */

var promociones = document.getElementById("listado_promociones");
var promociones_item_alto = anchopantalla * 0.94*0.38;
var promociones_item_alto_String = promociones_item_alto + "px";
var itempromociones = promociones.getElementsByTagName("li");
for (i = 0; i < itempromociones.length; i++) {
    itempromociones[i].style.height = promociones_item_alto_String;
}