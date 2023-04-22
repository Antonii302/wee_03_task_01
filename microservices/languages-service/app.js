const ServerConfig = require('./models/serverConfig.model'); // Importamos el servidor desde el archivo 'app.js'
const server = new ServerConfig();
server.turnOn();