import react from 'react'
import { Cat, Plus,Wallet ,ShoppingCart,TrendingUp,DollarSign} from 'lucide-react';
import StatCard from './components/StatCard.jsx';
import SpendingChart from './components/Spendingchart.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import Transactionlist from './components/Transactionlist.jsx';
import Model from './components/Model.jsx';
import { useState, useEffect } from 'react';


import { fetchExpenses, createExpenses, updateExpenses, deleteExpenses } from './api.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModeOpen,setIsModelOpen]=useState(false);
  const [editingExpense,setEditingExpense]=useState(null);
  const [searchTerm,setSearchTerm]=useState('');
  const [filterCategory,setFilterCategory]=useState('All');

  //stats calculations
  const calculationsStats = (expenseList) => {
    const list = expenseList || [];
    const total = list.reduce((sum, e) => sum + Number(e.amount || 0), 0)

    const categoryTotal = list.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    },{})

    return {
      total,
      count: list.length,
      avg: list.length > 0 ? total / list.length : 0,
      highest: list.length > 0 ? Math.max(...list.map((e) => Number(e.amount) || 0)) : 0,
      categoryTotal
    }
  }
  const stats = calculationsStats(expenses);

  //load initial data
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try{
        const [expData]=await Promise.all([fetchExpenses()]);
        const normalized=(expData || []).map((e)=>({
          ...e, date:e?.date ? String(e.date).split("T")[0] : new Date().toISOString().split("T")[0],
        }));
        setExpenses(normalized);  
      }
      catch(error){
        console.error("Error loading expenses:",error);
      }
      finally{
        setLoading(false);
      }
    }
    load();
  }, []);

  //add edit and delete functions
  const handleAddExpense=async(payload)=>{
    try{
      const created=await createExpenses(payload);
      if(!created) throw new error("Failed to create expense");
      setExpenses((prev)=>[
        {...created, date :created.date("T")[0]},
        ...prev,
      ]);
      setIsModelOpen(false);
    }
    catch(error){
      console.error("Error adding expense:",error);
    } 
  }

  const onEdit=(expense)=>{
    setEditingExpense(expense);
    setIsModelOpen(true);
  }


  const handlleSaveEdit=async(payload)=>{
    if(!editingExpense) return;
    try{
      const updated=await updateExpenses(editingExpense._id,payload);
      if(!updated) throw new error("Failed to update expense");
      setExpenses((prev)=>prev.map((e)=>e.id===updated._id ? {...updated, date:updated.date.split("T")[0]} : e));
      setEditingExpense(null);
      setIsModelOpen(false);
    } 
    catch(error){
      console.error("Error updating expense:",error);
    }
  }

  const handleDelete=async(id)=>{
    if(!window.confirm("Delete this expense")) return;

    try{
      await deleteExpenses(id);
      // const deleted=await deleteExpenses(id);
      // if(!deleted) throw new error("Failed to delete expense");
      // setExpenses((prev)=>prev.filter((e)=>e._id !== id));
    }
    catch(error){
      console.error("Error deleting expense:",error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-10">
      <div className='bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 py-6 lg:py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-700 lg:text-4xl mb-1'>Expense Tracker</h1>
            <p className='text-gray-700'>Manage your finance with ease</p>
          </div>
          <div className='flex items-center gap-3'>
            <button className=' text-white gap-2 px-4 py-2 rounded-xl bg-gray-600 transition-all font-semibold hover:shadow-2xl flex items-center'>
              <Plus className='w-4 h-4' /> Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard value={`$${stats.total.toFixed(2)}`} title="Total spent" icon={Wallet} subtitle="This month" bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600" iconColor="bg-indigo-700" />
          <StatCard value={stats.count} title="Expenses" icon={ShoppingCart} subtitle={`${stats.count} transactions`} bgColor="bg-gradient-to-br from-purple-500 to-purple-600" iconColor="bg-purple-700" />
          <StatCard value={`$${stats.total.toFixed(2)}`} title="Average" icon={TrendingUp} subtitle="Per expense" bgColor="bg-gradient-to-br from-pink-500 to-pink-600" iconColor="bg-pink-700" />
          <StatCard value={`$${stats.total.toFixed(2)}`} title="Highest" icon={DollarSign} subtitle="Single expense" bgColor="bg-gradient-to-br from-orange-500 to-orange-600" iconColor="bg-orange-700" />
        </div>

        {/* charts */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8'>
          <div className='lg:col-span-3'>
            <SpendingChart />
          </div>

          <div className='lg:col-span-2'>
            <CategoryChart />
          </div>
        </div>
        {/* transaction list */}
        <Transactionlist />
      </div>

      {/* model */}
      {/* <Model/> */}
    </div>
  )
}

export default App;