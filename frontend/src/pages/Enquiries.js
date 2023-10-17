import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry
} from '../features/enquiry/enquirySlice';
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify"; 
import "../CSS/Admin.css"; 

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'blue',
    },
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const [statusUpdated, setStatusUpdated] = useState(false); 
  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState);
    dispatch(getEnquiries());
  }, [dispatch]);

  const enqState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data))
      .then(() => {
        toast.success("Status updated successfully"); 
        setStatusUpdated(true);
      })
      .catch((error) => {
        toast.error("Status update failed"); 
        console.error(error);
      });
  };

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e))
      .then(() => {
        toast.success("Inquiry deleted successfully"); 
        setOpen(false);
        setTimeout(() => {
          dispatch(getEnquiries());
        }, 100);
      })
      .catch((error) => {
        toast.error("Failed to delete inquiry"); 
        console.error(error);
      });
  };

  useEffect(() => {
    
    if (statusUpdated) {
      const timer = setTimeout(() => {
        setStatusUpdated(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [statusUpdated]);

  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <select
          name=""
          defaultValue={enqState[i].status ? enqState[i].status : "submitted"}
          className="form-control form-select"
          id=""
          onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          style={{
            fontSize: '20px',
          }}
        >
          <option value="Submitted" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }} >Submitted</option>
          <option value="Contacted" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }} >Contacted</option>
          <option value="In Progress" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }} >In Progress</option>
          <option value="Resolved" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }} >Resolved</option>
        </select>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title" style={{ fontWeight: 'bold', fontSize: '35px' }}>Inquiries</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          bordered 
          
          style={{
            fontSize: '20px',
            fontWeight: 'normal',
            color: 'black',
            fontFamily: 'Arial, sans-serif', 
          }}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this inquiry?"
      />
    </div>
  );
};

export default Enquiries;
