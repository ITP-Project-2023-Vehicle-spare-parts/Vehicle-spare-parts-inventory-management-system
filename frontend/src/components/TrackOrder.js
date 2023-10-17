import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './TrackOrder.css';
import axios from 'axios';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';



const TrackOrder = () => {
  const [orderId, setSearch] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryPersonDetails, setDeliveryPersonDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deliveryPersonImage, setDeliveryPersonImage] = useState('');

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/allOrder/getOrderByID/${orderId}`);

      if (response.status === 200) {
        setOrderDetails(response.data.DeliveryOrders);
        setShowPopup(true);

        const deliveryPersonId = response.data.DeliveryOrders.deliveryPersonid;

        const deliveryPersonResponse = await axios.get(`http://localhost:8000/deliveryPerson/getById/${deliveryPersonId}`);
        const deliveryPersonID = deliveryPersonResponse.data.DeliveryPersons.DeliveryPersonID;

        if (deliveryPersonResponse.status === 200) {
          setDeliveryPersonDetails(deliveryPersonResponse.data);

          // Fetch delivery person image
          const possibleExtensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG'];

          let imageRef;
          for (const ext of possibleExtensions) {
            imageRef = ref(storage, `images/${deliveryPersonID}.${ext}`);
            try {
              await getDownloadURL(imageRef);
              break;
            } catch (error) {
              imageRef = null;
            }
          }

          if (imageRef) {
            getDownloadURL(imageRef)
              .then((url) => {
                console.log('Delivery Person Image URL:', url);
                setDeliveryPersonImage(url);
              })
              .catch((error) => console.error('Error getting delivery person image URL:', error));
          } else {
            console.error('No image found for the delivery person');
          }
        } else {
          console.error('Failed to fetch delivery person details');
        }
      } else {
        console.error('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div>
      <Header />
      <div id="Track-Order" className="center-container">
        <div className="search-container">
          <input
            type="search"
            value={orderId}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Your Tracking ID.........."
          />
          <button onClick={fetchOrderDetails}>Search</button>
        </div>
        {showPopup && (
          <div className="popup">
            {/* Position the popup between search bar and footer */}
            <div className="popup-content">
              <h2>Order Details</h2>
              {orderDetails ? (
                <div className="order-details-popup">
                  <p><strong>Order Status:</strong> {orderDetails.orderStatus}</p>
                  <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
                  <p><strong>Delivering Branch:</strong> {orderDetails.branch}</p>
                  <h3>Delivery Person Details</h3>
                  {deliveryPersonDetails ? (
                    <div className="delivery-person-details">
                      <img className= "deliveryimage" src={deliveryPersonImage} alt="Delivery Person" />
                      <div>
                      <p><strong>Name:</strong> {deliveryPersonDetails.DeliveryPersons.deliverypersonname}</p>
                      <p><strong>Contact:</strong> {deliveryPersonDetails.DeliveryPersons.deliverypersonContactNumber}</p>
                      <p><strong>Vehicle Number:</strong> {deliveryPersonDetails.DeliveryPersons.deliverypersonVehicleNumber}</p>
                    </div>
                    </div>
                  ) : (
                    <p>Loading delivery person details...</p>
                  )}
                </div>
                
              ) : (
                <p>Loading order details...</p>
              )}
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      {showPopup ? (
        <div className="spacer" style={{ height: '400px' }}></div>
      ) : null}
      <Footer />
    </div>
  );
};

export default TrackOrder;
