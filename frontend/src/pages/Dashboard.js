import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getYearlyData, getOrders } from '../features/auth/authSlice';
import "../CSS/Admin.css";

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
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Product Price After Discount',
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
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Dispatch actions to fetch data when the component mounts
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    // Update the data for config and config2 when monthlyDataState and yearlyDataState change
    if (monthlyDataState && yearlyDataState) {
      let data = [];
      let monthlyOrderCount = [];
      for (let index = 0; index < monthlyDataState.length; index++) {
        const element = monthlyDataState[index];
        data.push({ type: element?._id?.month, income: element?.amount });
        monthlyOrderCount.push({ type: element?._id?.month, sales: element?.count });
      }
      setDataMonthly(data);
      setDataMonthlySales(monthlyOrderCount);
    }
  }, [monthlyDataState, yearlyDataState]);

  useEffect(() => {
    // Update orderData when orderState changes
    if (orderState) {
      const data1 = orderState.map((order, index) => ({
        key: index,
        name: `${order.user?.firstname} ${order.user?.lastname}`,
        product: order.orderItems?.length,
        price: order?.totalPrice,
        dprice: order?.totalPriceAfterDiscount,
        status: order?.orderStatus,
      }));
      setOrderData(data1);
    }
  }, [orderState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => "#1890ff",
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
      income: {
        alias: 'Income',
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => "#1890ff",
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
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>Rs.{yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
          
          <p className='mb-0 desc'></p>
          </div>
        </div>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
        <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            
            <p className='mb-0 desc'></p>
          </div>
        </div>
        
      </div>
      <div className='d-flex justify-content-between gap-3'>
      <div className='mt-4 flex-grow-1 w-50'>
        <h3 className='mb-5 title'>Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
        </div>
        <div className='mt-4 flex-grow-1 w-50 '>
        <h3 className='mb-5 title'>Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
        </div>
      </div>
        <div className='mt-4 '>
          <h3 className='mb-5 title'>Recent Orders</h3>
          <div>
          <Table columns={columns} dataSource={orderData} />
          </div>
        </div>       
    </div>  
     
  );
};

export default Dashboard;