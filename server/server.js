const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = Esta es la comunicación del backend
let io = socketIO(server);

io.on('connection', (client) => {

    console.log("Usuario conectado");

    client.emit('enviarMensaje', {
        usuario: "Administrador",
        mensaje: "Bienvenido a esta app"
    });

    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });

    // Escuchar al cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);

        if (mensaje.usuario ) {
            callback({
                resp: "TODO SALIÓ BIEN"
            });
        } else {
            callback({
                resp: "TODO SALIÓ MALLL"
            });
        }

    });
});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});