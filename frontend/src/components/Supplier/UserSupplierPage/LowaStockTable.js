import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LowaStockTable.css";

function LowStockTable() {
  const [stocks, setStocks] = useState([]);
  const [showLowStockList, setShowLowStockList] = useState(false);
  const [hiddenRows, setHiddenRows] = useState([]);

  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    // Fetch and show low stock list when the button is clicked
    if (showLowStockList) {
      const fetchLowStockAndShowNotification = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/stock/low-stock"
          );

          if (
            response.data &&
            response.data.lowStockProducts &&
            response.data.lowStockProducts.length > 0
          ) {
            setStocks(response.data.lowStockProducts); // Update the state with fetched data
            console.log(response.data.lowStockProducts);
            // Create a toast notification
            toast.info(
              <>
                <p style={{ color: "black" }}>
                  The following products are running low on stock:
                </p>
                <ul>
                  {response.data.lowStockProducts.map((stock) => (
                    <li key={stock._id}>
                      <strong>{stock.productName}</strong>:
                      <span className="red-font">
                        Need Quantity:{" "}
                        {stock.reorderpoint - stock.stockQuantity}
                      </span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: "white" }}>
                  Please take action to replenish the stock.
                </p>
              </>,
              {
                className: "custom-toast-container",
                closeButton: true,
                autoClose: 10000, // Auto close the notification after 10 seconds
              }
            );
          }
        } catch (error) {
          console.error("Error fetching low stock products:", error);
        }
      };

      fetchLowStockAndShowNotification();
    }
  }, [showLowStockList]); // Add showLowStockList as a dependency

  const handleAddOrderClick = (stock) => {
    const suggestedOrder = {
      productname: stock.productName,
      stockQuantity: stock.stockQuantity,
      reorderpoint: stock.reorderpoint,
      neededStockQuantity: stock.reorderpoint - stock.stockQuantity,
      suppliername: stock.supplierName, // Replace with the actual supplier name
    };
    console.log(suggestedOrder);

    // Send the individual low stock order data to the backend for saving
    saveLowStockOrder(suggestedOrder);
    setHiddenRows([...hiddenRows, stock._id]);
  };

  const saveLowStockOrder = async (ReqOrder) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/supplierReq/save-low-stock-order",
        ReqOrder
      );
      console.log(response.data);
      // Check if the order was saved successfully on the backend
      if (response.data) {
        // Show a success toast notification
        toast.success(
          <>
            <p style={{ color: "black" }}>
              Low stock order has been saved successfully.
            </p>
          </>,
          {
            className: "custom-toast-container",
            closeButton: true,
            autoClose: 5000, // Auto close the notification after 5 seconds
          }
        );
      } else {
        // Show an error toast notification if the order failed to save
        toast.error(
          <>
            <p style={{ color: "black" }}>
              Failed to save low stock order. Please try again later.
            </p>
          </>,
          {
            className: "custom-toast-container",
            closeButton: true,
            autoClose: 5000, // Auto close the notification after 5 seconds
          }
        );
      }
    } catch (error) {
      console.error("Error saving low stock order:", error);
    }
  };

  return (
    <div id="Allstock">
      <div className="fetch-stock-container">
      
        <div className="bar-chart-container">
          {/* Add a button to toggle the low stock list */}
          <button
            class="btn btn-success btn-lg"
            onClick={() => setShowLowStockList(!showLowStockList)}
          >
            Suggest Order
          </button>
        </div>
        <center>
          <div>
            {/* Render the low stock list only when showLowStockList is true */}
            {showLowStockList && (
              <table
                className="stock-table"
                id="lowstocktable"
                style={{ width: "1000px", height: "100px" }}
              >
                <thead>
                  <tr>
                    <th style={stocktableHeaderStyle}>Product Name</th>
                    <th style={stocktableHeaderStyle}>Stock Quantity</th>
                    <th style={stocktableHeaderStyle}>Re Order Level</th>
                    <th style={stocktableHeaderStyle}>Needed Stock Quantity</th>
                    <th style={stocktableHeaderStyle}>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(
                    (stock) =>
                      !hiddenRows.includes(stock._id) && (
                        <tr key={stock._id}>
                          <td style={stocktableCellStyle}>
                            {stock.productName}
                          </td>
                          <td style={stocktableCellStyle}>
                            {stock.stockQuantity}
                          </td>
                          <td style={stocktableCellStyle}>
                            {stock.reorderpoint}
                          </td>
                          <td style={stocktableCellStyle}>
                            {stock.reorderpoint - stock.stockQuantity}
                          </td>
                          <td style={stocktableCellStyle}>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleAddOrderClick(stock)}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </center>
      </div>
    </div>
  );
}

// Define CSS styles for the table headers and cells
const stocktableHeaderStyle = {
  border: "6px solid #ddd",
  textAlign: "center",
};

const stocktableCellStyle = {
  border: "6px solid #ddd",
};

export default LowStockTable;
