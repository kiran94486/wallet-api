import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js"; // Importing the cron job
import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//   res.send("its working");
// });

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/transactions", transactionsRoute);

console.log("my port:", process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running in PORT:", PORT);
  });
});
