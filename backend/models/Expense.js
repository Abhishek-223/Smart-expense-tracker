import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
    receiptUrl: { type: String }, // Optional: If using Cloudinary for receipts
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
