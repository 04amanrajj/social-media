const express=require("express")
const postController=require("../controllers/post.controller")
const {requireAuth}=require("../middlewares/authorization")

const postRoute=express.Router()
postRoute.get("/",postController.getAllPosts)
postRoute.post("/",requireAuth,postController.createPost)
postRoute.put("/:id",requireAuth,postController.updatePost)
postRoute.delete("/:id",requireAuth,postController.deletePost)

module.exports=postRoute