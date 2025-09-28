const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const {initSocket}=require("./config/socket.js");
const { requestLogger } = require("./middlewares/logger");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Default route
app.get("/", (req, res) => res.send("hello world! from backend"));
app.get("/health", (req, res) => res.status(200).send("OK"));
app.use("/api/user", require("./routes/user.route.js"));
app.use("/api/profile", require("./routes/profile.route.js"));
app.use("/api/post", require("./routes/post.route.js"));
app.use("/api/chats", require("./routes/chat.route.js"));

// Socket.IO setup
const server = http.createServer(app);

initSocket(server);

// Start server
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
