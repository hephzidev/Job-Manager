let mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    userName:String,
    userEmail:String,
    userPassword:String
})

module.exports=mongoose.model("user",userSchema)