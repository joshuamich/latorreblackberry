	if (typeof mynamespace === 'undefined') {
			mynamespace = {};
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//		FUNCIONES DE NAVEGACION		-----------------------------------------------------------
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
	
	
	
	
	
	
	
	
	
	//FUNCTIONS						-----------------------------------------------------------
	function showInternaLista() {
		var myfileurl = "internaLista.html";
		$('body').load(myfileurl, function() {
			});
	}
	
	function insertLista() {
			try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								nombre_lista	=	document.getElementById('nombrelista').value;
								var insert_query	=	"INSERT INTO listas (id,users_id,nombre,updated) VALUES (null,'"+users_id+"','"+nombre_lista+"',datetime('now'));";
								
								t.executeSql(
									insert_query, 
									[], function(tx,r){
										$('body').attr('listas_id',r.insertId);
									}, function(tx,e){
										alert(e.message)
									}
								);
								
								showInternaLista();
							}
						);
				}
			}catch(err){		log(err.message );		}
	}
	
	function errorOnDB(){
			location.href="index.html";
	}
	
	function log(message){	/*	alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	
	
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
	
	
	
	
	
	//VAR						-----------------------------------------------------------
	var inputForm = document.getElementById("nombrelista");
	inputForm.style.height= anchopantalla*0.9*0.075 + "px";
	inputForm.style.width = ((anchopantalla*0.9)-14) + "px";
	var crearListaButton = document.getElementById("crearListaButton");
	crearListaButton.style.height = anchopantalla*0.9*0.075 + "px";
	crearListaButton.style.width = anchopantalla*0.9 + "px";
	var crearListaForm = document.getElementById("crearListaForm");
	crearListaForm.style.height = anchopantalla*0.4 + "px";
	var users_id=1;
	var nombre_lista="";