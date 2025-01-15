import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRouter.js";
import ahenteRouter from "./routes/ahenteRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/catergoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/agentify/auth", authRouter);
app.use("/api/agentify/ahente", ahenteRouter);
app.use("/api/agentify/product", productRouter);
app.use("/api/agentify/category", categoryRouter);
app.use("/api/agentify/order", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port: ${process.env.PORT || 7000}`);
});
