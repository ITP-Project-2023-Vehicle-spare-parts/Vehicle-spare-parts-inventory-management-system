import { React, useEffect, useState } from 'react';
import {Table} from "antd";
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {deleteColor, getColors} from '../features/color/colorSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';


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
  const [open, setOpen] = useState(false);
  const [ColorId, setcolorId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e)
  };
  const handleOk = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(()=>{ dispatch(getColors()) }, 100)
  };
  const handleCancel = () => {
    setOpen(false);
  };
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
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(colorState[i]._id)}>
              <RiDeleteBin5Fill />
            </button>
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
        <CustomModal hideModal={handleCancel} open={open} performAction={()=>{handleOk(ColorId)}} title="Are you sure you want to delete this color.?" />
    </div>
  )
}

export default Colorlist;