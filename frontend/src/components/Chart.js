import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "../CSS/ChartGraph.css"

const ChartGraph = () => {
  const [stockData, setStockData] = useState([]);
  const [chartType, setChartType] = useState(); // Default to bar chart

  const quantityColor = "#fca311";
  const reorderColor = "#6f42c1";

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/stock/get");
      const stocks = response.data.stocks;

      const stockComparisonData = stocks.map((stock) => ({
        name: stock.productName,
        quantity: stock.stockQuantity,
        reorderLevel: stock.reorderpoint,
        quantityFill: quantityColor,
        reorderFill: reorderColor,
      }));

      setStockData(stockComparisonData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const toggleChartType = () => {
    // Toggle between "bar" and "line" chart types
    setChartType(chartType === "bar" ? "line" : "bar");
  };

  const chartOptions = {
    chart: {
      type: chartType, // Use the selected chart type
    },
    xaxis: {
      categories: stockData.map((data) => data.name),
      title: {
        text: "Products",
        style: {
          fontSize: "20px",
        },
      },
    },
    
    noData : {
      text : "Empty Stock...!",
      style: {
        fontSize :'30px',
        
      }
      
    },
    
    // ... (your other options)
  };

  const chartSeries = [
    {
      name: "Quantity",
      data: stockData.map((data) => data.quantity),
    },
    {
      name: "Reorder Level",
      data: stockData.map((data) => data.reorderLevel),
    },
  ];

  return (
    <center>
      <div className="chart-container" id="ChartGraph" style={{width:'1400px'}}>
       
        <button className="chart-toggle-button" onClick={toggleChartType}>Toggle Chart Type</button>
        <div className="chart">
          <ReactApexChart options={chartOptions} series={chartSeries} type={chartType} height={650} width={1100} />
        </div>
      </div>
    </center>
  );
};

export default ChartGraph;
