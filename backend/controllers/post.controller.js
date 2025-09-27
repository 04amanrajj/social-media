const db = require("../config/db");

exports.getPosts = async (req, res) => {
  try {
    const postId = req.params.id;

    if (postId) {
      const post = await db("posts").where({ id: postId }).first();
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json({ post });
    }

    const posts = await db("posts").select("*");
    res.status(200).json({ posts });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const name = req.username || "Anonymous";
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const newPost = {
      user_id: userId,
      name,
      content: { title, content },
      created_at: new Date(),
    };
    const [postId] = await db("posts").insert(newPost).returning("id");
    res
      .status(201)
      .json({ message: "Post created successfully", postId: postId.id });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const post = await db("posts").where({ id }).first();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await db("posts").where({ id }).del();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};
