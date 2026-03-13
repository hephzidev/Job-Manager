let mongoose=require("mongoose")
const jobschema=mongoose.Schema({
    companyName:String,
    position:String,
    column:String,
    salary:String,
    jobtype:String,
    location:String,
    appliedOn:Date,
    deadline:Date
})
module.exports=mongoose.model("track",jobschema)