		if (typeof mynamespace === 'undefined') {
			mynamespace = {};
		}
		try{
			(function () {
					function onDBCreate(database) {
							mynamespace.db 	= 	database;
							database.transaction(
									function (tx) {
										
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS pasillos (id int unique, nombre text, updated  DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table lista failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS productos (id int unique,pasillos_id int, nombre text,descripcion text, updated  DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table lista failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS listas (id INTEGER PRIMARY KEY AUTOINCREMENT,users_id int, nombre text, updated  DATETIME NOT NULL,ri int DEFAULT \'0\')',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table lista failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS productos_listas (id INTEGER PRIMARY KEY AUTOINCREMENT , listas_id int,productos_id int, descripcion text,cantidad int,estado int, updated  DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table lista failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(
										'CREATE TABLE IF NOT EXISTS ubicaciones (id int unique,nombre text,lat_c text,long_c text,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(
										'CREATE TABLE IF NOT EXISTS promociones (id int unique,titulo text,descripcion text,precio real,imagen blob,fecha_vencimiento datetime,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
									/*	tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('1','Bebidas','2013-05-16');");
										tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('2','Carnes','2013-05-16');");
										tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('3','Alcohol','2013-05-16');");
										tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('4','Mariscos','2013-05-16');");
										tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('5','Comida Organica','2013-05-16');");
										tx.executeSql("INSERT INTO pasillos(id , nombre, updated) VALUES ('6','Aperitivos','2013-05-16');");
										
										tx.executeSql("INSERT INTO productos(id,pasillos_id,nombre,descripcion,updated) VALUES ('1','1','jugo de naranja','litro jugo','2013-05-16');");
										tx.executeSql("INSERT INTO productos(id,pasillos_id,nombre,descripcion,updated) VALUES ('2','1','agua pura','litro agua pura','2013-05-16');");
										tx.executeSql("INSERT INTO productos(id,pasillos_id,nombre,descripcion,updated) VALUES ('3','2','pollo','libra de pollo','2013-05-16');");
										tx.executeSql("INSERT INTO productos(id,pasillos_id,nombre,descripcion,updated) VALUES ('4','2','carne molida','libra carne molida','2013-05-16');");
										tx.executeSql("INSERT INTO productos(id,pasillos_id,nombre,descripcion,updated) VALUES ('5','3','cerveza','6pack cervezas','2013-05-16');");*/
										
									}
							);
					}
				
					if (window.openDatabase){
							mynamespace.db = window.openDatabase('DB_latorre_v1', '', 'DBLaTorrev1', 20 * 1024 * 1024, onDBCreate);
					}else{
							log("This device does not have HTML5 Database support");
					}
					
			}());
		}catch(err){		
			log(err.message );		
		}
	
	function log(message){		/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }	}