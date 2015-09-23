// Declara variables globales
var connect,
    grunt;

// Carga paquete connect (servidor estático)
connect = require('connect');

// Define función para el servidor estático, recibe parametros opcionales 
// de host y puerto donde correra el servidor.

function staticServer(host, port) {
  var done,
      host,
      port,
      con;  

  done = this.async(); // Define que la tarea es asincrona
  host = host || 'localhost'; // Define el host, por defecto es localhost
  port = port || 8080; // Define el puerto, por defecto es 8080
  con = connect(); // Ejecuta función connect
  
  // Configura la ruta de archivos de carga para la url estática de scripts
  con.use(grunt.config.get('config').settings.static_uri + '/scripts', connect.static('static/scripts'));
  // Configura la ruta de archivos de carga para la url estática de estilos(css)
  con.use(grunt.config.get('config').settings.static_uri + '/styles', connect.static(grunt.config.get('config').deploy_routes().styles));
  // Configura la ruta de archivos de carga para la url estática de sprites
  con.use(grunt.config.get('config').settings.static_uri + '/sprites', connect.static(grunt.config.get('config').deploy_routes().sprites));
  // Configura la ruta de archivos de carga para la url estática que no sean 
  // ninguna de las rutas anteriores
  con.use(grunt.config.get('config').settings.static_uri, connect.static('static'));

  // Si el enviroment es dev(desarrollo) carga la url raiz "/" de la ruta 
  // de archivo de los templates
  if (grunt.config.get('config').getEnv() === 'dev') {

    con.use('/', connect.static(grunt.config.get('config').deploy_routes().base + '/templates'));
  }

  // Configura el servidor estatico con el puerto y host definido
  con.listen(port, host);
  // Muestra mensaje en la consola
  grunt.log.write('\nStarting static web server in "%s" on port %s.', host, port);  
}

module.exports = function(g) {  
  grunt = g;
  // Registra tarea connect que ejecuta la función staticServer
  grunt.registerTask('connect',  staticServer);
};

