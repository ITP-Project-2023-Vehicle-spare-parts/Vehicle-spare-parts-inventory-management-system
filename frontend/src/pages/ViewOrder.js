import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from '../features/auth/authSlice';
//import { AiFillDelete } from "react-icons/ai";
//import { BiEdit } from "react-icons/bi";
import { /*Link,*/ useLocation } from "react-router-dom";
import "../CSS/Admin.css"



const columns = [
  
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  }
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState);
  

  const data1 = [];
  
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
      data1.push({
        
        name : orderState?.orderItems[i]?.product.Title,
        brand : orderState?.orderItems[i]?.product.brand,
        count : orderState?.orderItems[i]?.count,
        amount : orderState?.orderItems[i]?.price, 
        color : orderState?.orderItems[i]?.color,
        //color : orderState?.orderItems[i]?.color?.title,
      })
      
    }

  console.log(data1);

  return (
    <div>
      <h3 className='mb-4 title' style={{ fontWeight: 'bold', fontSize: '35px' }}>View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
