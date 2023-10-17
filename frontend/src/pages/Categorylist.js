import { React, useEffect, useState } from 'react';
import {Table} from "antd";
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {deleteCategory, getCategories} from '../features/pcategory/pcategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: 'left',
    },
    {
      title: 'Category type',
      dataIndex: 'title',
      align: 'left',
      sorter: (a,b) => a.Title.length - b.Title.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left',
    },
  ];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e)
  };
  const handleOk = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    setTimeout(()=>{ dispatch(getCategories()) }, 100)
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getCategories());
  }, [dispatch]);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  const data1 =[];
  for(let i = 0; i< pCategoryState.length ; i++){
    data1.push({
        key: i + 1,
        title: pCategoryState[i].title,
        action: (
          <span>
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(pCategoryState[i]._id)}>
              <RiDeleteBin5Fill />
            </button>
          </span>
        ),
    })
  }
  return (
    <div>
        <h3 className='mb-4 title'>Product Categories...</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={handleCancel} open={open} performAction={()=>{handleOk(categoryId)}} title="Are you sure you want to delete this category.?" />
    </div>
  )
}

export default Categorylist;