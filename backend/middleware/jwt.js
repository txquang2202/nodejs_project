import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const secretKey = process.env.SECRET_KEY || "your_secret_key";

const app = express();

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers.authorization);
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
export { authenticateJWT };
