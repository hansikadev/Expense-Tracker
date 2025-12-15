// import react from "react"
// import { Search , Receipt , Edit2, Trash2 } from "lucide-react";

// function Transactionlist() {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//         <div className="flex items-center justify-between mb-6">
//             <div>
//                 <h3 className="text-xl font-bold text-gray-900">Transactions</h3>
//                 <p className="text-sm text-gray-500 mt-1">Total</p>
//             </div>
//             <div className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-bold">
//                 {/* i will use logic */}
//             </div>
//         </div>

//         <div className="flex gap-3 mb-5">
//             <div className="flex-1 relative">
//                 <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400"/>
//                 <input type="text" placeholder="Search" className="w-full  pl-10 pr-4 border-2 bg-gray-50 border-gray-200 rounded-xl py-3 text-sm focus:outline-none focus:border-indigo-500"/>
//             </div>
//             <select className="border-2 bg-gray-50 border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer focus:border-indigo-500">
//                 <option>All Categories</option>
//                 <option>Food</option>
//                 <option>Transport</option>
//                 <option>Shopping</option>
//                 <option>Bills</option>
//             </select>
//         </div>

//         <div className="space-y-3 max-h-120 overflow-y-auto pr-2">
//             {/* conditional rendering */}
//             <div className="text-center text-gray-500 py-16">
//                 <div className=" w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Receipt className="w-10 h-10 text-gray-400 "/>
//                 </div>
//                 <p className="text-gray-600 font-semibold">No transactions found</p>
//                 <p className="text-sm text-gray-400 mt-1">Try different filters</p>
//             </div>

//             {/* else map method */}
//             <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 border-2 border-gray-100 rounded-xl transition-all group">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
//                     <div className="w-2.5 h-2.5 rounded-full"></div>   
//                 </div>
//                 <div className="flex items-start justify-between gap-3 mb-1">
//                     <h4 className="font-bold text-gray-900 truncate">expense decription</h4>
//                     <span className="text-xl font-bold text-gray-900 white-space-nowrap">expence amount</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs">
//                     <span className="px-2.5 py-1 rounded-lg font-bold">expense category</span>
//                     <span className="text-gray-400">.</span>
//                     <span className="text-gray-500 font-medium">date</span>

//                     {/* conditional rendering */}
//                     <>
//                         <span className="text-gray-400"></span>
//                         <span className="text-gray-500">expense note</span>
//                     </>
//                 </div>
//             </div>
//             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transitional-all">
//                 <button className="text-white bg-indigo-500 p-2.5 hover:bg-indigo-600 rounded-xl transition-all shadow-sm">
//                     <Edit2 className="w-4 h-4 " strokewidth={2.5}/>
//                 </button>
//                 <button className="text-white bg-red-500 p-2.5 hover:bg-red-600 rounded-xl transition-all shadow-sm">
//                     <Trash2 className="w-4 h-4 " strokewidth={2.5}/>
//                 </button>
//             </div>
//         </div>
//     </div>
//   )
// }
// export default Transactionlist



import React from "react";
import { Search, Receipt, Edit2, Trash2 } from "lucide-react";

function Transactionlist() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Transactions</h3>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
        <div className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-bold">
          {/* total amount later */}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-3 border-2 bg-gray-50 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select className="border-2 bg-gray-50 border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer focus:border-indigo-500">
          <option>All Categories</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="space-y-4 max-h-120 overflow-y-auto pr-2">

        {/* Empty State */}
        <div className="text-center text-gray-500 py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 font-semibold">No transactions found</p>
          <p className="text-sm text-gray-400 mt-1">Try different filters</p>
        </div>

        {/* Transaction Card */}
        <div className="flex items-center justify-between gap-4 p-4
                        bg-linear-to-r from-gray-50 to-white
                        hover:from-white hover:to-gray-50
                        border-2 border-gray-100 rounded-xl
                        transition-all group">

          {/* Left Side */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
            </div>

            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 truncate">
                Expense description
              </h4>

              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="px-2.5 py-1 rounded-lg font-bold bg-indigo-100 text-indigo-700">
                  Expense category
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 font-medium">Date</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 truncate">
                  Expense note
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
              ₹1200
            </span>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button className="text-white bg-indigo-500 p-2.5 hover:bg-indigo-600 rounded-xl shadow-sm">
                <Edit2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button className="text-white bg-red-500 p-2.5 hover:bg-red-600 rounded-xl shadow-sm">
                <Trash2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Transactionlist;

