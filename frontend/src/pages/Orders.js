import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  {
    title: 'OrderNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
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
    title: 'Action',
    dataIndex: 'action',
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders.orders); 

  

  
  const data1 = [];

  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product : <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>,
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name='' defaultValue={orderState[i]?.orderStatus} onChange={(e)=> updateOrderStatus(orderState[i]?._id, e.target.value)} className='form-control form-select' id=''>
            <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out Of Delivery">Out Of Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }))
      .then(() => {
        toast.success('Status updated successfully'); // Show a success toast
      })
      .catch((error) => {
        toast.error('Status update failed'); // Show an error toast
        console.error(error);
      });
  }

  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
