import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const LowStockBarGraph = () => {
  const [lowStockData, setLowStockData] = useState([]);

  useEffect(() => {
    fetchLowStockData();
  }, []);

  const fetchLowStockData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stock/low-stock');
      const lowStockProducts = response.data.lowStockProducts;

      // Prepare data for the bar graph
      const data = lowStockProducts.map((stock) => ({
        name: stock.productName,
        quantity: stock.stockQuantity,
      }));

      setLowStockData(data);
    } catch (error) {
      console.error('Error fetching low stock data:', error);
    }
  };

  return (
    <div>
      <h2>Low Stocks</h2>
      <BarChart width={1000} height={600} data={lowStockData}
      margin={{
        top: 40,
        right: 60,
        left:200,
        bottom: 6,
      }}
      
      
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#17a2b8"  barSize={60} />
      </BarChart>
    </div>
  );
};

export default LowStockBarGraph;
