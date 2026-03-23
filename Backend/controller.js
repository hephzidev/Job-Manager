const { json } = require("express");
let jobschema=require("./JobSchema")
let userSchema=require("./UserSchema")
const bcrypt=require("bcrypt")


const createAccount=async(req,res)=>{
     const { userName, userEmail, userPassword} = req.body;
    try {
       if (!userName || !userEmail || !userPassword) {
      return res.status(400) .json({ message: "All fields are required" });
    }
    const hashedPassword=await bcrypt.hash(userPassword,10)
       
    const existingUser = await userSchema.findOne({ userEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
        const newUser=new userSchema({
            userName,
            userEmail,
            userPassword:hashedPassword,
        })
        await newUser.save()
        return res.status(201).json({
            message:"Signup successful! You can now login",
              data: {
        id: newUser._id,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
      }
        })
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            Error: error.message,
            Error:error,  
        })
    }
}

const loginAccount=async(req,res)=>{
    const{userEmail,userPassword}=req.body
    try {
        if (!userEmail || !userPassword) {
        return res.status(400).json({
        message: "Email and password are required"
      });
      }
        const user=await userSchema.findOne({
            userEmail
        })
        if(!user){
            return res.status(401).json({
                message:"Invalid email"
            })
        }
        const isMatch=await bcrypt.compare(userPassword, user.userPassword)
        if( !isMatch ){
            return res.status(401).json({
                message:"Invalid password"
            }) 
        }
        return res.status(200).json({
            message:"Login successfull",
            userId: user._id, 
            data:user
        })
        
    } catch (error) {
        if(error.response){
             setPopup({
      message: error.response.data.message,
      type: "error"
    })
        }
        else{
            setPopup({
      message: "Login Failed",
      type: "error"
    })
        }
    }
}


const createJob=async(req,res)=>{
    const{companyName,position,status,salary,jobtype,jobURL,location,appliedOn,deadline,description,userId}= req.body
try {
    const newJob=new jobschema({
        companyName,
        position,
        status,
        salary,
        jobtype,
        jobURL,
        location,
        appliedOn,
        deadline,
        description,
        userId
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
        const{companyName,position,status,salary,jobtype,jobURL,location,appliedOn,deadline,description}=req.body
    let updatedjob=await jobschema.findByIdAndUpdate(req.params.id,{companyName,position,status,
                   salary,jobtype,jobURL,location,appliedOn,deadline,description},{new:true})
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
            const userId=req.query.userId
            let jobs=await jobschema.find({userId})
            res.json({
                message:"Data got successfully",
                data:jobs
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
        let job=await jobschema.findById(req.params.id)
        res.json({
            message:"Details fetched successfully",
            data:job
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



module.exports={createJob,updateJob,viewAll,viewDetails,deleteJob,createAccount,loginAccount}