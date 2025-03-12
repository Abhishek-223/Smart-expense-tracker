import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectDB from "./config/db.js"; // Import the connectDB function

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://smart-expense-tracker-delta.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/uploads", uploadRoutes);

// Connect to MongoDB
connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));