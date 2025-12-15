import react from "react";
import { Tooltip,PieChart,Pie,Cell,ResponsiveContainer } from "recharts";

function CategoryChart() {
  return(
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <h3>Category Distribution</h3>
       <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie 
            data={""} 
            dataKey="value" 
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={60}
            paddingAngle={3}
          >
            {/* {"".map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))} */}
            </Pie>
            <Tooltip formatter={(value)=> `$${value.toFixed(2)}`}/>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* will use map method */}
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded"></div>
            <span className="text-xs font-semibold text-gray-700">Item Name</span>
        </div>

      </div>
  </div>
  );
}
export default CategoryChart;