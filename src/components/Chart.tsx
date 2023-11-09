import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart() {
    const data = [
        { name: 'Category 1', A: 400, B: 300, C: 200 },
        { name: 'Category 2', A: 500, B: 200, C: 100 },
        { name: 'Category 3', A: 300, B: 400, C: 300 },
        { name: 'Category 4', A: 200, B: 300, C: 400 },
      ];
    
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="A" stackId="a" fill="#8884d8" />
            <Bar dataKey="B" stackId="a" fill="#82ca9d" />
            <Bar dataKey="C" stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>

  );
}
