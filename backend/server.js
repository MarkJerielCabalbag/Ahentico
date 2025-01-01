import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import "dotenv/config";
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/agentify/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port: ${process.env.PORT || 7000}`);
});
