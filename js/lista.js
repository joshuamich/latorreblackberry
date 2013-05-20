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
	function displayServicios() {
			
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {
					var myfileurl="index.html";	
					$('body').load(myfileurl, function() {});
			});
			
			
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT pl.id pl_id,p.nombre p_nombre,pl.estado,pa.nombre pa_nombre,pa.id pa_id FROM productos_listas pl,productos p, pasillos pa WHERE pl.productos_id=p.id AND p.pasillos_id=pa.id AND pl.listas_id='+listas_id+' ORDER BY pa.id ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '<ul>';
												var pasillo_id="";
												for (i = 0; i < len; i++) {
														if(pasillo_id != results.rows.item(i).pa_id){
															html_item += '</ul><h2>'+results.rows.item(i).pa_nombre+'</h2><ul>';
														}
														html_item+='<li><a href="#" x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);">'+results.rows.item(i).p_nombre+'</a></li>';
														pasillo_id=results.rows.item(i).pa_id;
												}
												html_item+='</ul>';
												
												document.getElementById('agregarMiListaC').innerHTML=html_item;
										}
							);
						}
					);
			}
	}
	
	
	
	
	//VARS
	
	var listas_id = $("body").attr("listas_id");
	displayServicios();