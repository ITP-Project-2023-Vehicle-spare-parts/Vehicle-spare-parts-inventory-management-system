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

const CategoryBarGraph = () => {
  const [categoryData, setCategoryData] = useState([]);

  // Define an array of colors
  const barColors = ["#6f42c1"];

  useEffect(() => {
    fetchCategoryData();
  },);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/stock/get");
      const stocks = response.data.stocks;

      // Group stocks by category and calculate total quantity for each category
      const groupedCategories = stocks.reduce((result, stock) => {
        if (!result[stock.productName]) {
          result[stock.productName] = 0;
        }
        result[stock.productName] += stock.stockQuantity;
        return result;
      }, {});

      // Convert groupedCategories to an array of objects for BarChart
      const categoryArray = Object.keys(groupedCategories).map(
        (productName, index) => ({
          name: productName,
          quantity: groupedCategories[productName],
          // Use the colors from the array sequentially
          fill: barColors[index % barColors.length],
        })
      );

      // Sort categoryArray by quantity in descending order
      categoryArray.sort((a, b) => b.quantity - a.quantity);

      setCategoryData(categoryArray);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

 

  return (
    <div>
      <h2>All Stocks</h2>
     
      <BarChart
        width={400}
        height={150}
        data={categoryData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
       
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Use the fill prop to set the bar colors */}
        <Bar dataKey="quantity" barSize={60} barCategoryGap="90%" barGap="90%" />
      </BarChart>
      </div>
    
  );
};

export default CategoryBarGraph;
