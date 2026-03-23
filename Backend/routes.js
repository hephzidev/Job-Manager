let express=require("express")
let routes=express.Router()
let controller=require("./controller")

routes.post("/create",controller.createJob)

routes.put("/edit/:id",controller.updateJob)

routes.get("/viewall",controller.viewAll)

routes.get("/view/:id",controller.viewDetails)

routes.delete("/delete/:id",controller.deleteJob)

routes.post("/signup",controller.createAccount)

routes.post("/signin",controller.loginAccount)

module.exports=routes;