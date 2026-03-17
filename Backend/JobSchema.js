let mongoose=require("mongoose")
const jobschema=mongoose.Schema({
    companyName:String,
    position:String,
    status:String,
    salary:String,
    jobtype:String,
    jobURL:String,
    location:String,
    appliedOn:Date,
    deadline:Date,
    description:String
})
module.exports=mongoose.model("track",jobschema)