import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import { BiUserCircle, BiSolidUserDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./deliveryPersonSideBar.css";
import { resetState } from '../features/user/userSlice';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const DeliveryPersonSideBar = () => {
  const email = sessionStorage.getItem("userEmail");
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   console.log(BiSolidUserDetail)
  useEffect(() => {
    axios.get(`http://localhost:8000/deliveryPerson/getByMail/${email}`)
      .then((response) => {
        setDeliveryPerson(response.data.deliveryPerson);
      })
      .catch((error) => {
        console.error('Error fetching delivery person details:', error);
      });
  }, [email]);

  const handleSignout = () => {
    sessionStorage.clear();
    dispatch(resetState());
    setTimeout(() => {
      navigate('/');
    }, 500); 
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout id='deliverypersonsidebar'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>CM</span>
            <span className='lg-logo'>Chathura Motors</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key}) => {
            if (key === 'signout') {
            
            } else {
              navigate(key);
            }
            
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4'/>,
              label: 'Dashboard',
            },
            {
              key: 'UserProfile',
              icon: <BiUserCircle className='fs-4'/>,
              label: 'User',

            },
            {
              key: 'CurrentOrder',
              icon: <AiOutlineShoppingCart className='fs-4'/>,
              label: 'Current Working Order',
            },
            {
              key: 'OrderHistory',
              icon: <AiOutlineShoppingCart className='fs-4'/>,
              label: 'Delivered Orders',
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout className='fs-4'/>,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
      <Header className="delivery-header-container">
      <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="delivery-logo">Chathura Motors</div>

          <div className='delivery-user-section'>
            <div className='delivery-notifications'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1'>{/* You can dynamically set the notification count here */}</span>
            </div>
            <div className='delivery-dropdown'>
              <div className='delivery-user-info'>
                <img
                  width={40}
                  height={40}
                  src='https://cdn.pixabay.com/photo/2014/03/25/16/24/female-296990_640.png'
                  alt=''
                />
                <div
                  role="button"
                  className='delivery-dropdown-toggle'
                  id='deliveryDropdownMenuLink'
                  data-bs-toggle='dropdown'
                  aria-expanded="false"
                >
                  <h5 className='mb-0'>
                    Welcome {deliveryPerson ? deliveryPerson.deliverypersonname : ""}
                  </h5>
                  <p className='mb-0'>{email}</p>
                </div>
                <div className='delivery-dropdown-menu'>
                  <Link className="delivery-dropdown-item" to="/delivery/UserProfile">
                    View Profile
                  </Link>
                  <button className="delivery-dropdown-item" onClick={handleSignout}>
          Sign Out
        </button>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default DeliveryPersonSideBar