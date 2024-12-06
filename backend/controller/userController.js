import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

//@desc      register user
//@route     POST /api/flowStock/register
//@access    private
const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  console.log(email, username, password);

  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(400).json({ message: "Account is already registered" });
  }

  const profileDir = path.join("profile", email);
  fs.mkdirSync(profileDir, {
    recursive: true,
  });

  const srcImg = path.resolve(__dirname, "../public/R.png");
  const srcImgResolvePath = path.join(profileDir, "R.png");
  fs.copyFileSync(srcImg, srcImgResolvePath);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email,
    username: username,
    password: hashPassword,
    profile: {
      filename: "R.png",
      destination: `${email}/R.png`,
    },
  });

  if (!newUser) {
    return res
      .status(400)
      .json({ message: "Somthing went wrong please try again later" });
  }

  await newUser.save();

  return res.status(200).json({ message: `Welcome ${newUser.username}` });
});

//@desc      login user
//@route     POST /api/flowStock/login
//@access    private
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Account does not exist" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      message: `Welcome ${user.username}`,
    });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
});

//@desc      logout user
//@route     POST /api/flowStock/logout
//@access    private
const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Logout successfully" });
});

//@desc     Get user Information
//@route    GET /api/flowStock/me/:_id
//@access   private
const user = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ message: "Missing Id " });
  }

  const user = await User.findById(_id).select("-password");

  if (!user) {
    return res.status(400).json({ message: "The user does not exist" });
  }

  res.status(200).send(user);
});

export default {
  register,
  login,
  logout,
  user,
};
