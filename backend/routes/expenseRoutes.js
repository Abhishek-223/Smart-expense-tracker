import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";
import protect from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post("/add", protect, addExpense);  // Protected: Only logged-in users can add expenses
router.get("/", protect, getExpenses);    // Protected: Only logged-in users can view expenses

export default router;
