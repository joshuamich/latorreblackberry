	if (typeof mynamespace === 'undefined') {
			mynamespace = {};
	}

	function sendListas(){
		try{
			mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							
							var array_listas = Array();
							t.executeSql('select listas.ri listas_ri , listas.id listas_id ,listas.nombre listas_nombre,productos_listas.productos_id productos_id, productos_listas.cantidad FROM listas,productos_listas  WHERE listas.ri = 0 AND listas.id=productos_listas.listas_id ORDER BY listas.id ASC', [], 
								function (tx, results) {
										var len2 = results.rows.length;
										var xml_string = "";
										var current_li = "";
										var contador=0;
										for (var u = len2; u--;) {
												
												if(results.rows.item(u).listas_id != current_li){
													current_li=results.rows.item(u).listas_id;
													if(contador == 0){
														xml_string += "<item>";
													}else{
														xml_string += "</productos></item><item>";
													}
													
													xml_string += "<listas_id>"+results.rows.item(u).listas_id+"</listas_id>";
													xml_string += "<listas_ri>"+results.rows.item(u).listas_ri+"</listas_ri>";
													xml_string += "<listas_nombre>"+results.rows.item(u).listas_nombre+"</listas_nombre>";
													xml_string += "<productos>";
												}
												
												xml_string += "!---!item!-*-!";
													xml_string += "!---!productos_id!-*-!"+results.rows.item(u).productos_id+"!---!/productos_id!-*-!";
													xml_string += "!---!cantidad!-*-!"+results.rows.item(u).cantidad+"!---!/cantidad!-*-!";
												xml_string += "!---!/item!-*-!";
												contador++;
										}
										
										if(contador > 0){
												  xml_string += "</productos></item>";
												  xml_string = "<items>"+xml_string+"</items>";	
										}
										sendXML(xml_string);	
								}
							);
						}
					);
			}
			}catch(err){	
					log(err.message );	
			}
	}
    
	function sendXML(xml_string){
			var xmlhttp = new XMLHttpRequest();
			var email	=	document.getElementById('emailLogin').value;
			xmlhttp.open("POST",send_listas_url+"ws.php?option=sync_listas&email="+email+"&xml_lista="+xml_string,false);
			xmlhttp.send();
			if(xmlhttp.responseText != ""){
					
				parseXML_listas(xmlhttp.responseText);
			}else{
					alert("Error en transferencia de información, por favor intente de nuevo más tarde.");
			}
	} 
     
	function parseXML_listas(xml_string){
			var parser		  = 	new DOMParser();
			var xmlDocument   = 	parser.parseFromString( xml_string, "text/xml" );
			var items 	 	  = 	xmlDocument.getElementsByTagName("item");
			var tableContent  = 	"";
			var array_listas= new Array();
			
			for (var i = 0; i < items.length; i++) {
				
				var listas_id 	  	 = items[i].getElementsByTagName("listas_id");
				var listas_nombre 	 = items[i].getElementsByTagName("listas_nombre");
				var productos_listas = items[i].getElementsByTagName("productos");
				var fail		  = false;
				
				if(listas_id.length>0){
						if(listas_id[0].firstChild!=null){
								
								var item_lista = new Array();
								item_lista[0]  = listas_id[0].firstChild.nodeValue;
								if(listas_nombre.length>0){ 	if(listas_nombre[0].firstChild!=null){	item_lista[1]  = listas_nombre[0].firstChild.nodeValue;	}else{ 	item_lista[1] = ""; fail=true;	}	}else{	item_lista[1] = ""; fail=true; }
															
								
								if(productos_listas.length>0){ 			
										if(productos_listas[0].firstChild!=null){	
													
												var xml_productos   = 	productos_listas[0].firstChild.nodeValue + "";
												var pro_array		=	xml_productos.split("-");
												var array_productos = new Array();
												for (var y = 0; y < pro_array.length; y++) {
														if(pro_array[y] != "" && pro_array[y] != null){
																var item_producto	=	pro_array[y].split(",");
																array_productos[array_productos.length]	=	item_producto;
														}
														
														
												}	
												item_lista[2] = array_productos; 
										}else{ 	
												item_lista[2] = ""; 
												fail=true;	
										}
								}else{	
										item_lista[2] = ""; 
										fail=true; 
								}
								
								
								if(!fail && item_lista.length == 3){
										array_listas[array_listas.length] = item_lista;
								}
						}
				}
			}
			insertListasProductos(array_listas);
	}
	
	
	
	function insertListasProductos(array_listas){
		var len=array_listas.length;
		
		try{
		if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var len = array_listas.length;
								log('Inserting ' + len +' rows');
								t.executeSql("DELETE FROM listas");
								t.executeSql("DELETE FROM productos_listas");
								t.executeSql("UPDATE sqlite_sequence SET seq=0;");
								for (var i = len; i--;){
									var item_obj 		=	array_listas[i];
									var insert_query	=	"INSERT INTO listas (id,users_id,nombre,ri,updated) VALUES ('"+item_obj[0]+"','0','"+item_obj[1]+"','"+item_obj[0]+"',datetime('now'));";
									var insert_id 		=	"";
									t.executeSql(insert_query,
												[],
												function (tx, res) {	
															
																	contado=0;
															
												},
												function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
												);
									/*while(insert_id == ""){
										//loop
									}*/
									
									
									//insert_id = res.insertId;	
									var len2 	= 	item_obj[2].length;
									var item_f 	=	item_obj[2];
									var contado	=	0;			
									for (var d = len2; d--;){
											var item_obj_p 		=	item_f[d];
											var insert_query2	=	"INSERT INTO productos_listas (id, listas_id, productos_id, descripcion, cantidad, estado, updated) VALUES (null,'"+item_obj[0]+"','"+item_obj_p[0]+"','','"+item_obj_p[1]+"',0,datetime('now'));";
											t.executeSql(insert_query2,
														[],
														function (tx2, res2) {	contado=1;	},
														function (tx2, err2) {	contado=1; log("ERROR - row creation failed - code: " + err2.code + ", message: " + err2.message);	}
											);
									}
																	/*while(contado != 1 ){
																	//loop
																	}*/					
									
										
								}
								
								
								alert("Sincronizado exitosamente");
								//hideLoading();		
							}
						);
						
				}
		
		}catch(err){		log(err.message );		}
		
		
		
		
	}
	 
    function errorOnDB(){} 
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	var send_listas_url="http://127.0.0.1/latorreadmin/";
	var Form = document.getElementById("formlogin");
	var loginNombre = document.getElementById("emailLogin");
	var loginEmail = document.getElementById("passwordLogin");
	var submitLogin = document.getElementById("submitLogin");
	var registrarseLogin = document.getElementById("registrarseLogin");
	loginNombre.style.height = anchopantalla * 0.9* 0.07+"px";
	loginNombre.style.width  = (anchopantalla * 0.9-12)+"px";
	loginEmail.style.height  = anchopantalla * 0.9* 0.07+"px";
	loginEmail.style.width   = (anchopantalla * 0.9-12)+"px";
	submitLogin.style.height = anchopantalla * 0.9 * 0.3*0.29 + "px";
	registrarseLogin.style.height = anchopantalla * 0.9 * 0.3*0.29-4 +"px";
	registrarseLogin.style.lineHeight =anchopantalla * 0.9 * 0.3*0.29-2 +"px";