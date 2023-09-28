import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import "../CSS/user.css";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from '../components/Container';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

    const config2 = {
      headers : {
          Authorization : `Bearer ${
              getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
          }`,
          Accept : "application/json",
      },
  };


  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector(state => state.auth.cartProducts);
  
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(updateCartProduct({ cartItemId: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }));
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 200);
    }
  }, ); 

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({id : id, config2 : config2}));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  }

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum)
    }
  }, [userCartState])

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
              <h4 className='cart-col-1'>Product</h4>
              <h4 className='cart-col-2'>Price</h4>
              <h4 className='cart-col-3'>Quantity</h4>
              <h4 className='cart-col-4'>Total</h4>
            </div>
            {userCartState && userCartState?.map((item, index) => {
              return (
                <div key={index} className='cart-data mb-2 py-3 d-flex justify-content-between align-items-center'>
                  <div className='cart-col-1 d-flex align-items-center'>
                    <div>
                      <img src={watch} alt='product img' />
                    </div>
                    <div>
                      <p>{item?.productId.title}</p>
                      <p className='d-flex gap-3'>Color : <ul className='colors ps-0'>
                        <li style={{ backgroundColor: item?.color.title }}></li>
                      </ul></p>
                    </div>
                  </div>
                  <div className='cart-col-2'>
                    <h5 className='price'>Rs. {item?.price}</h5>
                  </div>
                  <div className='cart-col-3 d-flex align-items-center gap-15'>
                    <div>
                      <input
                        className='form-control'
                        type='number'
                        name={"quantity" + item?._id}
                        min={1}
                        max={10}
                        id={"cart" + item?._id}
                        value={item?.quantity}
                        onChange={(e) => { setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }}
                      />
                    </div>
                    <div>
                      <AiFillDelete onClick={() => { deleteACartProduct(item?._id) }} className='text-danger' />
                    </div>
                  </div>
                  <div className='cart-col-4'>
                    <h5 className='price'>Rs. {item?.price * item?.quantity}</h5>
                  </div>
                </div>
              );
            })}
            <div className='col-12 py-2 mt-4'>
              <div className='d-flex justify-content-between align-items-baseline'>
                <Link to='/home/store' className="button">Continue to shopping</Link>
                {
                  (totalAmount !== null || totalAmount !== 0) &&
                  <div className='d-flex flex-column align-items-end'>
                  <h4>SubTotal : Rs.{totalAmount}</h4>
                  <p>Discount and shipping calculated at checkout</p>
                  <Link to='/home/checkout' className='button'>Checkout</Link>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
