// servidor de express
const express = require("express");
const app = express();
// servidor de sockets
const server = require("http").createServer(app);
// configuracion del socket server
const io = require("socket.io")(server);

// desplegar el directorio publico
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  //   console.log(socket.id);
  //   socket.emit("mensaje-bienvenida", "Bienvenido al server");
  //   socket.emit("mensaje-bienvenida", {
  //     msg: "Bienvenido al server",
  //     fecha: new Date(),
  //   });

  socket.on("mensaje-to-server", (data) => {
    console.log(data);
    io.emit("mensaje-from-server", data);
  });
});
server.listen(8080, () => {
  console.log(`server corriendo en puerto:8080`);
});
