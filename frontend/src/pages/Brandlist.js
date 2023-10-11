import { React, useEffect, useState } from 'react';
import {Table} from "antd";
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { deleteBrand, getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';

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
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e)
  };
  const handleOk = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(()=>{ dispatch(getBrands()) }, 100)
  };
  const handleCancel = () => {
    setOpen(false);
  };
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
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(brandState[i]._id)}>
              <RiDeleteBin5Fill />
            </button>
          </span>
        ),
    })
  }

  return (
    <div>
        <h3 className='mb-4 title'>Brands...</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={handleCancel} open={open} performAction={()=>{handleOk(brandId)}} title="Are you sure you want to delete this brand.?" />
    </div>
  )
}

export default Brandlist;