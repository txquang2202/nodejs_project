import User from "../models/user.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      img: "Example",
    });
    await newUser.save();
    res.render("home");
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    res.status(500).send("Đã xảy ra lỗi.");
  }
};
const loginValid = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Tên người dùng không tồn tại." });
    }
    if (user.password != req.body.password) {
      return res.status(401).json({ message: "Mật khẩu không đúng." });
    }
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user.toJSON(), secretKey, { expiresIn: 604800 });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

export { createUser, loginValid };
