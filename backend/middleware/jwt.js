import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { loginValid } from "../api/userAPI.js";

env.config();
const secretKey = process.env.SECRET_KEY || "your_secret_key";

const app = express();

const authenticateJWT = (req, res, next) => {
  const token = loginValid(req, res);
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      console.log("passs");
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
export { authenticateJWT };
