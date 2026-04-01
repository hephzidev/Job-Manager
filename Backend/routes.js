let express=require("express")
let routes=express.Router()
let controller=require("./controller")
const verifyToken= require("./middleware/auth")


routes.post("/signup",controller.createAccount)

routes.post("/signin",controller.loginAccount)

routes.post("/create",verifyToken,controller.createJob)

routes.put("/edit/:id",verifyToken,controller.updateJob)

routes.get("/viewall",verifyToken,controller.viewAll)

routes.get("/view/:id",verifyToken,controller.viewDetails)

routes.delete("/delete/:id",verifyToken,controller.deleteJob)

routes.post("/like",verifyToken,controller.likedJob)

routes.post("/refreshToken",controller.refreshToken)

module.exports=routes;