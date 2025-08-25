import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { matchPassword } from "../utils/hashPassword.js";

// Register User
export const registerUser = async (req, res) => {
  // Destructure user data from request body
  let { name, email, username, password, pic } = req.body;
  if (pic === "") pic = undefined;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, username, password, pic });
    let cookieparams = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    const token = generateToken(user._id, user.name, user.username, user.email, user.pic);
    res
      .status(201)
      .cookie(
        "access_token",
        token,
        cookieparams
      )
      .json({
          success: "user logged in",
          token: token,
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            pic: user.pic,
          },
        });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (user && (await matchPassword(password, user.password))) {
      let cookieparams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      };
      const token = generateToken(
        user._id,
        user.name,
        user.username,
        user.email,
        user.pic
      );
      res
        .cookie(
          "access_token",
          token,
          cookieparams
        )
        .status(200)
        .json({
          success: "user logged in",
          token: token,
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            pic: user.pic,
          },
        });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
