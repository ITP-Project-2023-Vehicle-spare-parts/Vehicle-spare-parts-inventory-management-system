import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);

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

      // Convert groupedCategories to an array of objects for PieChart
      const categoryArray = Object.keys(groupedCategories).map(productName => ({
        name: productName,
        value: groupedCategories[productName],
      }));

      setCategoryData(categoryArray);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <h2>Product Quantities</h2>
      <PieChart width={600} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={categoryData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Customize the labels */}
          {categoryData.map((entry, index) => (
            <text
              x={200 + Math.cos(-Math.PI / 2 + (2 * Math.PI * (entry.percent / 100))) * 90}
              y={200 + Math.sin(-Math.PI / 2 + (2 * Math.PI * (entry.percent / 100))) * 90}
              fill={COLORS[index % COLORS.length]}
              textAnchor={Math.cos(-Math.PI / 2 + (2 * Math.PI * (entry.percent / 100))) >= 0 ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {entry.name}
            </text>
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;
