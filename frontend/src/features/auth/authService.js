import axios from "axios";
import { base_url } from "../../utils/base_url";



const getTokenFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : { token: null }; 

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json"
  },
};


const login = async (userData) => {
    const response = await axios.post(`${base_url}user/admin-login`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`,
    config
  );
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`, {status : data.status},
    config
  );
  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );
  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,
    data
  );
  return response.data;
};



export const authService = {
    login,
    getOrders,
    getOrder,
    getMonthlyOrders,
    getYearlyStats,
    updateOrder,
};

export default authService;
