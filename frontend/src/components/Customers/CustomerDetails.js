import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetching customer details by ID
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => {
        setCustomer(res.data.getaUser);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });

    // Fetching customer's purchase history
    axios
      .get(`http://localhost:8000/customer-orders/${id}`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching purchase history:", error);
      });
  }, [id]);

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      width: 350,
    },
    {
      title: "Value",
      dataIndex: "value",
      
    },
  ];

  const data = [
    {
      key: "1",
      attribute: "Name",
      value: `${customer.firstname} ${customer.lastname}`,
    },
    {
      key: "2",
      attribute: "Email",
      value: customer.email,
    },
    {
      key: "3",
      attribute: "NIC",
      value: customer.nic,
    },
    {
        key: "4",
        attribute: "Mobile Number",
        value: customer.mobile,
      },
      {
        key: "5",
        attribute: "Gender",
        value: customer.gender,
      },
      {
        key: "6",
        attribute: "Street Name",
        value: customer.street,
      },
      {
        key: "7",
        attribute: "City Name",
        value: customer.city,
      },
      {
        key: "8",
        attribute: "State Name",
        value: customer.state,
      },
    
  ];

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
    },
    {
      title: "Total Amount",
      dataIndex: "totalPrice",
    },
    
  ];

  return (
    <div>
        <h2>Customer Details</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <br></br>
      <h2>Purchase History</h2>
      <Table columns={orderColumns} dataSource={orders} />
    </div>
  );
};

export default CustomerDetails;
