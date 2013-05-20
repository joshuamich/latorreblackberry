	if (typeof mynamespace === 'undefined') {
			mynamespace = {};
	}
	
	//		FUNCIONES DE NAVEGACION
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
	
	
	
	//		ACCIONES
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
	
	function showLista(id) {
		$("body").attr('listas_id', id);
		var myfileurl = "lista.html";
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
	
	

	//FUNCIONES GENERALES
	function displayListas(){
		try{
		mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
		if(mynamespace.db){
				mynamespace.db.readTransaction(
					function (t) {
						t.executeSql('SELECT Coalesce(SUM(pl.cantidad),0) as total_productos, l.nombre,l.id FROM listas l LEFT JOIN productos_listas pl ON l.id=pl.listas_id GROUP BY l.id ORDER BY l.updated ASC', [], 
							function (tx, results) {
							var lista_html="";
							for (var i = results.rows.length; i--;) {
										lista_html += '<li><a class="verlista"  x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showLista('+results.rows.item(i).id+');"></a><a class="limpiarlista"><img src="images/limpiarbutton.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" width="97%"/></a>';
										lista_html += '<a class="borrarlista"><img src="images/borrarbutton.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" width="97%"/></a>';
										lista_html += '<span class="nombre_lista">'+results.rows.item(i).nombre+'</span><span class="numero_productos">'+results.rows.item(i).total_productos+' Productos</span></li>';
							}
							document.getElementById('listas_creadas').innerHTML=lista_html;
							}
						);
					}
				);
		}
		}catch(err){	log(err.message );	}
	}		
	
	function errorOnDB(){
			location.href="index.html";
	}
	
	
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
	
	
	
	
	
	
	
	
	//		VARS
	var anchopantalla 			= window.innerWidth;
	var container_ancho 		= document.getElementById("container");
	var anchoString 			= anchopantalla + "px";
	container_ancho.style.width = anchoString;
	var alto_listas_creadas		= anchopantalla * 0.97 * 0.125;
	alto_listas_creadas_string 	= alto_listas_creadas + "px";
	var menu_alto 				= anchopantalla * 0.17;
	var menu_alto_string		= menu_alto + "px";
	var alto_menu 				= document.getElementById("menuprincipal");
	alto_menu.style.height 		= menu_alto_string;
	
	
	function fixSize(){
			var listas_creadas 		 = document.getElementById("listas_creadas");
			var hijos_listas_creadas = listas_creadas.getElementsByTagName("li");
			for (var i = hijos_listas_creadas.length; i--;) {
				hijos_listas_creadas[i].style.width  = anchoString;
				hijos_listas_creadas[i].style.height = alto_listas_creadas_string;
			}
	}
	
	
	function init(){
			displayListas();
			fixSize();
	}
	
	function log(message){	/*	alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	init();
	
	