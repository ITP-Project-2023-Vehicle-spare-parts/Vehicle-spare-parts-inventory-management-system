import { React, useEffect } from 'react';
import {Table} from "antd";
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {getColors} from '../features/color/colorSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    align: 'left'
  },
  {
    title: 'Color',
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

const Colorlist = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state.color.colors);
  const data1 =[];
  for(let i = 0; i< colorState.length ; i++){
    data1.push({
        key: i + 1,
        title: colorState[i].title,
        action: (
          <span>
            <Link className="ms-3 fs-3 text-danger" to='/'>
              <RiDeleteBin5Fill />
            </Link>
          </span>
        ),
    })
  }
  return (
    <div>
        <h3 className='mb-4 title'>Colors...</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Colorlist;