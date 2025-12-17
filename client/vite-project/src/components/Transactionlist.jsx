
import React from "react";
import { Search, Receipt, Edit2, Trash2 } from "lucide-react";

function Transactionlist({
  expenses,
  onDelete,
  onEdit,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory
}) {

  const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Healthcare", "Others"];

  const getcategorycolor = (category) => {
    const colors = {
      Food: '#10B981',
      Transportation: '#3B82F6',
      Entertainment: "#8B5CF6",
      Shopping: '#EC4899',
      Bills: '#F59E0B',
      Healthcare: '#EF4444',
      Others: '#6B7280',
    };
    return colors[category] || colors.Others;
  };

  const filteredExpenses = (expenses || []).filter((expense) => {
    const matchesSearch =
      String(expense.description || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase()) ||
      (expense.notes && expense.notes.toLowerCase().includes((searchTerm || "").toLowerCase()));

    const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });



  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">

      {/* Header */}
      <div className="flex items-center  justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Transactions</h3>
          <p className="text-sm text-gray-500 mt-1">{filteredExpenses.length} Total</p>
        </div>
        <div className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-bold">
          {/*i will use logic  */}
          ${filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0).toFixed(2)}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3  mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-3 border-2 bg-gray-50 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select className="border-2 bg-gray-50 border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer focus:border-indigo-500" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>


      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {/* conditional rendering */}

        {filteredExpenses.length === 0 ? (
          <div className="text-center  text-gray-500 py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Try different filters</p>
          </div>
        )  : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-4 flex-1 min-w-0 p-4 bg-linear-to-r from-gray-100 to-white hover:from-white hover:to-gray-50 border-2 border-gray-100 transition-all group rounded-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getcategorycolor(expense.category) }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 truncate">
                  {expense.description}
                </h4>

                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="px-2.5 py-1 rounded-lg font-bold bg-indigo-100 text-indigo-700">
                    {expense.category}
                  </span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 font-medium">{expense.date}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 truncate">{expense.notes}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  ₹{expense.amount}
                </span>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-white bg-indigo-500 p-2.5 hover:bg-indigo-600 rounded-xl shadow-sm"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-white bg-red-500 p-2.5 hover:bg-red-600 rounded-xl shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}


      </div>

    </div>

  );
}

export default Transactionlist;

