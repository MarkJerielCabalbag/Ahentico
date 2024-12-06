import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use(express.static("profile"));

app.use("/api/flowStock", userRoutes); //Auth user

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});
