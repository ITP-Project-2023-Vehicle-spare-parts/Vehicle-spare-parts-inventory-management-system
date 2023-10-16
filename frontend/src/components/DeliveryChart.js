import './DeliveryChart.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';// Import the external CSS file

const DeliveryChart = () => {
    const [chartData, setChartData] = useState([]);
  
const [fakeData, setFakeData] = useState([]);

useEffect(() => {
  // Load fake data from local storage or generate it
  const storedFakeData = JSON.parse(localStorage.getItem('fakeData'));

  if (storedFakeData) {
    setFakeData(storedFakeData);
  } else {
    const generatedFakeData = Array.from({ length: 6 }, (_, index) => {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - index - 1);
      const monthYear = pastDate.toLocaleDateString('en-US', { month: 'numeric', year: 'numeric' });
      return {
        monthYear,
        count: Math.floor(Math.random() * 10) + 1 // Generate random count for demo
      };
    });

    setFakeData(generatedFakeData);
    localStorage.setItem('fakeData', JSON.stringify(generatedFakeData));
  }
}, []); 

useEffect(() => {
  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/allOrder/ordersByMonth');
      const data = response.data;

      console.log('Fetched data from backend:', data);

      // Combine fake data for past months with the data from the backend
      const formattedData = [...fakeData, ...data].map(item => {
        if (item.count !== undefined && item.monthYear !== undefined) {
          return {
            monthYear: item.monthYear,
            count: item.count
          };
        } else {
          console.log('Invalid data structure:', item);
          return null;
        }
      });

      const validData = formattedData.filter(item => item !== null);

      console.log('Formatted data for chart:', validData);

      setChartData(validData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [fakeData]); // Trigger the effect when fakeData changes

  

  return (
    <div id='DeliveryChart' className="chart-container">
      <h2 className="chart-title">Orders by Month</h2>
      <div className="chart-wrapper">
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="rgba(75, 192, 192, 0.2)" />
        </BarChart>
      </div>
    </div>
  );
};

export default DeliveryChart;


