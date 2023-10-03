import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/nodejs_project";

async function connect() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default connect;
