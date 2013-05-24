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
			var myfileurl = "internaLista.html";
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
	
	function borrarLista(id){
			$('body').attr('listas_id',id);
			var txt = "Esta seguro que desea borrar la lista.";
			try {
			var buttons = ["Si", "No"];
			var ops = {title : "Confirmación", size : blackberry.ui.dialog.SIZE_MEDIUM, position : blackberry.ui.dialog.CENTER};
			blackberry.ui.dialog.customAskAsync("¿Desea borrar la lista?", buttons, borrarCallBack, ops);
			} catch(e) {
				alert("Exception in customDialog: " + e);
			}
	}
	
	function borrarCallBack(index){
			if(index==0){
				deleteLista($('body').attr('listas_id'));
			}
	}
	
	function limpiarLista(id){
			$('body').attr('listas_id',id);
			var txt = "Esta seguro que desea limpiar la lista.";
			try {
			var buttons = ["Si", "No"];
			var ops = {title : "Confirmación", size : blackberry.ui.dialog.SIZE_SMALL, position : blackberry.ui.dialog.CENTER};
			blackberry.ui.dialog.customAskAsync("¿Desea limpiar la lista?", buttons, limpiarCallBack, ops);
			} catch(e) {
				alert("Exception in customDialog: " + e);
			}
	}
	
	function limpiarCallBack(index){
			if(index==0){
				cleanLista($('body').attr('listas_id'));
			}
	}
	
	function errorOnDB(){
			location.href="index.html";
	}
	
	function fixSize(){
			var listas_creadas 		 = document.getElementById("listas_creadas");
			var hijos_listas_creadas = listas_creadas.getElementsByTagName("li");
			for (var i = hijos_listas_creadas.length; i--;) {
				hijos_listas_creadas[i].style.width  = anchoString;
				hijos_listas_creadas[i].style.height = alto_listas_creadas_string;
			}
	}
	
	function insert_Pasillos(array_pasillos){
			try{
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var len=array_pasillos.length;
								log('Inserting ' + len +' rows');
								for (var i = len; i--;){
									var item_obj 		=	array_pasillos[i];
									var delete_query 	=	'DELETE FROM pasillos WHERE id = ' + item_obj[0] + ' ';
									var insert_query	=	'INSERT INTO pasillos (id,nombre,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'")';
									t.executeSql(delete_query);
									t.executeSql(insert_query,
												[],
												function (tx, res) {	log("row Created Successfully");	},
												function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
												);
								}
								log('Finish insert');
								getProductos();		
							}
						);
						
				}
			
			}catch(err){		log(err.message );		}	
	}
	
	function parser_Pasillos(xmlstring){
			var parser		  = 	new DOMParser();
			var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
			var items 	 	  = 	xmlDocument.getElementsByTagName("item");
			var tableContent  = 	"";
			var array_pasillos= new Array();
			for (var i = 0; i < items.length; i++) {  
				var pasillos_id		= items[i].getElementsByTagName("id");
				var pasillos_nombre	= items[i].getElementsByTagName("nombre");
				var pasillos_updated= items[i].getElementsByTagName("updated");
				var fail			= false;
				
				if(pasillos_id.length>0){
					if(pasillos_id[0].firstChild!=null){
							var item_pasillo = new Array();
							item_pasillo[0]  = pasillos_id[0].firstChild.nodeValue;
							if(pasillos_nombre.length>0){ if(pasillos_nombre[0].firstChild!=null){		item_pasillo[1]  = pasillos_nombre[0].firstChild.nodeValue;	}else{ 	item_pasillo[1] = ""; fail=true;	}	}else{	item_pasillo[1] = ""; fail=true; }
							if(pasillos_updated.length>0){if(pasillos_updated[0].firstChild!=null){		item_pasillo[2]  = pasillos_updated[0].firstChild.nodeValue;}else{	item_pasillo[2] = ""; fail=true;	}	}else{	item_pasillo[2] = ""; fail=true; }
																
							if(!fail && item_pasillo.length == 3){
									array_pasillos[array_pasillos.length]=item_pasillo;
							}
					}
				}
			}
			insert_Pasillos(array_pasillos);
	}
	
	function getPasillos(){
			try{
			if(blackberry.system.hasDataCoverage()){
						var ultima_fecha="1990-01-01";
						mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
						if(mynamespace.db){
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql("SELECT coalesce(MAX(updated),'2013-01-01') ultima_fecha FROM pasillos", [], 
											function (tx, results) {
												
												for(var i=0;i<results.rows.length;i++){
													ultima_fecha = results.rows.item(i).ultima_fecha;
												}
												
											}
										);
									}
								);
						}
						pasillos_url += "&fecha="+ultima_fecha;
						
						
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									log('ok -  response');
									parser_Pasillos(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									log('Error de conexion.');
							}
						}
						log('Sending request to: ' + pasillos_url +' ...');
						xmlhttp.open("GET",pasillos_url,true);
						xmlhttp.send();
				}else{
						log('Error en la conexion.');
				}
			}catch(err){		log(err.message );		}
	}
	
	function insert_Productos(array_productos){
			try{
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var len=array_productos.length;
								log('Inserting ' + len +' rows');
								for (var i = len; i--;){
									var item_obj 		=	array_productos[i];
									var delete_query 	=	'DELETE FROM productos WHERE id = ' + item_obj[0] + ' ';
									var insert_query	=	'INSERT INTO productos (id,pasillos_id,nombre,descripcion,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'")';
									t.executeSql(delete_query);
									t.executeSql(insert_query,
												[],
												function (tx, res) {	log("row Created Successfully");	},
												function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
												);
								}
								log('Finish insert');
								//hideLoading();		
							}
						);
						
				}
			
			}catch(err){		log(err.message );		}
	}
	
	function parser_Productos(xmlstring){
			var parser		  = 	new DOMParser();
			var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
			var items 	 	  = 	xmlDocument.getElementsByTagName("item");
			var tableContent  = 	"";
			var array_productos= new Array();
			for (var i = 0; i < items.length; i++) {
				var productos_id		= items[i].getElementsByTagName("id");
				var pasillos_id			= items[i].getElementsByTagName("pasillos_id");
				var productos_nombre	= items[i].getElementsByTagName("nombre");
				var productos_descripcion=items[i].getElementsByTagName("descripcion");
				var productos_updated	= items[i].getElementsByTagName("updated");
				var fail				= false;
				
				if(productos_id.length>0){
					if(productos_id[0].firstChild!=null){
							var item_producto = new Array();
							item_producto[0]  = productos_id[0].firstChild.nodeValue;
							if(pasillos_id.length>0){ 		if(pasillos_id[0].firstChild!=null){			item_producto[1]  = pasillos_id[0].firstChild.nodeValue;		}else{ 	item_producto[1] = ""; fail=true;	}	}else{	item_producto[1] = ""; fail=true; }
							if(productos_nombre.length>0){ 	if(productos_nombre[0].firstChild!=null){		item_producto[2]  = productos_nombre[0].firstChild.nodeValue;	}else{ 	item_producto[2] = ""; fail=true;	}	}else{	item_producto[2] = ""; fail=true; }
							if(productos_descripcion.length>0){ if(productos_descripcion[0].firstChild!=null){item_producto[3]  = productos_descripcion[0].firstChild.nodeValue;}else{ 	item_producto[3] = ""; fail=true;}	}else{	item_producto[3] = ""; fail=true; }
							if(productos_updated.length>0){	if(productos_updated[0].firstChild!=null){		item_producto[4]  = productos_updated[0].firstChild.nodeValue;	}else{	item_producto[4] = ""; fail=true;	}	}else{	item_producto[4] = ""; fail=true; }
																
							if(!fail && item_producto.length == 5){
									array_productos[array_productos.length]=item_producto;
							}
					}
				}
			}
			insert_Productos(array_productos);
	}
	
	function getProductos(){
			try{
			if(blackberry.system.hasDataCoverage()){
						var ultima_fecha="1990-01-01";
						mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
						if(mynamespace.db){
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql("SELECT coalesce(MAX(updated),'2013-01-01') ultima_fecha FROM productos", [], 
											function (tx, results) {
												
												for(var i=0;i<results.rows.length;i++){
													ultima_fecha = results.rows.item(i).ultima_fecha;
												}
												
											}
										);
									}
								);
						}
						productos_url += "&fecha="+ultima_fecha;
						
						
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									log('ok -  response');
									parser_Productos(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									log('Error de conexion.');
							}
						}
						log('Sending request to: ' + productos_url +' ...');
						xmlhttp.open("GET",productos_url,true);
						xmlhttp.send();
				}else{
						
				}
			}catch(err){		log(err.message );		}
	}
	
	
	
	

	
	
	
	//FUNCIONES GENERALES	-------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function deleteLista(id){
		try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								var delete_query	=	" DELETE FROM productos_listas WHERE listas_id="+id;
								t.executeSql(delete_query);
								delete_query		=	" DELETE FROM listas WHERE id="+id;
								t.executeSql(
										delete_query, 
										[], function(tx,r){
												displayListas();
										}, function(tx,e){
											alert(e.message)
										}
								);
							}
						);
				}
		}catch(err){		log(err.message );		}
	
	}
	
	function cleanLista(id){
		try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								var delete_query	=	" DELETE FROM productos_listas WHERE listas_id= "+id;
								t.executeSql(
										delete_query, 
										[], function(tx,r){
												displayListas();
										}, function(tx,e){
											alert(e.message)
										}
								);
								
								
							}
						);
				}
		}catch(err){		log(err.message );		}
	
	}
	
	function displayListas(){
		try{
		mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
		if(mynamespace.db){
				mynamespace.db.readTransaction(
					function (t) {
						t.executeSql('SELECT Coalesce(SUM(pl.cantidad),0) as total_productos, l.nombre,l.id FROM listas l LEFT JOIN productos_listas pl ON l.id=pl.listas_id GROUP BY l.id ORDER BY l.updated ASC', [], 
							function (tx, results) {
							var lista_html="";
							var len=results.rows.length;
							for (var i = len; i--;) {
										lista_html += '<li><a class="verlista"  x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showLista('+results.rows.item(i).id+');"></a><a class="limpiarlista"><img src="images/limpiarbutton.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="limpiarLista('+results.rows.item(i).id+')" width="97%"/></a>';
										lista_html += '<a class="borrarlista"><img src="images/borrarbutton.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" width="97%" onclick="borrarLista('+results.rows.item(i).id+')"/></a>';
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
	
	function log(message){	/*	alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	function init(){
			displayListas();
			fixSize();
			getPasillos();
	}
	
	
	
	
	
	
	
	
	
	//		VARS
	var productos_url		= "http://www.innotechsa.com/latorre_admin/ws.php?option=productos";
	var pasillos_url		= "http://www.innotechsa.com/latorre_admin/ws.php?option=pasillos";
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
	
	init();
	
	