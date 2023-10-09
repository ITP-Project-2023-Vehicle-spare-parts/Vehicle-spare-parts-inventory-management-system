import axios from "axios";
import {base_url, config  /*, getUserFromLocalStorage*/} from "../../utils/axiosconfig";

const register = async (userData) => {
  const response = await axios.post("", userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
}

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  console.log(cartData)
  console.log(response)
  if (response.data) {
    return response.data;
  }
}

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    console.log(response.data);
      return response.data;
  }

  
  return response.data;
}

const removeProductFromCart = async (data) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}`, config);
  if (response.data) {
    return response.data;
  }
}

const updateProductInCart = async (cartDetail) => {
  console.log(cartDetail.cartItemId)
  const response = await axios.put(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, {}, config);
  if (response.data) {
    return response.data;
  }
}

const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
  if (response.data) {
    return response.data;
  }
}

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
}

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if (response.data) {
    return response.data;
  }
}

export const userService = {
  register,
  login,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductInCart,
  createOrder,
  getUserOrders,
  emptyCart,
}
