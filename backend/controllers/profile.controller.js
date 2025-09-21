const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getMe = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await db("users").where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const profile = await db("profiles").where({ user_id: userId }).first();
        const me = {
            email: user.email,
            joined_at: user.created_at ? new Date(user.created_at).toISOString().split("T")[0] : null,
            name: profile ? profile.name : null,
            phone_number: profile ? profile.phone_number : null,
            username: profile ? profile.username : null,
            bio: profile ? profile.bio : null,
            avatar_url: profile ? profile.avatar_url : null
        };
        console.log(me)
        res.status(200).json({ me });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: error.message });
    }
};

exports.getEveryone = async (req, res) => {
  try {
    const users = await db("users").select("email", "created_at");
    const profiles = await db("profiles").select(
      "username",
      "bio",
      "avatar_url"
    );
    const everyone = users.map((user, index) => {
      // Format date as YYYY-MM-DD
      const joined_at = user.created_at
        ? new Date(user.created_at).toISOString().split("T")[0]
        : null;
      const merged = {
        ...user,
        ...profiles[index],
        joined_at,
      };
      delete merged.created_at;
      return merged;
    });
    console.log(req.userId);
    res.status(200).json({ everyone });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};
