const express=require("express")
const connectDB=require("./db")
let routes=require("./routes")
let cors=require("cors")
const config = require("dotenv").config();


connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/',routes)




app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})