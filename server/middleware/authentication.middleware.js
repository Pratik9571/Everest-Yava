import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isSeller = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(token, "4d6e38aa2492");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  const user = await User.findOne({ _id: payload.userId });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUserId = user._id;

  next();
};

// no role check

export const isUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    payload = jwt.verify(token, "4d6e38aa2492");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  const user = await User.findOne({ _id: payload.userId });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUserId = user._id;
  next();
};

export const isBuyer = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  let payload;
  try {
    payload = jwt.verify(token, "4d6e38aa2492");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  const user = await User.findOne({ _id: payload.userId });
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUserId = user._id;
  next();
};
