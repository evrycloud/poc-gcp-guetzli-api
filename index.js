const config = require('config');
const startServer = require('./src/start-server');

startServer(config.get('port'));
