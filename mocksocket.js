const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8888;
const client = require("socket.io-client");
const fs = require("fs");
const path = require("path");

const notificationModalMessage = fs.readFileSync(
  path.join(process.cwd(), "./cypress/fixtures/notificationModal.json"),
  "UTF-8"
);

const fixtures = {
  modal: notificationModalMessage
};

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/sessionId", function(req, res) {
  res.send("{}").status(200);
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});

// server
io.on("connection", function(socket) {
  console.log("something connected");
  socket.on("cypress", function(fixtureId) {
    console.log("mockserver received request for data: ", fixtureId);
    io.emit("client", fixtures[fixtureId]);
  });
});

// // client
// const socket = client("ws://localhost:8080", {});
// socket.on("connect", () => {
//   console.log(socket.id, "connects to server");
//   socket.on("client", message => {
//     console.log("server responds", message);
//   });
//   socket.emit("server", "give me some data");
// });
