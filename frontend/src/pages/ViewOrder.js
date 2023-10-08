import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from '../features/auth/authSlice';
import { useLocation } from "react-router-dom";
import "../CSS/Admin.css";

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    // Add CSS styles to the column
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    // Add CSS styles to the column
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Count',
    dataIndex: 'count',
    // Add CSS styles to the column
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Color',
    dataIndex: 'color',
    // Add CSS styles to the column
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    // Add CSS styles to the column
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);

  const data1 = [];

  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      name: orderState?.orderItems[i]?.product.Title,
      brand: orderState?.orderItems[i]?.product.brand,
      count: orderState?.orderItems[i]?.count,
      amount: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color,
    });
  }

  return (
    <div>
      <h3 className='mb-4 title' style={{ fontWeight: 'bold', fontSize: '35px' }}>View Order</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          bordered // Add border to the table
          // Add CSS styles to the table
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

export default ViewOrder;
