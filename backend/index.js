const express = require("express");
const cors = require("cors");
const { requestLogger } = require("./middlewares/logger");
require("dotenv").config();

const app = express();
const port=process.env.PORT||3000
// Middleware
app.use(cors());
app.use(express.json());

app.use(requestLogger)

// Default route
app.get('/',(req,res)=>(
    res.send("hello world! from backend")
))

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})