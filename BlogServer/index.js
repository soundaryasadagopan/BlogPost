const express = require("express");
require("dotenv").config();
const cors =require("cors");
const connectDb = require("./Config/db");
const blogRouter = require("./Router/blogRouter");
const adminRouter = require("./Router/adminRouter");

const app = express();
const port = 4000;

app.use(express.json());

app.use(cors());
connectDb();
app.use("/api/admin",adminRouter)

app.use("/api/blog",blogRouter)



app.listen(port,()=>{
    console.log(`Server is listening to port http://localhost:${port}`)
})