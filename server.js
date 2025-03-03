const { createServer } = require("http");
const { Server } = require("ws");

const PORT = process.env.PORT || 5000;
const server = createServer();
const wss = new Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        console.log("Received:", message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
