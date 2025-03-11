import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Correct middleware path

const router = express.Router();

router.post("/add", authMiddleware, addExpense);  // Protected: Only logged-in users can add expenses
router.get("/", authMiddleware, getExpenses);    // Protected: Only logged-in users can view expenses
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;