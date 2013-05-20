	
	if (typeof mynamespace === 'undefined') {
			mynamespace = {};
	}
	
	
	
	
	
	
	
	
	
	//FUNCIONES DE NAVEGACION				-----------------------------------------------------------
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
	
	function highlightBotonTitulo(e) {
		e.style.borderRadius =" 50%";
		e.style.border = "2px solid #174e85";
	}
	
	function unhighlightBotonTitulo(e) {
		e.style.border = "none";
	}

	
	
	
	
	
	
	
	//FUNCIONES GENERALES			----------------------------------------------------------------------
	function displayProductoInfo(){
			try{
			mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT productos.*,pasillos.nombre pasillo FROM productos,pasillos WHERE productos.id = '+productos_id+' AND productos.pasillos_id=pasillos.id ORDER BY nombre ASC', [], 
								function (tx, results) {
								var lista_html="";
								for (var i = results.rows.length; i--;) {
											document.getElementById('nombre_producto').innerHTML = results.rows.item(i).nombre;
											document.getElementById('nombreform').value = results.rows.item(i).nombre;
											document.getElementById('descripcion').value = results.rows.item(i).descripcion;
											document.getElementById('pasilloform').value = results.rows.item(i).pasillo;
								}
								
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
	
	function addProducto(id){
			$('body').attr('productos_id',id);
			var myfileurl = "agregarproducto.html";
			$('body').load(myfileurl, function() {});
	}
	
	function addCantidad(){
			cantidad.value 	= parseInt(cantidad.value) + 1;
	}
	
	function subCantidad(){
			if(parseInt(cantidad.value) >=2 ){	
				cantidad.value = parseInt(cantidad.value) - 1;
			}
	}
	
	function agregarProducto(){
			try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								var insert_query	=	"INSERT INTO productos_listas (id, listas_id, productos_id, descripcion, cantidad, estado, updated) VALUES (null,'"+listas_id+"','"+productos_id+"','"+document.getElementById('descripcion').value +"','"+ document.getElementById('cantidad_productos').value+"',0,datetime('now'));";
								log(insert_query);
								t.executeSql(
									insert_query, 
									[], function(tx,r){
											$('body').load('listallena.html');
									}, function(tx,e){
											alert(e.message)
									}
								);
								
								var myfileurl = "nuevalista.html";
							    $('body').load(myfileurl, function() {});
							}
						);
				}
			}catch(err){		log(err.message );		}
	}
	
	function log(message){	/*	alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	
	
	
	
	
	
	
	
	//VARS							----------------------------------------------------------------------
	var anchopantalla	= window.innerWidth;
	var Form 			= document.getElementById("formproducto");
	var inputNombre 	= document.getElementById("nombreform");
	var inputEmail  	= document.getElementById("pasilloform");
	var textArea 		= document.getElementById("descripcion");
	var altodeInput 	= anchopantalla * 0.9 * 0.1 + "px";
	var altoTextArea	= anchopantalla * 0.9 * 0.235 + "px";
	var productos_id	= $('body').attr('productos_id');
	var listas_id		= $('body').attr('listas_id');
	var cantidad 		= document.getElementById('cantidad_productos');
	inputNombre.style.height	= altodeInput;
	inputEmail.style.height		= altodeInput;
	textArea.style.height 		= altoTextArea;
	
	
	
	
	
	
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
	
	
	displayProductoInfo();