import env from "dotenv";
import express from "express";

const app = express();

env.config();
const port = process.env.PORT;

app.use(express.static("static"));

app.get("/api/v1/trueLove", (req, res) => {
  res.send("duy yeu ý");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
