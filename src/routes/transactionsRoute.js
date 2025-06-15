import express from "express";

import {
  createTransaction,
  deleteTransaction,
  getSummaryById,
  getTransactionsByUserId,
} from "../controllers/transactionscontroller.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryById);

export default router;
