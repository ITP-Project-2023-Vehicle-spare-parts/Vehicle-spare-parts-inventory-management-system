import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify"; 
import { Table } from "antd"; 
import "../CSS/Admin.css"

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId, dispatch]);

  const goBack = () => {
    navigate(-1);
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data))
      .then(() => {
        toast.success("Status updated successfully"); // Show a success toast
      })
      .catch((error) => {
        toast.error("Status update failed"); // Show an error toast
        console.error(error);
      });

    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };

  
 const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      //width : '200px'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width : '850px'
    },
  ];

  
  const data = [
    {
      key: '1',
      attribute: 'Name',
      value: enqName,
    },
    {
      key: '2',
      attribute: 'Mobile',
      value: <a href={`tel:+94${enqMobile}`}>{enqMobile}</a>,
    },
    {
      key: '3',
      attribute: 'Email',
      value: <a href={`mailto:${enqEmail}`}>{enqEmail}</a>,
    },
    {
      key: '4',
      attribute: 'Comment',
      value: enqComment,
    },
    {
      key: '5',
      attribute: 'Status',
      value: enqStatus,
    },
    {
      key: '6',
      attribute: 'Change Status',
      value: (
        <select
          name=''
          defaultValue={enqStatus ? enqStatus : "Submitted"}
          className='form-control form-select'
          id=''
          onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
          style={{
            fontSize: '20px', 
            padding: '5px 10px',
            width: '400px', 
            lineHeight: '2',
            textAlign: 'center', 
            margin: '0 auto', 
          }}
        >
          <option value="Submitted" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }}>
            Submitted
          </option>
          <option value="Contacted" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }}>
            Contacted
          </option>
          <option value="In Progress" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }}>
            In Progress
          </option>
          <option value="Resolved" style={{ color: 'black', fontWeight: 'normal', fontSize: '20px' }}>
            Resolved
          </option>
        </select>
      ),
    },
  ];

  const tableStyle = {
    fontSize: '14px', // Adjust font size as needed
    width: '50%', // Adjust the width of the table
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='mb-4 title' style={{ fontWeight: 'bold', fontSize: '35px' }}>View Inquiry</h3>
        <button className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-3' onClick={goBack}>
          <BiArrowBack className='fs-5'/>
          Go Back
        </button>
      </div>
      <div className='mt-5 bg-white p-4 rounded-3'>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default ViewEnq;
