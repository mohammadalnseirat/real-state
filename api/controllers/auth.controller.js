import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";
export const signup_post = async (req, res, next) => {
  const { username, email, password } = req.body;
  // hash password:
  const hashedPassword = bcryptjs.hashSync(password, 15);
  // create user:
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  // try and catch to save user:
  try {
    await newUser.save();
    // creste response:
    res.status(200).json("User created successfully!");
  } catch (error) {
    next(handleError(550, "error from the function"));
    next(error);
  }
};
