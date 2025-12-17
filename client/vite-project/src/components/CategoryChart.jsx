import react from "react";
import { Tooltip,PieChart,Pie,Cell,ResponsiveContainer } from "recharts";

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

function CategoryChart({categoryTotal}) {

  const data=Object.entries(categoryTotal || {}).map(([name,value],index)=>({
    name,
    value,
    color:COLORS[index % COLORS.length],
  }));

  return(
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <h3 className="text-lg font-bold text-gray-900 mb-6">Category Distribution</h3>
       <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={60}
            paddingAngle={3} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
            <Tooltip formatter={(value)=> `$${value.toFixed(2)}`}/>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* will use map method */}
        {data.map((entry,index)=>(
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded " style={{backgroundColor:entry.color}}></div> 
            <span className="text-xs font-semibold text-gray-700">{entry.name}</span>
          </div>
        ))}

      </div>
  </div>
  );
}
export default CategoryChart;
