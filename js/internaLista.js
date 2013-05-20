	
	//FUNCIONES DE NAVEGACION		--------------------------------
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

	




	

	
	//FUNCIONES		----------------------------------------------
	function addProducto(){
		var myfileurl = "pasillos.html";
		$('body').load(myfileurl, function() {});
	}

	function showDetalleLista(option){
		$('body').attr('opt',option);
		var myfileurl = "lista.html";
		$('body').load(myfileurl, function() {});
	}
	
	function displayListaInfo(){
		try{
		mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, errorOnDB);
		if(mynamespace.db){
				mynamespace.db.readTransaction(
					function (t) {
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
		}catch(err){	log(err.message );	}
	}

	function init(){
		blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {  
				var myfileurl="index.html";	
				$('body').load(myfileurl, function() {
				});
		});
		displayListaInfo();	
	}









	//VARS 			---------------------------------------------
	var nuevalista = document.getElementById("crearMenuLista");
	var nombre_lista=document.getElementById("titulo_lista");
	var listas_id=$('body').attr('listas_id');
	nuevalista.style.height = anchopantalla * 0.155 + "px";
	init();