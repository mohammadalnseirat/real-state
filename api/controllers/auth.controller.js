import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";
import jwt from "jsonwebtoken";
// sign up request:
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

// sign in request:
export const signin_post = async (req, res, next) => {
  // get the data from the body:
  const { email, password } = req.body;
  try {
    // check the email:
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(handleError(404, "User not found! Please try to sign up."));
    }
    // compare the password:
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(handleError(401, "Wrong password! Please try again."));
    }
    // create token :
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    // save token
    res
      .cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
