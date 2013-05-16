/* 
 * 
 * Javascript para la sección de Contactenos
 * 
 */

var Form = document.getElementById("formcontactenos");
var inputNombre = document.getElementById("nombreform");
var inputEmail = document.getElementById("emailform");
var textArea = document.getElementById("mensajeform");
var submitButton = document.getElementById("submitbutton");
var altodeInput = anchopantalla * 0.9 * 0.1 + "px";
var altoTextArea = anchopantalla * 0.9 * 0.235 + "px";
var altosubmit = anchopantalla * 0.9* 0.099+"px";
inputNombre.style.height= altodeInput;
inputEmail.style.height= altodeInput;
textArea.style.height = altoTextArea;
submitButton.style.height = altosubmit;
