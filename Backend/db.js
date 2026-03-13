let mongoose=require("mongoose")
const connectDB=()=>{
   try {
     mongoose.connect("mongodb://localhost:27017/track")
     console.log("Database connected successfully");
     
   } catch (error) {
    console.log("Error in connecting DataBase");
    
   }
}

module.exports=connectDB