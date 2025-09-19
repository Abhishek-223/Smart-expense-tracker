import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectDB from "./config/db.js"; 

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_ORIGIN, 
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/uploads", uploadRoutes);


connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));