const express = require("express");
const userController = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/authorization");

const userRoute = express.Router();
userRoute.post("/auth/login", userController.loginUser);
userRoute.post("/auth/register", userController.registerUser);
userRoute.post("/auth/logout", requireAuth, userController.logoutUser);
module.exports = userRoute;
