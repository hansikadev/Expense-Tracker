import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function AddExpense({ onClose, onSave, editingExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  // Prefill form if editingExpense exists
  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description || editingExpense.title || "");
      setAmount(editingExpense.amount || "");
      setDate(editingExpense.date || "");
      setCategory(editingExpense.category || "Bills");
      setNote(editingExpense.note || "");
    }
  }, [editingExpense]);

  const handleSave = () => {
    // Validation (optional) 
    if (!description || !amount || !date) {
      alert("Please fill in all required fields!");
      return;
    }

    // Prepare expense object
    const expenseData = {
      id: editingExpense ? editingExpense.id : Date.now(), // keep same id if editing
      description,
      amount: parseFloat(amount),
      date,
      category,
      note,
    };

    onSave(expenseData); // Pass data to parent
    onClose(); // Close modal
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Track your spending</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What did you buy?
          </label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-sm"
          />
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                $
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              "Food",
              "Transport",
              "Shopping",
              "Bills",
              "Entertainment",
              "Healthcare",
              "Other",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-shadow focus:outline-none " +
                  (category === cat
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:shadow-sm")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Note (Optional)
          </label>
          <textarea
            rows="3"
            placeholder="Add notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-sm resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            {editingExpense ? "Save Changes" : "Add Expense"}
          </button>

          <button
            onClick={onClose}
            className="w-28 border border-gray-300 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;


