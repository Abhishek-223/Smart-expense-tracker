import React, { useEffect, useState, useContext } from "react";
import { fetchExpenses, deleteExpense, updateExpense } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadExpenses = async () => {
      if (user?.token) {
        const data = await fetchExpenses(user.token);
        setExpenses(data);
      }
    };
    loadExpenses();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id, user.token);
      setExpenses(expenses.filter((expense) => expense._id !== id)); 
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    const updatedExpense = await updateExpense(id, editData, user.token);
    setExpenses(expenses.map((expense) => (expense._id === id ? updatedExpense : expense)));
    setEditId(null); 
  };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700">Your Expenses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
              <tr className="bg-gray-100 text-left text-sm">
            <th className="border p-2">Title</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Date</th>
                <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
                  <tr key={expense._id} className="text-center text-sm">
                {editId === expense._id ? (
                  <>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="title"
                        value={editData.title || expense.title}
                        onChange={handleEditChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount || expense.amount}
                        onChange={handleEditChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="category"
                        value={editData.category || expense.category}
                        onChange={handleEditChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                        <td className="border p-2 flex flex-col md:flex-row justify-center gap-2">
                      <button
                        onClick={() => handleUpdate(expense._id)}
                            className="bg-green-500 text-white px-2 py-1 rounded w-full md:w-auto"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                            className="bg-gray-400 text-white px-2 py-1 rounded w-full md:w-auto"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                        <td className="border p-2 break-words max-w-[200px]">{expense.title}</td>
                        <td className="border p-2">Rs.{expense.amount}</td>
                    <td className="border p-2">{expense.category}</td>
                    <td className="border p-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                        <td className="border p-2 flex flex-col md:flex-row justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditId(expense._id);
                          setEditData(expense);
                        }}
                            className="bg-yellow-500 text-white px-2 py-1 rounded w-full md:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
