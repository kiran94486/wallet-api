import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();

const app = express();

app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//   res.send("its working");
// });

app.use("/api/transactions", transactionsRoute);

console.log("my port:", process.env.PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running in PORT:", PORT);
  });
});
