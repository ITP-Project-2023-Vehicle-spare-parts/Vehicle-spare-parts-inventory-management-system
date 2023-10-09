import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {Link} from "react-router-dom";

import {AiOutlineDashboard, AiOutlineStock, AiOutlineShoppingCart, AiOutlineBranches, AiOutlineLogout} from "react-icons/ai";
import {BiUserCircle, BiSolidBox, BiSolidUserDetail, BiSolidOffer} from "react-icons/bi";
import {TbTruckDelivery} from "react-icons/tb";
import {BsCardChecklist} from "react-icons/bs";
import {MdOutlineHomeRepairService} from "react-icons/md";
import {IoIosNotifications} from "react-icons/io";

import {useNavigate} from "react-router-dom";

import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
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
              key: 'user',
              icon: <BiUserCircle className='fs-4'/>,
              label: 'User',
              children : [
                {
                  key: 'user/customerlist',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'User Table',
                },
                {
                  key: 'user/statistics',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'Statistics',
                },
                
              ]
            },
            {
              key: 'Catalog',
              icon: <BiSolidBox className='fs-4'/>,
              label: 'Catalog',
              children : [
                {
                  key: 'Add-product',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Product List',
                },
                {
                  key: 'Add-brand',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Add Brand',
                },
                {
                  key: 'brand-list',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Brand List',
                },
                {
                  key: 'Add-category',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Category List',
                },
                {
                  key: 'Add-color',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Add Color',
                },
                {
                  key: 'color-list',
                  icon: <BiSolidBox className='fs-4'/>,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'supplier',
              icon: <BiSolidUserDetail className='fs-4'/>,
              label: 'Supplier',
              children : [
                {
                  key: 'sup/add',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'Add Supplier',
                },
                {
                  key: '/Admin/sup/All',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'View Suppliers',
                },
                
              ]
            },
            {
              key: 'clients',
              icon: <BiSolidUserDetail className='fs-4'/>,
              label: 'Clients',
              children : [
                {
                  key: 'client/add',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'Add Clients',
                },
                {
                  key: '/Admin/client/all',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'View Clients',
                },
                
              ]
            },
            {
              key: 'stock',
              icon: <AiOutlineStock className='fs-4'/>,
              label: 'Stock',
              children : [
                {
                  key: 'Add-stock',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Add Stock',
                },
                {
                  key: 'Fetch-stock',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'View Stock',
                },
                
                {
                  key: 'Stock-Low',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'View Low Stock',
                },
                {
                  key: 'Stock-Report',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Stock Report',
                },
                
              ]
            },
            {
              key: 'order',
              icon: <AiOutlineShoppingCart className='fs-4'/>,
              label: 'Order',
            },
            {
              key: 'inquiry',
              icon: <BsCardChecklist className='fs-4'/>,
              label: 'Inquiry',
            },
            {
              key: 'rebate',
              icon: <BiSolidOffer className='fs-4'/>,
              label: 'Rebate',
              children : [
                {
                  key: 'offer/read',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Offers',
                },
                {
                  key: 'coupon/read',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Coupons',
                },
              ]
            },
            {
              key: 'branch',
              icon: <AiOutlineBranches className='fs-4'/>,
              label: 'Branch',
              children : [
                {
                  key: 'branch/read',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Branch',
                },]
            },
            {
              key: 'delivery',
              icon: <TbTruckDelivery className='fs-4'/>,
              label: 'Delivery',
              children : [
                {
                     key: 'DeliveryPerson-add',
                     icon: <TbTruckDelivery className='fs-4'/>,
                     label: 'Add delivery porson',
                },
                {
                  key: 'DeliveryPerson/getAll',
                  icon: <TbTruckDelivery className='fs-4'/>,
                  label: 'Delivery Person Info',
                },
                {
                  key: 'orders',
                  icon: <TbTruckDelivery className='fs-4'/>,
                  label: 'Received Orders',
                }, 
                {
                  key: 'orderHistory',
                  icon: <TbTruckDelivery className='fs-4'/>,
                  label: 'Order History',
                },
                {
                  key: 'DeliveryChart',
                  icon: <TbTruckDelivery className='fs-4'/>,
                  label: 'Order History chart',
                },

              ]
            },
            {
              key: 'service',
              icon: <MdOutlineHomeRepairService className='fs-4'/>,
              label: 'Service',
              children : [
                {
                  key: 'allclaim',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'All Claims',
                },
              ]
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
        <Header 
          className='d-flex justify-content-between ps-3 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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
          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div 
              className='d-flex gap-3 align-items-center dropdown'>
            <div>
              <img 
                width={40}
                height={40}
                src='https://cdn.pixabay.com/photo/2014/03/25/16/24/female-296990_640.png'
                alt=''               
              />
                </div>
                <div
                  role="button" 
                  id='dropdownMenuLink' 
                  data-bs-toggle='dropdown' 
                  aria-expanded="false">
                <h5 className='mb-0'>Sandithya</h5>
                    <p className='mb-0'>sandithyas@gmail.com</p>             
              </div>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuLink'>
                  <li>
                    <Link 
                      className="dropdown-item py- mb-1" 
                      style={{"height" : "auto", "lineHeight" : "20px"}} 
                      to="/">
                        View Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="dropdown-item py- mb-1" 
                      style={{"height" : "auto", "lineHeight" : "20px"}} 
                      to="/">
                        SingOut
                    </Link>
                  </li>
                  
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
export default MainLayout;