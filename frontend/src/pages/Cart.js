import React, {useEffect, useState} from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import watch from "../images/watch.jpg";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import Container from '../components/Container';
import {deleteCartProduct, updateCartProduct} from '../features/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const userCart = useSelector(state => state.user.userCart);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(updateCartProduct({
        cartItemId: productUpdateDetail?.cartItemId,
        quantity: productUpdateDetail?.quantity
      }));
    }
  }, [productUpdateDetail, dispatch]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({id: id}));
  }

  return (
    <>
      <Meta title="Cart"/>
      <BreadCrumb title="Cart"/>
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
              <h4 className='cart-col-1'>Product</h4>
              <h4 className='cart-col-2'>Price</h4>
              <h4 className='cart-col-3'>Quantity</h4>
              <h4 className='cart-col-4'>Total</h4>
            </div>
            {(userCart == null ||  userCart?.products?.length === 0) && <div className='col-12 p-5'>
              <div className='d-flex justify-content-center align-middle'>
                <h4>🛒&ensp;Your cart is empty</h4></div>
            </div>}`
            {userCart && userCart.products?.map((cartProduct, index) => {
              return (
                <div key={index} className='cart-data mb-2 py-3 d-flex justify-content-between align-items-center'>
                  <div className='cart-col-1 d-flex align-items-center'>
                    <div>
                      <img src={watch} alt='product img'/>
                    </div>
                    <div>
                      <p>{cartProduct?.product.Title}</p>
                      <div className='d-flex gap-3'>Color : <ul className='colors ps-0'>
                        <li style={{backgroundColor: cartProduct?.color}}></li>
                      </ul></div>
                    </div>
                  </div>
                  <div className='cart-col-2'>
                    <h5 className='price'>Rs. {cartProduct?.price}</h5>
                  </div>
                  <div className='cart-col-3 d-flex align-items-center gap-15'>
                    <div>
                      <input
                        className='form-control'
                        type='number'
                        name={"quantity" + cartProduct?._id}
                        min={1}
                        id={"cart" + cartProduct?._id}
                        value={cartProduct?.count}
                        onChange={(e) => {
                          setProductUpdateDetail({cartItemId: cartProduct?._id, quantity: e.target.value})
                        }}
                      />
                    </div>
                    <div>
                      <AiFillDelete onClick={() => {
                        deleteACartProduct(cartProduct?._id)
                      }} className='text-danger'/>
                    </div>
                  </div>
                  <div className='cart-col-4'>
                    <h5 className='price'>Rs. {cartProduct?.price * cartProduct?.count}</h5>
                  </div>
                </div>
              );
            })}
            <div className='col-12 py-2 mt-4'>``
              <div className='d-flex justify-content-between align-items-baseline'>
                <Link to='/store' className="button">Continue to shopping</Link>
                {(userCart == null || userCart?.products?.length === 0) ? <div></div> :
                  <div className='d-flex flex-column align-items-end'>
                    <h4>SubTotal : Rs.{userCart ? userCart.cartTotal : "0.00"}</h4>
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
