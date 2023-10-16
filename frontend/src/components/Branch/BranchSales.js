import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./BranchSales.css"; 

const BranchSales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/allOrder/ordersByBranch").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="chart-container" id="BranchSales">
        <h2>Branch Sales</h2>
      <div className="chart">
        <BarChart
          width={1500}
          height={800}
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#283593" />
        </BarChart>
      </div>
    </div>
  );
};

export default BranchSales;