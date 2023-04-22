const express = require('express');
// const cors = require('cors');

module.exports = class ServerConfig {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        this.routes = {
            languages: '/api/v2/languages'
        };
        this.routesSetUp();

        this.middlewaresConfig();
    }

    routesSetUp() {
        this.app.use(this.routes.languages, require('../routes/language.routes'));
    }

    middlewaresConfig() {
        // this.app.use(cors());
        // this.app.use(express.json());
    }
    
    turnOn() {
        this.app.listen(this.port, () => {
            // Iniciamos el servidor en el puerto especificado en la variable 'port'
            console.log(`Language service working in port: ${ process.env.PORT || 3001 }`);
        });
    }
}