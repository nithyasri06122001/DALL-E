import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import PostRoutes from "./routes/PostsRoutes.js";
import DalleRoutes from "./routes/DalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello,Welcome to DALL-E");
});

app.use("/api/v1/posts", PostRoutes);
app.use("/api/v1/dalle", DalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started running"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
