import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CategoryBarGraph = () => {
  const [categoryData, setCategoryData] = useState([]);
  
  // Define an array of colors
  const barColors = ['#005792'];

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stock/get');
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
      const categoryArray = Object.keys(groupedCategories).map((productName, index) => ({
        name: productName,
        quantity: groupedCategories[productName],
        // Use the colors from the array sequentially
        fill: barColors[index % barColors.length],
      }));

      setCategoryData(categoryArray);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  return (
    <div>
      <h2>Stock Levels</h2>
      <BarChart width={600} height={400} data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Use the fill prop to set the bar colors */}
        <Bar dataKey="quantity" />
      </BarChart>
    </div>
  );
};

export default CategoryBarGraph;
