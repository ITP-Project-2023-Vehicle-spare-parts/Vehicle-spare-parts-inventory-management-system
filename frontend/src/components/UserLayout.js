import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';


import { AiOutlineShoppingCart, AiOutlineLogout} from "react-icons/ai";
import {BiUserCircle, BiSolidOffer} from "react-icons/bi";
import {TbTruckDelivery} from "react-icons/tb";
import {BsCardChecklist} from "react-icons/bs";
import {MdOutlineHomeRepairService} from "react-icons/md";


import {useNavigate} from "react-router-dom";

import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const UserLayout = () => {
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
              key: 'Home',
              icon: <BiUserCircle className='fs-4'/>,
              label: 'Home',
            },
           
            {
              key: 'order',
              icon: <AiOutlineShoppingCart className='fs-4'/>,
              label: 'Order',
            },
            {
              key: 'blog',
              icon: <BsCardChecklist className='fs-4'/>,
              label: 'Blogs',
            },
            {
              key: 'promotions',
              icon: <BiSolidOffer className='fs-4'/>,
              label: 'Promotions',
            },
           
            {
              key: 'ongoingorders',
              icon: <TbTruckDelivery className='fs-4'/>,
              label: 'Ongoing Orders',
            },
            {
              key: 'settings',
              icon: <MdOutlineHomeRepairService className='fs-4'/>,
              label: 'settings',
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
export default UserLayout;