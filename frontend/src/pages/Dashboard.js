import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getYearlyData, getOrders } from '../features/auth/authSlice';
import '../CSS/Admin.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'price',
  },
  {
    title: 'Total Price',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderdata] = useState([]);

  useEffect(() => {
    const getTokenFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const config3 = {
      headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
        Accept: "application/json",
      },
    };

    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let data = [];
    let monthlyOrderCount = [];

    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({ type: monthNames[element?._id.month], income: element?.amount });
      monthlyOrderCount.push({ type: monthNames[element?._id?.month], sales: element?.count });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];

    for (let i = 1; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i].user?.firstname + " " + orderState[i].user?.lastname,
        product: orderState[i].orderItems?.length,
        price: `Rs. ${orderState[i]?.totalPrice}`,
        dprice: `Rs. ${orderState[i]?.totalPriceAfterDiscount}`,
        status: orderState[i]?.orderStatus,
      });
    }

    setOrderdata(data1);
  }, [monthlyDataState, yearlyDataState, orderState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#1890ff";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#1890ff";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4 title' style={{ fontWeight: 'bold', fontSize: '35px',fontFamily: 'Arial, sans-serif' }}>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc' style={{ fontSize: '24px', color: '#6c757d',fontFamily: 'Arial, sans-serif' }}>Total Income</p>
            <h4 className='mb-0 sub-title' style={{ fontSize: '30px',fontFamily: 'Arial, sans-serif' }}>Rs.{yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
        </div>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc' style={{fontSize: '24px', color: '#6c757d',fontFamily: 'Arial, sans-serif' }}>Total Sales</p>
            <h4 className='mb-0 sub-title' style={{ fontSize: '30px' ,fontFamily: 'Arial, sans-serif'}}>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between gap-3'>
        <div className='mt-4 flex-grow-1 w-50'>
          <h3 className='mb-5 title' style={{ fontSize: '30px' ,fontFamily: 'Arial, sans-serif'}}>Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className='mt-4 flex-grow-1 w-50 '>
          <h3 className='mb-5 title' style={{ fontSize: '30px',fontFamily: 'Arial, sans-serif' }}>Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className='mt-4 '>
        <h3 className='mb-5 title' style={{ fontSize: '30px' ,fontFamily: 'Arial, sans-serif'}}>Recent Orders</h3>
        <div>
          <Table
            columns={columns}
            dataSource={orderData}
            bordered 
            
            style={{
              fontSize: '20px',
              fontWeight: 'normal',
              color: 'black',
              fontFamily: 'Arial, sans-serif'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
