const { json } = require("express");
let jobschema=require("./JobSchema")
let userSchema=require("./UserSchema")

const addJob=async(req,res)=>{
    let a=req.body.companyName;
    let b=req.body.position;
    let c=req.body.column;
    let d=req.body.salary;
    let e=req.body.jobtype;
    let f=req.body.location;
    let g=req.body.appliedOn;
    let h=req.body.deadline;

try {
    const newJob=new jobschema({
        companyName:a,
        position:b,
        column:c,
        salary:d,
        jobtype:e,
        location:f,
        appliedOn:g,
        deadline:h
    })
    await newJob.save()
    res.status(201).json({
        message:"Job added successfully"
    })
} catch (error) {
    res.json({
        message:"Error in adding job",
        Error:error
    })
}
}


//edit job
const updateJob=async(req,res)=>{
    try {
    let companyName=req.body.companyName;
    let position= req.body.position;
    let column= req.body.column;
    let salary= req.body.salary;
    let jobtype= req.body.jobtype;
    let location= req.body.location;
    let appliedOn =req.body.appliedOn;
    let deadline=req.body.deadline
    let updatedjob=await jobschema.findByIdAndUpdate(req.params.id,{companyName,position,
                   column,salary,jobtype,location,appliedOn,deadline},{new:true})
     res.json({
            message:"job updated successfully",
            data:updatedjob
        })           
    } catch (error) {
        res.json({
            message:"Error in updating",
            Error:error
        })
    }
}


const viewAll=async(req,res)=>{
          try {
            let datas=await jobschema.find()
            res.json({
                message:"Data got successfully",
                data:datas
            })
          } catch (error) {
            res.json({
                message:"Error in getting data",
                error:error
            })
          }
}

const viewDetails=async(req,res)=>{
    try {
        let data=await jobschema.findById(req.params.id)
        res.json({
            message:"Details fetched successfully",
            data:data
        })
    } catch (error) {
        res.json({
            message:"Error in fetching details",
            Error:error
        })
    }
}


const deleteJob=async(req,res)=>{
    try {
        let deletedJob=await jobschema.findByIdAndDelete(req.params.id)
        res.json({
            message:"Job deleted successfully",
            data:deletedJob
        })
    } catch (error) {
        res.json({
            message:"Error in deleting job",
            Error:error
        })
    }
}

const creteAccount=async(req,res)=>{
    try {
        let a=req.body.userName;
         let b=req.body.userEmail;
        let c=req.body.userPassword
       
        const newUser=new userSchema({
            userName:a,
            userEmail:b,
            userPassword:c
        })
        await newUser.save()
        res.status(201).json({
            message:"signup successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Error in signup",
            Error:error
        })
    }
}

const loginAccount=async(req,res)=>{
    let a=req.body.userEmail;
    let b=req.body.userPassword
    try {
        const user=await userSchema.findOne({
            userEmail:a
        })
        if(!user){
            res.status(401).json({
                message:"Invalid email"
            })
        }
        if(user.userPassword!==b){
            res.status(401).json({
                message:"Invalid password"
            })
        }
        res.json({
            message:"Login successfull",
            data:user
        })
    } catch (error) {
        res.json({
            message:"Error in login",
            Error:error
        })
    }
}

module.exports={addJob,updateJob,viewAll,viewDetails,deleteJob,creteAccount,loginAccount}