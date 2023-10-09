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

const StockComparisonBarGraph = () => {
  const [stockData, setStockData] = useState([]);

  // Define colors for quantity and reorder bars
  const quantityColor = "#fca311";
  const reorderColor = "#6f42c1";

  

  useEffect(() => {
    fetchStockData();
  },);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/stock/get");
      const stocks = response.data.stocks;

      // Prepare data for the bar chart
      const stockComparisonData = stocks.map((stock, index) => ({
        name: stock.productName,
        quantity: stock.stockQuantity,
        reorderLevel: stock.reorderpoint,
        
      }));

      setStockData(stockComparisonData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div>
      <h2>Stock Quantity vs Reorder Level</h2>
      <BarChart
        width={800}
        height={400}
        data={stockData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 'dataMax']} /> {/* Set custom domain */}
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" name="Quantity" barSize={100} fill={quantityColor} />
        <Bar dataKey="reorderLevel" name="Reorder Level" barSize={100} fill={reorderColor} />
      </BarChart>
    </div>
  );
};

export default StockComparisonBarGraph;
