import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {createAnOrder, getUserCart} from '../features/user/userSlice';


const shippingSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First Name should contain only letters')
    .required('First Name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last Name should contain only letters')
    .required('Last Name is required'),
  address: yup.string().required('Address is required'),
  street: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Street should contain only letters')
    .required('Street is required'),
  city: yup.string().required('City is required'),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.userCart);

  const authState = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const navigate = useNavigate();
  //
  // useEffect(() => {
  //     let sum = 0;
  //     for (let index = 0; index < cartState?.length; index++) {
  //         sum = sum + Number(cartState[index].quantity) * cartState[index].price;
  //     }
  //     setTotalAmount(sum);
  // }, [cartState]);

  useEffect(() => {
    // get user cart and store it in redux store
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    if (authState.createdOrder != null && authState.createdOrder.success === true) {
      navigate('../my-orders');
    }
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      street: '',
      city: '',
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      // Set shipping info to state and local storage
      setShippingInfo(values);
      localStorage.setItem('address', JSON.stringify(values));

      const formData = {
        shippingInfo: formik.values,
        paymentInfo: {},
      };

      if(!cartState || cartState.products.length === 0){
        alert("Your cart is empty, please add products to cart to place an order");
      }else{
        // Handle form submission manually
        dispatch(createAnOrder(formData));
      }

      // Uncomment the line below to use formik's default submit logic
      // formik.handleSubmit();
    },
  });


  return (<>
    <Container class1='checkout-wrapper py-5 home-wrapper-2'>
      <div className='row'>
        <div className='col-7'>
          <div className='checkout-left-data'>
            <h3 className='website-name'>Chathura Motors</h3>
            <nav
              style={{'--bs-breadcrumb-divider': '>'}}
              aria-label='breadcrumb'
            >
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link className='text-dark total-price' to='/cart'>
                    Cart
                  </Link>
                </li>
                &nbsp; /
                <li
                  className='breadcrumb-item total-price active'
                  aria-current='page'
                >
                  Information
                </li>
                &nbsp; /&nbsp;
                <li className='breadcrumb-item total-price active'>
                  Shipping
                </li>
                &nbsp; /
                <li className='breadcrumb-item active' aria-current='page'>
                  Payment
                </li>
              </ol>
            </nav>
            <h4 className='title total'>Contact Information</h4>
            <p className='user-details total'>
              {authState?.user?.firstname} {authState?.user?.lastname}
              <br/>
              {authState?.user?.email} | {authState?.user?.mobile}
            </p>
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
                <div
                  className={`error ms-2 my-1 ${formik.touched.firstName && formik.errors.firstName ? 'errors' : ''}`}
                >
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
                <div
                  className={`error ms-2 my-1 ${formik.touched.lastName && formik.errors.lastName ? 'errors' : ''}`}
                >
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
                <div
                  className={`error ms-2 my-1 ${formik.touched.address && formik.errors.address ? 'errors' : ''}`}
                >
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
                <div
                  className={`error ms-2 my-1 ${formik.touched.street && formik.errors.street ? 'errors' : ''}`}
                >
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
                  <option value='Colombo'>Kurunegala</option>
                  <option value='Colombo'>Ratnapura</option>
                  <option value='Colombo'>Galle</option>
                  <option value='Colombo'>Anuradhapura</option>
                  <option value='Colombo'>Jaffna</option>
                </select>


                <div
                  className={`error ms-2 my-1 ${formik.touched.city && formik.errors.city ? 'errors' : ''}`}
                >
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>
              <div className='w-100'>
                <div className='d-flex justify-content-between align-items-center'>
                  <Link to='/home/cart' className='text-dark'>
                    <AiOutlineArrowLeft className='me-2'/>
                    Return to Cart
                  </Link>
                  <Link to='/home/store' className='button'>
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
            {cartState && cartState?.products.map((item, index) => {
              return (<div
                key={index}
                className='d-flex gap-10 mb-2 align-items-center'
              >
                <div className='w-75 d-flex gap-10'>
                  <div className='w-25 position-relative'>
                          <span
                            style={{top: '-10px', right: '2px'}}
                            className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
                          >
                            {item?.count}
                          </span>
                    {item?.product?.images?.length > 0 &&
                      <img
                      width={100}
                      height={100}
                      src={item?.product?.images[0]?.url}
                      alt='product img'
                    />
                    }
                  </div>
                  <div>
                    <h5 className='total-price'>
                      {item?.product?.Title}
                    </h5>
                    <p className='total-price'>{item?.color} </p>
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <h5 className='total'>
                    Rs.{item?.price * item?.count}
                  </h5>
                </div>
              </div>);
            })}
          </div>

          <div className='border-bottom py-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <p className='total'>SubTotal</p>
              <p className='total-price'>
                Rs.{cartState?.cartTotal ? cartState.cartTotal : '0'}
              </p>
            </div>
            
            <div className='d-flex justify-content-between align-items-center'>
              <p className='mb-0 total'>Shipping</p>
              <p className='mb-0 total-price'>Rs.350</p>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
            <h4 className='total'>Total</h4>
            <h5 className='total-price'>
              Rs.{cartState?.totalAfterDiscount ? cartState.totalAfterDiscount + 350 : '0'}
            </h5>
          </div>
        </div>
      </div>
    </Container>
  </>);
};

export default Checkout;

