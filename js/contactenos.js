
	function enviarFormulario(){
					var nombre = document.getElementById("nombreform").value;
					var email = document.getElementById("emailform").value;
					var mensaje = document.getElementById("mensajeform").value;
					if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) || nombre == "Nombre" ) {
							alert("Ingrese un nombre por favor.");
							return false;
					}
					if (!(/^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i.test(email)) || email == "E-mail" ) {
							alert("Ingrese un email valido por favor.");
							return false;
					}
					if (mensaje == null || mensaje.length == 0 || /^\s+$/.test(mensaje) || mensaje == "Agregar mensaje") {
							alert("Ingrese un mensaje por favor.");
							return false;
					}
					
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("POST",base_url+"userdata.php?option=contactenosform&nombre="+nombre+"&email="+email+"&message="+mensaje,false);
					xmlhttp.send();
					if(xmlhttp.responseText=="result=true"){
							alert('Formulario enviado exitosamente.');
							var myfileurl="index.html";	
							$('body').load(myfileurl, function() {
							});
					}else{
							alert("Error en transferencia de información, por favor intente de nuevo más tarde.");
					}
			return false;
	}








	var base_url="http://www.innotechsa.com/latorre_admin/";
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
