import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/add", authMiddleware, addExpense);  
router.get("/", authMiddleware, getExpenses);    
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;