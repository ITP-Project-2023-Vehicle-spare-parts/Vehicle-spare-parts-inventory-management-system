import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Container from '../components/Container';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import "../CSS/user.css";
import { config } from '../utils/axiosconfig';
import { createAnOrder, deleteUserCart, getUserCart, resetState } from '../features/user/userSlice';

const shippingSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  address: yup.string().required('Address is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
});

const Checkout = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector(state => state.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const[cartProductState, setCartProductState] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
    }
    setTotalAmount(sum);
  }, [cartState]);

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

 

  useEffect(() => {
    if(authState.orderedProduct?.order != null && authState?.orderedProduct?.success === true){
      navigate("my-orders")
    }
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      street: '',
      city: '',
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values))
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });
  
  console.log(shippingInfo)
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(()=> {
    let items = []
    for (let index = 0; index < cartState?.length; index++) {
      items.push({product : cartState[index].productId._id, 
                  quantity:cartState[index].quantity,
                  color : cartState[index].color._id,
                  price : cartState[index].price
      })
    }
    setCartProductState(items)
  },[cartState])

  

  const checkOutHandler = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/Checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }
    const result = await axios.post('http://localhost:8040/api/user/order/checkout', {amount : totalAmount + 350}, config);
    if (!result) {
      alert('Something went wrong');
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;
    console.log(amount);
    const options = {
      key: 'rzp_test_3FOY0u3DufAv0N',
      amount: amount,
      currency: currency,
      name: 'Chathuta Moters',
      description: 'Test Transaction',
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post('http://localhost:8040/api/user/order/paymetVerification', data, config2);
        
        dispatch(createAnOrder({totalPrice : totalAmount, totalPriceAfterDiscount : totalAmount, orderItem : cartProductState, paymentInfo : result.data, shippingInfo : JSON.parse(localStorage.getItem("address"))}))
        dispatch(deleteUserCart(config2))
        localStorage.removeItem("address")
        dispatch(resetState())
        
      },
      prefill: {
        name: 'Chathura MOters',
        email: 'Cmoters@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Chathura Moters',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-7'>
            <div className='checkout-left-data'>
              <h3 className='website-name'>Chathura Motors</h3>
              <nav
                style={{ '--bs-breadcrumb-divider': '>' }}
                aria-label='breadcrumb'
              >
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link className='text-dark total-price' to='/cart'>
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li className='breadcrumb-item total-price active' aria-current='page'>
                    Information
                  </li>
                  &nbsp; /&nbsp;
                  <li className='breadcrumb-item total-price active'>Shipping</li>
                  &nbsp; /
                  <li className='breadcrumb-item active' aria-current='page'>
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className='title total'>Contact Information</h4>
              <p className='user-details total'>Sandithya Sasmini (sandithyas@gmail.com)</p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=''
                className='d-flex gap-15 flex-wrap justify-content-between'
              >
                <div className='flex-grow-1'>
                  <input
                    type='text'
                    placeholder='First Name'
                    className='form-control'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange('firstName')}
                    onBlur={formik.handleBlur('firstName')}
                  />
                  <div className={`error ms-2 my-1 ${formik.touched.firstName && formik.errors.firstName ? 'errors' : ''}`}>
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <input
                    type='text'
                    placeholder='Last Name'
                    className='form-control'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange('lastName')}
                    onBlur={formik.handleBlur('lastName')}
                  />
                  <div className={`error ms-2 my-1 ${formik.touched.lastName && formik.errors.lastName ? 'errors' : ''}`}>
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className='w-100'>
                  <input
                    type='text'
                    placeholder='Address'
                    className='form-control'
                    name='address'
                    value={formik.values.address}
                    onChange={formik.handleChange('address')}
                    onBlur={formik.handleBlur('address')}
                  />
                  <div className={`error ms-2 my-1 ${formik.touched.address && formik.errors.address ? 'errors' : ''}`}>
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input
                    type='text'
                    placeholder='Street'
                    className='form-control'
                    name='street'
                    value={formik.values.street}
                    onChange={formik.handleChange('street')}
                    onBlur={formik.handleBlur('street')}
                  />
                  <div className={`error ms-2 my-1 ${formik.touched.street && formik.errors.street ? 'errors' : ''}`}>
                    {formik.touched.street && formik.errors.street}
                  </div>
                </div>
                <div className='flex-grow-1'>
                <select
                  name='city'
                  value={formik.values.city}
                  onChange={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                  className='form-control form-select'
                >
                  <option value='' disabled>
                    Select city
                  </option>
                  <option value='Colombo'>Colombo</option>
                </select>

                  <div className={`error ms-2 my-1 ${formik.touched.city && formik.errors.city ? 'errors' : ''}`}>
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/layout/cart' className='text-dark'>
                      <AiOutlineArrowLeft className='me-2' />
                      Return to Cart
                    </Link>
                    <Link to='/product' className='button'>
                      Continue to Shipping
                    </Link>
                    <button className='button' type='submit'>
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='col-5'>
            <div className='border-bottom py-4'>
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span style={{ top: '-10px', right: '2px' }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>
                            {item?.quantity}
                          </span>
                          <img width={100} height={100} src={item?.productId?.images[0]?.url} alt='product' />
                        </div>
                        <div>
                          <h5 className='total-price'>{item?.productId?.title}</h5>
                          <p className='total-price'>{item?.color?.title} </p>
                        </div>
                      </div>
                      <div className='flex-grow-1'>
                        <h5 className='total'>Rs.{item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>SubTotal</p>
                <p className='total-price'>Rs.{totalAmount ? totalAmount : '0'}</p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>Rs.350</p>
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>Rs.{totalAmount ? totalAmount + 350 : '0'}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
