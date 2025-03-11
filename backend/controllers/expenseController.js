import Expense from '../models/Expense.js';

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new expense
export const addExpense = async (req, res) => {
  const { title, amount, category, date, note, receiptUrl } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
      note,
      receiptUrl,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an expense
export const updateExpense = async (req, res) => {
  const { title, amount, category, date, note, receiptUrl } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, date, note, receiptUrl },
      { new: true }
    );

    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};