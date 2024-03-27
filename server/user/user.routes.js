import express from "express";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// To register the users
router.post(
  "/user/register",
  async (req, res, next) => {
    const newUser = req.body;
    try {
      const validatedData = await registerUserValidationSchema.validate(
        newUser
      );
      req.body = validatedData;

      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const newUser = req.body;
    const user = await User.findOne({ email: newUser.email });

    if (user) {
      return res.status(409).send({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    await User.create(newUser);

    //   send the success response
    return res.status(201).send({ message: "User registered sucessfully." });
  }
);

// to login the user
router.post(
  "/user/login",
  async (req, res, next) => {
    const loginCredentials = req.body;
    try {
      const validatedData = await loginUserValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const loginCredentials = req.body;
    const user = await User.findOne({ email: loginCredentials.email });

    if (!user) {
      return res.status(404).send({ message: "Invalid Login credentials." });
    }
    //   check for password Match
    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Login credentials." });
    }

    //   generate token
    let payload = { userId: user._id };
    const token = jwt.sign(payload, "4d6e38aa2492");

    return res
      .status(200)
      .send({ message: "User Logged in.", token: token, user: user });
  }
);

// exporting default router
export default router;
