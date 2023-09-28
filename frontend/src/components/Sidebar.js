import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';


import {AiOutlineDashboard, AiOutlineStock, AiOutlineShoppingCart, AiOutlineBranches, AiOutlineLogout} from "react-icons/ai";
import {BiUserCircle, BiSolidBox, BiSolidUserDetail, BiSolidOffer} from "react-icons/bi";
import {TbTruckDelivery} from "react-icons/tb";
import {BsCardChecklist} from "react-icons/bs";
import {MdOutlineHomeRepairService} from "react-icons/md";


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
            },
            {
              key: 'product',
              icon: <BiSolidBox className='fs-4'/>,
              label: 'Product',
            },
            {
              key: 'supplier',
              icon: <BiSolidUserDetail className='fs-4'/>,
              label: 'Supplier',
              children : [
                {
                  key: 'supplier',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'Add Supplier',
                },
                {
                  key: 'supplier',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'View Suppliers',
                },
               
              ]
            },
            {
              key: 'client',
              icon: <BiSolidUserDetail className='fs-4'/>,
              label: 'Client',
              children : [
                {
                  key: 'client',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'Add Client',
                },
                {
                  key: 'client',
                  icon: <BiSolidUserDetail className='fs-4'/>,
                  label: 'View Client',
                },
               
              ]
            },
            {
              key: 'stock',
              icon: <AiOutlineStock className='fs-4'/>,
              label: 'Stock',
              children : [
                {
                  key: 'supplier',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Add Stock',
                },
                {
                  key: 'supplier',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'View Stock',
                },
                {
                  key: 'supplier',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'Stock Level',
                },
                {
                  key: 'supplier',
                  icon: <AiOutlineStock className='fs-4'/>,
                  label: 'View Low Stock',
                }
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
            },
            {
              key: 'branch',
              icon: <AiOutlineBranches className='fs-4'/>,
              label: 'Branch',
            },
            {
              key: 'delivery',
              icon: <TbTruckDelivery className='fs-4'/>,
              label: 'Delivery',
            },
            {
              key: 'service',
              icon: <MdOutlineHomeRepairService className='fs-4'/>,
              label: 'Service',
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