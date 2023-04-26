const express= require("express")
const cors=require("cors");
const { db } = require("./db");
const { ContactRouter } = require("./Routes/UserContact");



const app= express();

app.use(cors())

app.use(express.json());

app.use("/contacts",ContactRouter)

app.listen(8080,db)