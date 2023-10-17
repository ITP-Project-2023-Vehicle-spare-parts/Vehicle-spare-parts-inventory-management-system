import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder, searchOrders } from '../features/auth/authSlice';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../CSS/Admin.css";
import logoImage from "../images/logo.png";

const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Order Status',
    dataIndex: 'action',
  },
  {
    title: 'Product Details',
    dataIndex: 'product',
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders.orders);

  useEffect(() => {
    if (orderState) {
      // Filter orders based on search text
      const filtered = orderState.filter(order => {
        const lowerSearchText = searchText.toLowerCase();
        const nameMatch =
          order.user?.firstname.toLowerCase().includes(lowerSearchText) ||
          order.user?.lastname.toLowerCase().includes(lowerSearchText);
        const amountMatch = order.totalPrice.toString().includes(lowerSearchText);
        const dateMatch = new Date(order.createdAt).toLocaleString().includes(lowerSearchText);
        const actionMatch = order.orderStatus.toLowerCase().includes(lowerSearchText);

        return nameMatch || amountMatch || dateMatch || actionMatch;
      });

      setFilteredOrders(filtered);
    }
  }, [searchText, orderState]);

  const data1 = filteredOrders.map((order, i) => ({
    key: i + 1,
    name: order.user?.firstname + " " + order.user?.lastname,
    product: (
      <Link className="ms-3 fs-3 text-danger" to={`/admin/order/${order._id}`}>
        <AiOutlineEye />
      </Link>
    ),
    amount: `Rs.${order.totalPrice}`,
    date: new Date(order.createdAt).toLocaleDateString(),
    action: order.orderStatus,
    /*(
      <>
        <select
          name=""
          defaultValue={order.orderStatus}
          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
          className='form-control form-select' style={{ fontWeight: 'normal', fontSize: '20px', boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)', fontFamily: 'Arial, sans-serif' }}
        >
          <option value="Ordered" disabled>Ordered</option>
          <option value="Processed">Processed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out Of Delivery">Out Of Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </>
    ),*/
  }));
/*
  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }))
      .then(() => {
        toast.success('Status updated successfully');
      })
      .catch((error) => {
        toast.error('Status update failed');
        console.error(error);
      });
  };
*/
  const status = filteredOrders.map(order => order.orderStatus);
  const totalIncome = filteredOrders.reduce((total, order) => total + order.totalPrice, 0);
  console.log(totalIncome)
  const totalProducts = filteredOrders.length;
  console.log(totalProducts)

  /*
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    const pdfColumns = ['Name', 'Amount', 'Date', 'Status'];

    const pdfData = filteredOrders.map((order, index) => [
      `${order.user?.firstname} ${order.user?.lastname}`,
      `Rs.${order.totalPrice}`,
      new Date(order.createdAt).toLocaleDateString(),
      status[index],
    ]);

    doc.autoTable({
      head: [pdfColumns],
      body: pdfData,
    });

    doc.setFontSize(12);
    doc.text(`Order Report`, 80, 10);

    // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Add the generated date at the end of the page
  doc.text(`Date: ${currentDate}`, 10, doc.autoTable.previous.finalY + 10);

    doc.save('order_report.pdf');
  };

  const handleSearch = () => {
    dispatch(searchOrders(searchText));
  };

  */

  
  
  const pdfColumns = ['Name', 'Amount', 'Date', 'Status'];
  const pdfData = filteredOrders.map((order, index) => [
    `${order.user?.firstname} ${order.user?.lastname}`,
    `Rs.${order.totalPrice}`,
    new Date(order.createdAt).toLocaleDateString(),
    status[index],
  ]);

  const handleGenerateReport = () => {
    const doc = new jsPDF();
  
    const getBase64Image = (img) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      return dataURL;
    };
  
    const img = new Image();
    img.src = logoImage;
    img.onload = () => {
      const imgData = getBase64Image(img);
  
      doc.addImage(imgData, "PNG", 10, 10, 30, 30);
  
      const tableVerticalPosition = 60;
      doc.autoTable({
        columns: pdfColumns,
        body: pdfData,
        startY: tableVerticalPosition,
      });
  
      doc.setFontSize(12);
      doc.text(`Order Report`, 80, 10);
  
      // Define the address lines
      const addressLines = [
        '56,',
        'Kurunegala,',
        'Ibbagamuwa,',
        '+94123456789',
      ];
  
      // Add the address lines to the top right side of the page
      const addressX = 150; // Adjust the X-coordinate as needed
      const addressY = 20; // Adjust the Y-coordinate as needed
  
      addressLines.forEach((line, index) => {
        doc.text(line, addressX, addressY + (index * 10)); // Adjust the spacing (10) as needed
      });

      // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Add the generated date at the end of the page
  doc.text(`Date: ${currentDate}`, 10, doc.autoTable.previous.finalY + 10);
  
      doc.save('order_report.pdf');
    };
  };
  
  
  const handleSearch = () => {
    dispatch(searchOrders(searchText));
  };

  return (
    <div>
      <h3 className='mb-4 title' style={{ fontWeight: 'normal', fontSize: '35px', fontFamily: 'Arial, sans-serif' }}>Orders</h3>
      <div className="d-flex justify-content-between mb-4">
        <Search
          style={{ width: 300, fontSize: '30px', height: '80px', fontFamily: 'Arial, sans-serif' }}
          placeholder="Search"
          allowClear
          enterButton="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={handleGenerateReport} style={{ fontSize: '20px', height: '60px', lineHeight: '50px', fontFamily: 'Arial, sans-serif' }}>
          Generate Report
        </Button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={data1}
          bordered
          rowClassName="row-border"
          style={{
            fontSize: '20px',
            fontWeight: 'normal',
            color: 'black',
            fontFamily: 'Arial, sans-serif',
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
