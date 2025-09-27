const express = require("express");
const postController = require("../controllers/post.controller");
const { requireAuth } = require("../middlewares/authorization");

const postRoute = express.Router();
postRoute.get("/", postController.getPosts);
postRoute.get("/:id", postController.getPosts);
postRoute.post("/", requireAuth, postController.createPost);
postRoute.delete("/:id", requireAuth, postController.deletePost);

module.exports = postRoute;
