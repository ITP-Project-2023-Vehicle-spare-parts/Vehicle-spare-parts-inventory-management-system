import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import StockSideBar from '../components/stockComponents/stockSideBar';
import "./stockCss.css"; // Create a CSS file for styling
import { useDispatch, useSelector } from "react-redux";
//import { getBrands } from '../features/brand/brandSlice';
import { getProducts } from "../features/product/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";

function AddStock() {
  const [productName, setProductName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [reorderpoint, setReorderpoint] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [Suppliers, setorgSupplier] = useState([]);

  useEffect(() => {
    function getSupplier() {
      axios
        .get("http://localhost:8000/supplier/")
        .then((res) => {
          const formattedSuppliers = res.data.map((supplier) => {
            return `${supplier.SupplierfirstName} ${supplier.SupplierLastName}`;
          });
          setorgSupplier(formattedSuppliers);
          toast.success("Data Fetched Successfully!", {
            duration: 3000,
            position: "top-right",
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSupplier();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !productName ||
      !supplierName ||
      !stockAmount ||
      !reorderpoint ||
      !stockQuantity ||
      isNaN(stockAmount) ||
      isNaN(reorderpoint) ||
      isNaN(stockQuantity)
    ) {
      toast.error("Please fill in all fields with valid values.");
      return;
    }

    try {
      const newStock = {
        productName,
        supplierName,
        stockAmount: Number(stockAmount),
        additionalDetails,
        reorderpoint: Number(reorderpoint),
        stockQuantity: Number(stockQuantity),
      };

      await axios.post("http://localhost:8000/stock/add", newStock);

      // Clear the form fields after submission
      setProductName("");
      setSupplierName("");
      setStockAmount("");
      setAdditionalDetails("");
      setReorderpoint("");
      setStockQuantity("");

      Swal.fire({
        icon: "success",
        title: "Stock Added",
        text: "The stock item has been added successfully!",
      });
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <div className="stockcontainer">
      <div className="flex-grow-1 p-4">
        <h1>Add Initial Stock...</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-row">

          <div className="form-group col-md-6">
              <label htmlFor="productName" style={{ fontSize: "20px" }}>
                Product Name
              </label>

              <select
                name="productName"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="form-control custom-select"
                style={{ fontSize: "20px" }}
              >
                <option value="" disabled>
                  Select a Product
                </option>

                {productState.map((i, j) => {
                  return (
                    <option key={j} value={i.Title}>
                      {i.Title}
                    </option>
                  );
                })}
                
              </select>
            </div>
            

            <div className="form-group col-md-6">
              <label htmlFor="productName" style={{ fontSize: "20px" }}>
                Supplier Name
              </label>

              <select
                name="supplierName"
                id="supplierName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                required
                className="form-control custom-select"
                style={{ fontSize: "20px" }}
              >
                <option value="" disabled>
                  Select a supplier
                </option>
                {Suppliers.map((supplier, index) => (
                  <option key={index} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="stockAmount" style={{ fontSize: "20px" }}>
                Stock Amount
              </label>
              <input
                type="number"
                className="form-control custom-input"
                id="stockAmount"
                placeholder="e.g., 1000"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                min="0"
                required
                style={{ fontSize: "20px" }}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="additionalDetails" style={{ fontSize: "20px" }}>
                Additional Details (optional)
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="additionalDetails"
                placeholder="Additional details"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                style={{ fontSize: "20px" }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="reorderpoint" style={{ fontSize: "20px" }}>
                Reorder Point
              </label>
              <input
                type="number"
                className="form-control custom-input"
                id="reorderpoint"
                placeholder="e.g., 10"
                value={reorderpoint}
                onChange={(e) => setReorderpoint(e.target.value)}
                min="0"
                required
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="stockQuantity" style={{ fontSize: "20px" }}>
                Stock Quantity
              </label>
              <input
                type="number"
                className="form-control custom-input"
                id="stockQuantity"
                placeholder="e.g., 50"
                value={stockQuantity}
                min="0"
                required
                onChange={(e) => setStockQuantity(e.target.value)}
                style={{ fontSize: "20px" }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: "20px" }}
          >
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
