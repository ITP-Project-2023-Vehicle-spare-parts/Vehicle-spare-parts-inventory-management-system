import React, { useEffect } from 'react';
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.user.getorderedProduct?.orders || []);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-3'>
                <h5 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Tracking Id</h5>
              </div>
              <div className='col-3'>
                <h5 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Amount</h5>
              </div>
              <div className='col-3'>
                <h5 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Total Amount</h5>
              </div>
              <div className='col-3'>
                <h5 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Status</h5>
              </div>
            </div>
          </div>
          <div className='col-12 mt-3'>
            {orderState?.length === 0 && (
              <div className='col-12 p-5'>
                <div className='d-flex justify-content-center align-middle'>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>No orders yet 😓</h3>
                </div>
              </div>
            )}
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div style={{ backgroundColor: '#febd69' }} className='row pt-3 my-3' key={index}>
                    <div className='col-3'>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{item?._id}</p>
                    </div>
                    <div className='col-3'>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{`Rs.${item?.totalPrice}`}</p>
                    </div>
                    <div className='col-3'>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{`Rs.${item?.totalPriceAfterDiscount}`}</p>
                    </div>
                    <div className='col-3'>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{item?.orderStatus}</p>
                    </div>
                    <div className='col-12'>
                      <div className='row py-3' style={{ backgroundColor: '#232f3e' }}>
                        <div className='col-3'>
                          <h6 className='text-white' style={{ fontSize: '16px', fontWeight: 'bold' }}>Product Name</h6>
                        </div>
                        <div className='col-3'>
                          <h6 className='text-white' style={{ fontSize: '16px', fontWeight: 'bold' }}>Quantity</h6>
                        </div>
                        <div className='col-3'>
                          <h6 className='text-white' style={{ fontSize: '16px', fontWeight: 'bold' }}>Price</h6>
                        </div>
                        <div className='col-3'>
                          <h6 className='text-white' style={{ fontSize: '16px', fontWeight: 'bold' }}>Color</h6>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className='col-12'>
                              <div className='row p-3'>
                                <div className='col-3'>
                                  <p className='text-white' style={{ fontSize: '16px', fontWeight: 'normal' }}>{i?.product?.Title}</p>
                                </div>
                                <div className='col-3'>
                                  <p className='text-white' style={{ fontSize: '16px', fontWeight: 'normal' }}>{i?.count}</p>
                                </div>
                                <div className='col-3'>
                                  <p className='text-white' style={{ fontSize: '16px', fontWeight: 'normal' }}>{`Rs.${i?.price}`}</p>
                                </div>
                                <div className='col-3'>
                                  <ul className='colors ps-0'>
                                    <li style={{ backgroundColor: i?.color , marginLeft :'18px'}}></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
