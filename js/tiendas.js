

	//FUNCIONES
   /* function crearMarcador(lat, long) {
        var location 	= new google.maps.LatLng(lat, long);
        var iconoUrl 	= 'images/pinmap.png';
        var marker 		= new google.maps.Marker({
            position: location,
            map: map,
            icon: iconoUrl
        });
        return marker;
    }*/

   /* function addInfoWindow(marker, message) {
        var infoWindow = new google.maps.InfoWindow({
            content: message
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
            setTimeout(function() {
                infoWindow.close();
            }, 8000);
        });
    }*/
	function crearMarcador(lat, long,nombre,descripcion) {
			var location = new google.maps.LatLng(lat, long);
			var marker   = new GMarker(location,tienda_Icon);
			var temp= new Array();
			temp[0]=marker;
			temp[1]=nombre;
			temp[2]=descripcion;
			tiendas.push(temp);
			map.addOverlay(temp[0]);
			return marker;
	}
	
	function parser_Ubicaciones(xmlstring){
			var parser		  = 	new DOMParser();
			var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
			var items 	 	  = 	xmlDocument.getElementsByTagName("item");
			var tableContent  = 	"";
			var array_ubicaciones= new Array();
			for (var i = 0; i < items.length; i++) {  
				var ubicaciones_nombre		= items[i].getElementsByTagName("nombre");
				var ubicaciones_descripcion	= items[i].getElementsByTagName("descripcion");
				var ubicaciones_lat			= items[i].getElementsByTagName("lat");
				var ubicaciones_long		= items[i].getElementsByTagName("long");
				var fail					= false;
				
				if(ubicaciones_nombre.length>0){
					if(ubicaciones_nombre[0].firstChild!=null){
							var item_contenido = new Array();
							if(ubicaciones_nombre.length>0){	if(ubicaciones_nombre[0].firstChild!=null){		item_contenido[0]  = ubicaciones_nombre[0].firstChild.nodeValue;	}else{ item_contenido[0] = ""; fail=true;	}	}else{	item_contenido[0] = ""; fail=true; }
							if(ubicaciones_descripcion.length>0){if(ubicaciones_descripcion[0].firstChild!=null){item_contenido[1] = ubicaciones_descripcion[0].firstChild.nodeValue;}else{item_contenido[1] = ""; fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
							if(ubicaciones_lat.length>0){		if(ubicaciones_lat[0].firstChild!=null){		item_contenido[2]  = ubicaciones_lat[0].firstChild.nodeValue;		}else{ item_contenido[2] = ""; fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
							if(ubicaciones_long.length>0){		if(ubicaciones_long[0].firstChild!=null){		item_contenido[3]  = ubicaciones_long[0].firstChild.nodeValue;		}else{ item_contenido[3] = ""; fail=true;	}	}else{	item_contenido[3] = ""; fail=true; }
																
							if(!fail && item_contenido.length == 4){
									crearMarcador(item_contenido[2]+'', item_contenido[3]+'',item_contenido[0]+'',item_contenido[1]+'');
							}
					}
				}
			}
			if (tiendas) {
			for (i in tiendas) {
				   tiendas[i][0].show();
			}
			}	
	}
	
	function buscarTienda(){
			log('Buscando Tiendas');
			var len=tiendas.length;
			var nedd=(document.getElementById('texto_buscador').value+'').toLowerCase();
			
			for(var i = len; i--;){
					log(tiendas[i][1]+tiendas[i][2]+'    i:'+i);
					if( (tiendas[i][1]+tiendas[i][2]+'').toLowerCase().indexOf(nedd) > 0){
						map.setCenter(tiendas[i][0].getLatLng(), 15);	
						log('hit ' + i);
						break;
					}
			}
			return false;
			
	}
	
	function getUbicaciones(){
				if(blackberry.system.hasDataCoverage()){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									parser_Ubicaciones(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									 log('Error de conexion.');
							}
						}
					
						xmlhttp.open("GET",ubicaciones_url,true);
						xmlhttp.send();
				}else{
						
				}
	}
	
	function init(){
		if (blackberry.ui.menu.getMenuItems().length > 0) {
				blackberry.ui.menu.clearMenuItems();
		}
		blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
				//showLoading();
				var myfileurl = "index.html";	
				$('body').load(myfileurl, function() {});
		});	
		
		if(blackberry.system.hasDataCoverage()){	
				var map_canvas		   = document.getElementById("mapa");
				map_canvas.style.width = bb_width+"px";
				map_canvas.style.height= (bb_height)+"px";
				
				map = new GMap2(document.getElementById("mapa"));
				map.addControl(new GLargeMapControl());
				map.addControl(new GMapTypeControl());
				map.setCenter(new GLatLng(14.594797, -90.51778), 8);
				
				tienda_Icon 			= new GIcon();
				tienda_Icon.image 		= icono_Url;
				tienda_Icon.iconSize 	= new GSize(36,41);
				tienda_Icon.iconAnchor  = new GPoint(9,12);
				
				getUbicaciones();
		}else{
				log('Error de conexion.');
		}	
	
	}
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	
	
	
	
	
	
	
	
	
	var map;
	var tienda_Icon;
	var tiendas 			= new Array();
	var bb_width			= window.innerWidth;
	var bb_height			= window.innerHeight;
	var icono_Url 			= 'images/pinmap.png';
	var ubicaciones_url		= "http://www.innotechsa.com/latorre_admin/ws.php?option=ubicaciones";
	var buscadorMapa 		= document.getElementById("buscadorMapa");
	var altobuscadorMapa	= anchopantalla * 0.9 * 0.09 + "px";
	
	buscadorMapa.style.height = altobuscadorMapa;

    //var pruebamark 			= crearMarcador(14.604017, -90.51778);
    //var pruebamarkdos 		= crearMarcador(14.614017, -90.50378);
    //addInfoWindow(pruebamark, "hola");
    //addInfoWindow(pruebamarkdos, "hola marcador dos");
	
	init();