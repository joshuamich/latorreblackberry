	if (typeof mynamespace === 'undefined') {
		mynamespace = {};
	}
	
	if (window.openDatabase){
			mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
	}else{
			log("This device does not have HTML5 Database support");
	}
	
	function errorOnDB(database){
			location.href="index.html";	
	}
	
	
	
	
	
	
	
	
	
	//NAVIGATION
	function highlight(e) {
			e.style.border = "2px solid #2175f7";
	}
	
	function unhighlight(e) {
			e.style.border = "2px solid transparent";
	}
	
	
	
	
	
	
	
	
	
	//FUNCTIONS
	function displayProductos() {
			
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							
							var filtro="";
							if(option==1){
								filtro=" AND pl.estado=0 ";
							}
							t.executeSql('SELECT pl.id pl_id,p.nombre p_nombre,pl.estado,pa.nombre pa_nombre,pa.id pa_id,pl.cantidad FROM productos_listas pl,productos p, pasillos pa WHERE pl.productos_id=p.id AND p.pasillos_id=pa.id AND pl.listas_id='+listas_id+' '+ filtro +' ORDER BY pa.id ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '<ul>';
												var pasillo_id="";
												for (i = 0; i < len; i++) {
														var selected_img="radio_unselected";
														if(pasillo_id != results.rows.item(i).pa_id){
															html_item += '</ul><h2>'+results.rows.item(i).pa_nombre+'</h2><ul>';
														}
														if(results.rows.item(i).estado==1){
															selected_img="radio_selected";
														}
														
														
														html_item+='<li>'+
																		'<a class="item_nombre" href="#">'+ results.rows.item(i).cantidad+'  '+results.rows.item(i).p_nombre+'</a>'+
																		'<a class="checkitem">'+
																		' 	<img src="images/'+selected_img+'.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" width="100%" onclick="selectItem('+results.rows.item(i).pl_id+','+results.rows.item(i).estado+')"/>'+
																		'</a>'+
																		'<a class="borraritem">'+
																		'   <img src="images/trash.png" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" width="100%" onclick="deleteItem('+results.rows.item(i).pl_id+');"/>'+
																		'</a>'+
																	'</li>';
														pasillo_id=results.rows.item(i).pa_id;
												}
												html_item+='</ul>';
												
												document.getElementById('agregarMiListaC').innerHTML=html_item;
										}
							);
							
							t.executeSql('SELECT id,nombre FROM listas WHERE id= '+listas_id , [], 
							function (tx, results) {
							for (var i = results.rows.length; i--;) {
										document.getElementById('titulo_lista').innerHTML=results.rows.item(i).nombre;
							}
							}
							);
						}
					);
			}
	}
	
	function init(){
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
					var myfileurl="internaLista.html";	
					$('body').load(myfileurl, function() {
					});
			});
			displayProductos();
	}
	
	function showPL(id){
			$('body').attr('productos_listas_id',id);
			var myfileurl="modificarproducto.html";	
					$('body').load(myfileurl, function() {
			});	
	}
	
	function selectItem(id,estado){
			try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								if(estado==1){estado=0;}else{estado=1;}
								var i;
								var update_query	=	"UPDATE  productos_listas SET estado='"+estado+"'	WHERE id="+id;
								log(update_query);
								t.executeSql(
									update_query, 
									[], function(tx,r){
											displayProductos();
									}, function(tx,e){
											alert(e.message);
											
									}
								);
								
								
							}
						);
				}
			}catch(err){		log(err.message );		}
	}
	
	function deleteItem(id){
		try{
				mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								
								var i;
								var update_query	=	"DELETE FROM  productos_listas 	WHERE id="+id;
								log(update_query);
								t.executeSql(
									update_query, 
									[], function(tx,r){
											displayProductos();
									}, function(tx,e){
											alert(e.message);
											
									}
								);
								
								
							}
						);
				}
			}catch(err){		log(err.message );		}
		
	}
	
	
	
	
	
	
	
	//VARS
	var listas_id = $("body").attr("listas_id");
	var option = $("body").attr("opt");
	init();