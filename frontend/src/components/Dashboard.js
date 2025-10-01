import React, { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/api/employees/").then((res) => setEmployees(res.data));
  }, []);

  const positions = employees.reduce((acc, emp) => {
    acc[emp.position] = (acc[emp.position] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(positions).map(([position, count]) => ({
    name: position,
    value: count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="text-center">
      <h3 className="mb-4">Employee Dashboard</h3>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
