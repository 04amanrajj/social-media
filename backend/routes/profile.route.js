const express = require("express");
const profileController = require("../controllers/profile.controller");
const { requireAuth } = require("../middlewares/authorization");

const profileRoute = express.Router();
profileRoute.get("/", profileController.getEveryone);
profileRoute.get("/me", requireAuth, profileController.getMe);

module.exports = profileRoute;