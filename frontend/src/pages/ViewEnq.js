import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify"; // Import the toast component
import { Table } from "antd"; // Import the Ant Design Table component

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

  // Define columns for the Ant Design Table
 const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  // Data for the Ant Design Table
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
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='mb-4 title'>View Inquiry</h3>
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
