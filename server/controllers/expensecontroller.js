const Expense = require('./../models/expensemodel');

exports.getallexpenses = async (req, res) => {
    try {
        const expense = await Expense.find();
        res.json({ success: true, count: expense.length, data: expense });
    } catch (error) {
        console.error('Error in getallexpenses:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.createexpense = async (req, res) => {
    try {
        const { description, amount, category, date, notes } = req.body;
        const expense = new Expense({ description, amount, category, date, notes })
        const newexpense = await expense.save();
        res.status(201).json({ success: true, data: newexpense });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.updateexpense=async(req,res)=>{
    try{
        const updatedexpense=await Expense.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        console.log("updated function"+req.params.id)

        if(!updatedexpense){
            return res.status(404).json({success:false,message:"Expense not found"});
        }   
        res.json({success:true,data:updatedexpense});
    }   
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

exports.deleteexpense=async(req,res)=>{
    try{
        const deletedexpense=await Expense.findByIdAndDelete(req.params.id);        
        console.log("deleted function"+req.params.id)
        if(!deletedexpense){
            return res.status(404).json({success:false,message:"Expense not found"});
        }
        res.json({success:true,message:"Expense deleted successfully"});
    }   
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }   
}
