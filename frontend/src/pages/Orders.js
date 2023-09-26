import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder, searchOrders, generatePDFReport } from '../features/auth/authSlice';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";

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
    title: 'Action',
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
  const [reportUrl, setReportUrl] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders.orders);

  useEffect(() => {
    if (orderState) {
      // Filter orders based on search text
      const filtered = orderState.filter(order =>
        order.user.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        order.user.lastname.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchText, orderState]);

  const data1 = filteredOrders.map(order => ({
    name: order.user.firstname + " " + order.user.lastname,
    product: (
      <Link className="ms-3 fs-3 text-danger" to={`/admin/order/${order._id}`}>
        <AiOutlineEye />
      </Link>
    ),
    amount: order.totalPrice,
    date: new Date(order.createdAt).toLocaleString(),
    action: (
      <>
        <select
          name=""
          value={order.orderStatus}
          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
          className='form-control form-select'
        >
          <option value="Ordered" disabled>Ordered</option>
          <option value="Processed">Processed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out Of Delivery">Out Of Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </>
    ),
  }));

  const updateOrderStatus = (orderId, status) => {
    dispatch(updateAOrder({ id: orderId, status }))
      .then(() => {
        toast.success('Status updated successfully');
      })
      .catch((error) => {
        toast.error('Status update failed');
        console.error(error);
      });
  }

  const handleSearch = () => {
    dispatch(searchOrders(searchText));
  };

  const handleGenerateReport = () => {
    dispatch(generatePDFReport())
      .then((response) => {
        // If the report is generated successfully, set the URL to download it
        setReportUrl(response.payload);
      })
      .catch((error) => {
        toast.error('PDF generation failed');
        console.error(error);
      });
  }
  

  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <div className="d-flex justify-content-between mb-4">
        <Search
          style={{ width: 300 }}
          placeholder="Search by name"
          allowClear
          enterButton="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      {reportUrl && (
        <a href={reportUrl} download="all_orders.pdf">
          Download PDF Report
        </a>
      )}
    </div>
  );
};

export default Orders;
