import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

//@DESC     register user
//@ROUTE    POST /api/agentify/auth/register
//@ACCESS   public
const userRegister = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(300).json({ message: "All fields are required" });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //if user exist
  if (userExist) {
    return res
      .status(400)
      .json({ message: `${userExist.email} is already exist` });
  }

  //hashPassword
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return res
    .status(200)
    .json({ message: `Account ${username} is successfully created!` });
});

//@DESC     login user
//@ROUTE    POST /api/agentify/auth/login
//@ACCESS   public
const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userExist) {
    return res
      .status(400)
      .json({ message: "The account is not yet registered" });
  }

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    return res
      .status(200)
      .json({ message: `Greetings ${userExist.username}!` });
  } else {
    return res.status(400).json({ message: "email or password is incorrect!" });
  }
});

export default { userRegister, userLogin };