const io = require("socket.io-client");
const socket = io("http://localhost:8888");

socket.on("connect", () => {
  console.log("socket id", socket.id, "connects to mocksocket");
});

Cypress.Commands.add("getData", fixtureId => {
  console.log(`cypress requested data: "${fixtureId}"`);

  console.log("emitting");
  socket.emit("cypress", fixtureId, res => {
    console.log("emitted", res);
  });

  socket.on("event", function(data) {
    console.log("cypress event", data);
  });
  socket.on("disconnect", function() {
    console.log("cypress disconnect");
  });

  // var xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState !== 4) return;
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     console.log('success', JSON.parse(xhr.responseText));
  //   } else {
  //     console.log('error', xhr);
  //   }
  // };
  // xhr.open('GET', '/sessionId');
  // xhr.send();
});
