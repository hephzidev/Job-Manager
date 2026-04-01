const jwt=require ("jsonwebtoken")

const verifyToken= (req,res, next)=>{
    const header= req.headers.authorization;

     console.log("HEADER:", header); 

    if(!header){
        return res.status(401).json({
            message:"No token provided "
        })
    }

    const token=header.split(" ")[1];
     console.log("TOKEN:", token); 

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
          console.log("DECODE:", decode);

        req.user=decode
        next()
    } catch (error) {
         console.log("JWT ERROR:", error.message); 
        return res.status(403).json({
            message:"Invalid or expired token"
        })
    }
}

module.exports = verifyToken;