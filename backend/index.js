import ejs from "ejs";
import express from "express";
import env from "dotenv";
import connect from "./config/db.js";
import { createUser, loginValid } from "./api/userAPI.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { authenticateJWT } from "./middleware/jwt.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
//environment
env.config();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/assets", express.static("../frontend/assets"));
//connect to database
connect();
//view engine
app.set("view engine", "ejs");
app.set("views", "../frontend/views");

//api routes
app.get("/", (req, res) => {
  res.render("loginScreen");
});
app.get("/home", authenticateJWT, (req, res) => {
  res.render("home");
});
app.post("/create-user", authenticateJWT, createUser);
app.post("/login", loginValid);

//Connect to server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
