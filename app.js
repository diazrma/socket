const express = require("express");
const app = express();
const port = 3000;
const nunjucks = require("nunjucks");
const http = require("http").Server(app);
const io = require("socket.io")(http);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (req, res) {
  res.render("index.njk", { title: "Socket io do jeito simples" });
});

//Envia uma mensagem pro servidor usando io.emit
io.on("connection", function (socket) {
  io.emit("message", "Mensagem enviada do servidor um usuário conectou");
  socket.on("disconnect", function () {
    io.emit("message", "Mensagem enviada do servidor um usuário desconectou");
  });
});

http.listen(port, function () {
  console.log(`Rodando em http://localhost:${port}`);
});
