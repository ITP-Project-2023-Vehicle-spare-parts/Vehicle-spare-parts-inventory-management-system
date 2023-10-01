// api.js
import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';  // Update with your backend URL

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`http://localhost:8000/allOrder/getOrderByID/${orderId}`);
    return response.data.DeliveryOrders;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;  // Propagate the error
  }
};

export const getDeliveryPersonDetails = async (deliveryPersonId) => {
  try {
    const response = await axios.get(`http://localhost:8000/deliveryPerson/getById/${deliveryPersonId}`);
    return response.data.DeliveryPerson;
  } catch (error) {
    console.error('Error fetching delivery person details:', error);
    throw error;
  }
};

// export const getUserDetails = async (userId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
//     return response.data.User;
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     throw error;
//   }
// };
