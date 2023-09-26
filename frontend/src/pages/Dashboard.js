import React, {useEffect, useState} from 'react';
import "../CSS/Admin.css"
import { Column } from '@ant-design/plots';
//import {BsArrowDownRight, BsArrowUpLeft} from "react-icons/bs";
import {Table} from "antd";
import { useDispatch, useSelector} from "react-redux";
import { getMonthlyData, getYearlyData, getOrders } from '../features/auth/authSlice';

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

  const dispatch = useDispatch()
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders.orders);
  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])
  const [orderData, setOrderdata] = useState([])

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
  
 

  console.log(monthlyDataState);

  useEffect(() => {
    let monthNames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let data = []
    let monthlyOrderCount = []
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({type : monthNames[element?._id.month], income : element?.amount})
      monthlyOrderCount.push({type : monthNames[element?._id?.month], sales : element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)

    const data1 = [];
    for (let i = 1; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i].user?.firstname + " " + orderState[i].user?.lastname,
        product: orderState[i].orderItems?.length,
        price : orderState[i]?.totalPrice,
        dprice : orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderdata(data1)

  },[monthlyDataState, yearlyDataState, orderState])

  
  const config = {
    data : dataMonthly,
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
    data : dataMonthlySales,
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
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>Rs.{yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
          
          <p className='mb-0 desc'>Income in Last Year from Today</p>
          </div>
        </div>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
        <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            
            <p className='mb-0 desc'>Sales in Last Year from Today</p>
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