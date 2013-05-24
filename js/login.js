

	
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	var Form = document.getElementById("formlogin");
	var loginNombre = document.getElementById("emailLogin");
	var loginEmail = document.getElementById("passwordLogin");
	var submitLogin = document.getElementById("submitLogin");
	var registrarseLogin = document.getElementById("registrarseLogin");
	loginNombre.style.height = anchopantalla * 0.9* 0.07+"px";
	loginNombre.style.width = (anchopantalla * 0.9-12)+"px";
	loginEmail.style.height = anchopantalla * 0.9* 0.07+"px";
	loginEmail.style.width = (anchopantalla * 0.9-12)+"px";
	submitLogin.style.height =anchopantalla * 0.9 * 0.3*0.29 + "px";
	registrarseLogin.style.height = anchopantalla * 0.9 * 0.3*0.29-4 +"px";
	registrarseLogin.style.lineHeight =anchopantalla * 0.9 * 0.3*0.29-2 +"px";