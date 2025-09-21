const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res
        .status(400)
        .json({ message: "Email or Username and Password are required" });
    }
    // Check if user exists by email or username
    let user;
    if (email) {
      // Login by email (users table)
      user = await db("users").where({ email }).first();
    } else if (username) {
      // Login by username (join users and profiles)
      user = await db("users")
        .join("profiles", "users.id", "profiles.user_id")
        .where("profiles.username", username)
        .select("users.*")
        .first();
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN) || "24h" }
    );

    delete user.password; // Remove password from user object
    res.status(200).json({ message: "login success", token, user });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, phone, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const existingUser = await db("users").where({ email }).first();
    const existingUsername = await db("profiles").where({ username }).first();
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (username.length < 7)
      return res
        .status(400)
        .json({ message: "Username must be at least 6 characters long" });

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create user
    const newUser = {
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const [userId] = await db("users").insert(newUser).returning("id");
    console.log({ userId });
    await db("profiles").insert({
      user_id: userId.id,
      username,
      name,
      phone_number: phone || null,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", userID: userId.id });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db("users")
      .join("profiles", "users.id", "profiles.user_id")
      .where("users.id", id)
      .select(
        "users.id",
        "users.email",
        "profiles.username",
        "profiles.bio",
        "profiles.avatar_url",
        "profiles.phone_number"
      )
      .first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};
