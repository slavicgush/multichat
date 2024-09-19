import { WebSocketServer } from "ws";
import { storeMsgs,get30Msgs } from "./model.js";
export default function init(app) {
  const wss = new WebSocketServer({ port: 8181 });
  const connections = {};
  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const dataString = Buffer.isBuffer(message) ? message.toString('utf-8') : message;
      const data = JSON.parse(dataString);
      let msg;
      switch (data.type) {
        case "join":
          connections[data.name] = ws;
          msg = JSON.stringify({
            type: "join",
            names: Object.keys(connections),
          });
          const last5 = await get30Msgs();
          last5.forEach((last) => {
            const lastmsgs = JSON.stringify({ type: last.type, name: last.name, msg: last.msg });
          ws.send(lastmsgs);
          }); 
          break;
        case "msg":
          msg = JSON.stringify({ type: "msg", name: data.name, msg: data.msg });
          break;
      }

         // Broadcast the message to all connected clients
      Object.values(connections).forEach(async (connection) => {
        connection.send && connection.send(msg);
      });

       // Store the message in the database
      if(data.type === 'join') {  return; }
      else{
        const type = data.type, name = data.name,msg = data.msg;
        await storeMsgs({ type: type, name: name,msg:msg });

      }
    });

  });

  return function logout(user) {
    if (connections[user]) {
      connections[user].close();
      delete connections[user];
    }

    // Notify all remaining clients about the user logout
    const msg = JSON.stringify({
    type: 'join',
    names: Object.keys(connections),
    });
    Object.values(connections).forEach((connection) => {
    connection.send && connection.send(msg);
    });
    };
}
