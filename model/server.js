// servidor de express
const express = require("express");
const http = require("http");
// configuracion del socket server
const socketio = require("socket.io");
// cuando hay que moverce entredirectorios es mejor usar path
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Http server
    this.server = http.createServer(this.app);

    // configuracion del socket server
    this.io = socketio(this.server, {
      /**configuracion */
    });
  }
  middlewares() {
    // desplegar el directorio publico
    // this.app.use(express.static(__dirname + "/public"));
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //   inicializar this.middlewares
    this.middlewares();

    // inicializar sockets
    this.configurarSockets();

    //   inicializar server
    this.server.listen(this.port, () => {
      console.log(`server corriendo en puerto:`, this.port);
    });
  }
}
module.exports = Server;
