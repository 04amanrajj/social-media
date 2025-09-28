const express=require("express");
const chatController=require("../controllers/chat.controller");
const {requireAuth}=require("../middlewares/authorization")

const chatRoute=express.Router();
chatRoute.get("/",requireAuth,chatController.getChats);
chatRoute.post("/",requireAuth,chatController.sendMessage);

module.exports=chatRoute;