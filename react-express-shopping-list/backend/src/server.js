import itemsrouter from './routes/api/items';

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const keys = require('./config/keys');

const app = express();

// To read REST response body (alternative to body-parsers)
app.use(express.json());
app.use('/api/items', itemsrouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const appenv = process.env.NODE_ENV || 'production';

console.log(`Loading environment ${appenv}`);

dotenv.config({ path: path.join(__dirname, 'config', `.env.${appenv}`) });

const db = process.env.MONGO_URI;

function log(message) {
    process.stdout.write(`${message}\n`);
}

const port = process.env.port || keys.PORT;
const server = http.createServer(app);

function startServer() {
    server.listen(port);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            log(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    log(`Server is listening on port ${port}`);
    log(`Visit: http://localhost:${addr.port}`);
}

server.on('listening', onListening);
server.on('error', onError);

startServer();

// connect to db

log(`Connecting to .. ${db}`);

mongoose
    .connect(db)
    .then(() => {
        log(`Mongoose connected to ${db}`);
    })
    .catch(err => log(err));
