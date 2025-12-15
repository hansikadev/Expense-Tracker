import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


function SpendingChart() {
    return (
    <div className='bg-white p-6 rounded-lg shadow-lg border-gray-100'>
        <div className='flex items-center justify-between mb-6'>
            <div>
                <h3 className='text-xl font-bold text-gray-900 '>Weekly Spending</h3>
                <p className='text-sm text-gray-500 mt-1'>Last 7 days trend</p>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
            <LineChart >
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366F1"/>
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                />
                <XAxis
                    dataKey="date"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                />
                <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                />
                <Tooltip formatter={(value) => [`$${value}`,"spent"]} />
                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="url(#lineGradient)"
                    strokeWidth={4}
                    dot={{ r: 5, strokeWidth: 3, fill: '#6366F1', stroke: '#fff' }}
                    activeDot={{ r: 7 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
}
export default SpendingChart;

