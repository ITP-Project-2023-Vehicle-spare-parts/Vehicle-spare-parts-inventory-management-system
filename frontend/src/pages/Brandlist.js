import { React, useEffect } from 'react';
import {Table} from "antd";
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: 'left'
    },
    {
      title: 'Brand',
      dataIndex: 'title',
      sorter: (a,b) => a.title.length - b.title.length,
      align: 'left'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left'
    }, 
  ];


const Brandlist = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getBrands());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 =[];
  for(let i = 0; i< brandState.length ; i++){
    data1.push({
        key: i + 1,
        title: brandState[i].title,
        action: (
          <span>
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
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Brandlist;