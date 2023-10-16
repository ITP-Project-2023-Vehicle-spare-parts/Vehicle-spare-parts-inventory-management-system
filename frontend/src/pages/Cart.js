import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
//import watch from '../images/watch.jpg';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { deleteCartProduct, updateCartProduct } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user.userCart?.products || []);
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
    }
  }, [productUpdateDetail, dispatch]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id }));
  };

  // Calculate total count and total amount
  const totalCount = userCart.reduce((total, cartProduct) => {
    return total + cartProduct.count;
  }, 0);
console.log(totalCount)
  const totalAmount = userCart.reduce((total, cartProduct) => {
    return total + cartProduct.price * cartProduct.count;
  }, 0);

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
              <h4 className='cart-col-1 font-weight-bold' style={{ fontSize: '23px', fontWeight: 'bold', color: 'black' }}>Product</h4>
              <h4 className='cart-col-2 font-weight-bold' style={{ fontSize: '23px', fontWeight: 'bold', color: 'black' }}>Price</h4>
              <h4 className='cart-col-3 font-weight-bold' style={{ fontSize: '23px', fontWeight: 'bold', color: 'black' }}>Quantity</h4>
              <h4 className='cart-col-4 font-weight-bold' style={{ fontSize: '23px', fontWeight: 'bold', color: 'black' }}>Total</h4>
            </div>
            {(userCart == null || userCart.length === 0) && (
              <div className='col-12 p-5'>
                <div className='d-flex justify-content-center align-middle'>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>🛒&ensp;Your cart is empty</h4>
                </div>
              </div>
            )}
            {userCart &&
              userCart.map((cartProduct, index) => {
                const productTitle = cartProduct?.product?.Title || 'Product Title Not Available'; // Default text if Title is not available
                return (
                  <div
                    key={index}
                    className='cart-data mb-2 py-3 d-flex justify-content-between align-items-center'
                  >
                    <div className='cart-col-1 d-flex align-items-center'>
                      <div className='w-100'>
                        <img src={cartProduct?.product?.images} alt='product img' />
                      </div>
                      <div className='w-75 '>
                        <p style={{ fontSize: '18px', fontWeight: '550', color: 'black' }}>{productTitle}</p>
                        <div className='d-flex gap-2'>
                          <span style={{ fontSize: '18px', fontWeight: '550', color: 'black' }}>Color :</span>
                          <ul className='colors ps-0' style={{ paddingTop: '3.5px' }}>
                            <li style={{ backgroundColor: cartProduct?.color }}></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='cart-col-2'>
                      <h5 className='price' style={{ fontSize: '18px', color: 'black', fontWeight: '550' }}>Rs. {cartProduct?.price}</h5>
                    </div>
                    <div className='cart-col-3 d-flex align-items-center gap-15'>
                      <div>
                        <input
                          className='form-control' style={{ fontSize: '18px', color: 'black', fontWeight: '550', width :'80px' }}
                          type='number'
                          name={'quantity' + cartProduct?._id}
                          min={1}
                          id={'cart' + cartProduct?._id}
                          value={cartProduct?.count}
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: cartProduct?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(cartProduct?._id);
                          }}
                          className='text-danger'
                          style={{ fontSize: '25px' }}
                        />
                      </div>
                    </div>
                    <div className='cart-col-4'>
                      <h5 className='price' style={{ fontSize: '18px', color: 'black', fontWeight: '550' }}>Rs. {cartProduct?.price * cartProduct?.count}</h5>
                    </div>
                  </div>
                );
              })}
            <div className='col-12 py-2 mt-4'>
              <div className='d-flex justify-content-between align-items-baseline'>
                <Link to='/home/store' className='button' style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold' ,backgroundColor: '#2A3847', transition: 'background-color 0.3s',textDecoration: 'none'  }}>
                  Continue to shopping
                </Link>
                {(userCart == null || userCart.length === 0) ? (
                  <div></div>
                ) : (
                  <div className='d-flex flex-column align-items-end'>
                    <h4 style={{ fontSize: '25px', fontWeight: 'bold', color: 'black' }}>SubTotal : Rs.{totalAmount.toFixed(2)}</h4>
                    <p style={{ fontSize: '20px', color: 'black' }}>Discount and shipping calculated at checkout</p>
                    <Link to='/home/checkout' className='button' style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2A3847', transition: 'background-color 0.3s',textDecoration: 'none'  }}>
                      Checkout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
