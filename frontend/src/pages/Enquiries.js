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
import { toast } from "react-toastify"; // Import the toast library

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const [statusUpdated, setStatusUpdated] = useState(false); // Added state for status update toast

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
        toast.success("Status updated successfully"); // Show a success toast
        setStatusUpdated(true);
      })
      .catch((error) => {
        toast.error("Status update failed"); // Show an error toast
        console.error(error);
      });
  };

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e))
      .then(() => {
        toast.success("Inquiry deleted successfully"); // Show a success toast
        setOpen(false);
        setTimeout(() => {
          dispatch(getEnquiries());
        }, 100);
      })
      .catch((error) => {
        toast.error("Failed to delete inquiry"); // Show an error toast
        console.error(error);
      });
  };

  useEffect(() => {
    // Close the status updated toast after a delay
    if (statusUpdated) {
      const timer = setTimeout(() => {
        setStatusUpdated(false);
      }, 3000); // 3 seconds
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
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
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
      <h3 className="mb-4 title">Inquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
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
