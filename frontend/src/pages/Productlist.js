import { React, useEffect } from 'react';
import {Table} from "antd";
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const columns = [
    {
      title: 'ProductID',
      dataIndex: 'productID',
      sorter: (a,b) => a.productID.length - b.productID.length,
      align: 'left'
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      sorter: (a,b) => a.Title.length - b.Title.length,
      align: 'left'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'left'
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      align: 'left'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left'
    }, 
    {
      title: 'Brand',
      dataIndex: 'brand',
      align: 'left'
    }, 
    {
      title: 'Color',
      dataIndex: 'color',
      align: 'left'
    }, 
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left'
    }, 
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left'
    }, 
  ];


const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getProducts());
  }, [dispatch]);
  const productState = useSelector((state) => state.product.products);
  const data1 =[];
  for(let i = 0; i< productState.length ; i++){
    data1.push({
        key: i + 1,
        productID: productState[i].productID,
        Title: productState[i].Title,
        price: productState[i].price,
        discount: productState[i].discount,
        category: productState[i].category,
        brand: productState[i].brand,
        color: productState[i].color,
        description: productState[i].description,
        action: (
          <span className='d-flex'>
            <Link className="fs-3 text-warning" to='/'>
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to='/'>
              <RiDeleteBin5Fill />
            </Link>
          </span>
        ),
    })
  }
  return (
    <div>
        <h3 className='mb-4 title'>Products...</h3>
        <div className='bg-white'>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Productlist;