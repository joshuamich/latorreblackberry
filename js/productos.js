	
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
	
	
	
	
	
	
	
	
	
	//FUNCIONES GENERALES			----------------------------------------------------------------------
	function displayPasillos(){
			try{
			mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT * FROM productos WHERE pasillos_id = '+pasillos_id+' ORDER BY nombre ASC', [], 
								function (tx, results) {
								var lista_html="";
								for (var i = results.rows.length; i--;) {
											lista_html += '<li><a href="#" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="addProducto('+results.rows.item(i).id+');">'+results.rows.item(i).nombre+'</a></li>';
											
								}
								document.getElementById('listado_pasillos').innerHTML = lista_html;
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
	
	function log(message){	/*	alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	
	
	
	
	//VARS							----------------------------------------------------------------------
	var buscadorproductosForm = document.getElementById("buscadorproductosForm");
	buscadorproductosForm.style.height = anchopantalla * 0.9 * 0.08 + "px";
	buscadorproductosForm.style.width = anchopantalla * 0.9 + "px";
	var productoNombreForm = document.getElementById("productoNombre");
	productoNombre.style.width = anchopantalla*0.9*0.90-14 +"px";
	productoNombre.style.height = anchopantalla * 0.9*0.08-4+"px";
	var submitBuscadorProductos = document.getElementById("submitBuscadorProductos");
	submitBuscadorProductos.style.width = anchopantalla * 0.9*0.1-4+"px";
	submitBuscadorProductos.style.height = anchopantalla * 0.9*0.08+"px";
	var pasillos_id=$('body').attr('pasillos_id');
	
	
	
	
	
	
	
	
	displayPasillos();