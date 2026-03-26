let mongoose=require("mongoose")
const connectDB=()=>{
   try {
     mongoose.connect("mongodb://localhost:27017/track")
     console.log("Database connected successfully");
     
   } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
    process.exit(1); // stop server if DB fails
   }
}


module.exports=connectDB