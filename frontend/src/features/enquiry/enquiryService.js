import axios from "axios";
import {base_url} from "../../utils/base_url";



const getEnquiries = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    {status : enq.enqData}
  );
  return response.data;
};



export const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    getEnquiry,
    updateEnquiry,
  };
  

export default enquiryService;