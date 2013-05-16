/* 
 *  Javascript para el archivo index.html
 */

var listas_creadas = document.getElementById("listas_creadas");
var hijos_listas_creadas = listas_creadas.getElementsByTagName("li");
for (i = 0; i < hijos_listas_creadas.length; i++) {
    hijos_listas_creadas[i].style.width = anchoString;
    hijos_listas_creadas[i].style.height = alto_listas_creadas_string;
}
