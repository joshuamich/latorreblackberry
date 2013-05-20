	
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









	//VARS 			---------------------------------------------
	var nuevalista = document.getElementById("crearMenuLista");
	nuevalista.style.height = anchopantalla * 0.155 + "px";