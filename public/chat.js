document.addEventListener("DOMContentLoaded", () => {
  const socket = new WebSocket("ws://localhost:8181/", "chat");
  let name = '';
   socket.onopen = () => {
    name = document.querySelector("#name").value;
     socket.send(JSON.stringify({ type: "join", name }));
   };
  document.querySelector("#sendBtn").addEventListener("click", (clickEvent) => {
    clickEvent.preventDefault();
    const msg = document.querySelector("#msg").value;
    socket.send(`{"type": "msg", "name":
"${name}", "msg": "${msg}"}`);
    document.querySelector("#msg").value = "";
  });
  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case "msg":
        const msgEl = document.createElement("div");
        if (data.name === name) {
          msgEl.classList.add("self");
        } else {
          msgEl.classList.add("other");
        }
        //Apply styles to the message element
        //msgEl.style.maxWidth = "fit-content";
        // msgEl.style.marginBottom = "5px";
        // msgEl.style.padding = "2px";
        // msgEl.style.borderRadius = "10px";

        // Apply background color based on the sender
        // msgEl.style.backgroundColor = data.name === name ? "#4caf50" : "#eee";
        // msgEl.style.color = data.name === name ? "#fff" : "#333";

        // Create a span element for the message content
        const contentSpan = document.createElement("span");
        contentSpan.innerText = data.name === name ? data.msg : `${data.name.toUpperCase()}: ${data.msg}`;

          //contentSpan.style.maxWidth = 60 + "%";
          contentSpan.style.marginBottom = "10px";
          contentSpan.style.padding = "8px";
          contentSpan.style.borderRadius = "10px";
          contentSpan.style.backgroundColor = data.name === name ? "#4caf50" : "#eee";
          contentSpan.style.color = data.name === name ? "#fff" : "#333";

        msgEl.appendChild(contentSpan);

        // Create a span element for the timestamp
        const timestampSpan = document.createElement("span");
        timestampSpan.classList.add("timestamp");
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timestampSpan.innerText = timestamp;
        timestampSpan.innerText += `  ✓✓`;

      
        // Append the ticks to the message element
        msgEl.appendChild(timestampSpan);

        document.querySelector("#msgs").appendChild(msgEl);
        break;
      case "join":
        document.querySelector("#users").innerHTML = "";
        data.names.forEach((name) => {
          const userEl = document.createElement("div");
          //userEl.classList.add("message");
          userEl.innerText = name;
          document.querySelector("#users").appendChild(userEl);
        });
        break;
    }
  };
});
