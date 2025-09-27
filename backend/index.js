const express = require("express");
const cors = require("cors");
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

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.use("/api/user", require("./routes/user.route.js"));
app.use("/api/profile", require("./routes/profile.route.js"));
app.use("/api/post", require("./routes/post.route.js"));

// Start server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
