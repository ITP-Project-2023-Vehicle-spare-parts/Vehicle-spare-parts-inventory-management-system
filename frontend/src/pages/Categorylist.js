import React from 'react'
import {Table} from "antd";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
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

  const data1 =[];
  for(let i = 0; i<46; i++){
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no, ${i}`,
    })
  }

const Categorylist = () => {
  return (
    <div>
        <h3 className='mb-4 title'>Product Categories...</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Categorylist;