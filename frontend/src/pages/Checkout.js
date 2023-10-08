import React, { /*useEffect,*/ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createAnOrder /* , getUserCart*/ } from '../features/user/userSlice';

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
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone Number should contain only digits')
    .required('Phone Number is required'),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.user.userCart);
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  console.log(userState)
  const [shippingInfo, setShippingInfo] = useState(null);
  console.log(shippingInfo)
  const navigate = useNavigate();
  console.log(navigate)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      street: '',
      city: '',
      phone: '',
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      setShippingInfo(values);
      localStorage.setItem('address', JSON.stringify(values));

      const formData = {
        shippingInfo: formik.values,
        paymentInfo: {},
      };

      if (!cartState || cartState.products.length === 0) {
        alert("Your cart is empty, please add products to the cart to place an order");
      } else {
        dispatch(createAnOrder(formData));
      }
    },
  });

  return (
    <>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-7'>
            <div className='checkout-left-data'>
              <h3 className='website-name' style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
                Chathura Motors
              </h3>
              <h4 className='title total' style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                Contact Information
              </h4>
              <p className='user-details total' style={{ fontSize: '18px', fontWeight: 'normal', color: '#666' }}>
                {authState?.user?.firstname} {authState?.user?.lastname} | {authState?.user?.email} | {authState?.user?.mobile}
              </p>
              <h4 className='mb-3' style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                Shipping Details
              </h4>
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
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  />
                  <div
                    className={`error ms-2 my-1 ${formik.touched.firstName && formik.errors.firstName ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
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
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  />
                  <div
                    className={`error ms-2 my-1 ${formik.touched.lastName && formik.errors.lastName ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
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
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  />
                  <div
                    className={`error ms-2 my-1 ${formik.touched.address && formik.errors.address ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
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
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  />
                  <div
                    className={`error ms-2 my-1 ${formik.touched.street && formik.errors.street ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
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
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  >
                    <option value='' disabled>
                      Select city
                    </option>
                    <option value='Colombo'>Colombo</option>
                    <option value='Ratnapura'>Ratnapura</option>
                    <option value='Kurunegala'>Kurunegala</option>
                    <option value='Galle'>Galle</option>
                    <option value='Jaffna'>Jaffna</option>
                    <option value='Kandy'>Kandy</option>
                  </select>
                  <div
                    className={`error ms-2 my-1 ${formik.touched.city && formik.errors.city ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
                  >
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    className='form-control'
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange('phone')}
                    onBlur={formik.handleBlur('phone')}
                    style={{ fontSize: '16px', fontWeight: 'normal', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                  />
                  <div
                    className={`error ms-2 my-1 ${formik.touched.phone && formik.errors.phone ? 'errors' : ''}`}
                    style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}
                  >
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                </div>
                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center' style={{ marginTop: '40px' }}>
                    <Link to='/home/cart' className='text-dark'style={{ textDecoration: 'none' }}>
                      <AiOutlineArrowLeft className='me-2' />
                      Return to Cart
                    </Link>
                    <Link to='/home/store' className='button' style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', backgroundColor: '#2A3847', transition: 'background-color 0.3s',textDecoration: 'none'  }}>
                      Continue to Shipping
                    </Link>
                    <button className='button' type='submit' style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', backgroundColor: '#2A3847', transition: 'background-color 0.3s' ,textDecoration: 'none' }}>
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='col-5'>
            <div className='border-bottom py-4'>
              {cartState && cartState?.products?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='d-flex gap-10 mb-2 align-items-center'
                  >
                    <div className='w-75 d-flex gap-10'>
                      <div className='w-25 position-relative'>
                        <span
                          style={{ top: '-10px', right: '2px', fontSize: '14px', fontWeight: 'bold' }}
                          className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
                        >
                          {item?.count}
                        </span>
                        <img className='img-fluid' src={item?.product?.images} alt='product' />
                      </div>
                      <div>
                        <h5 className='total-price' style={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>
                          {item?.product?.Title}
                        </h5>
                        <p className='total-price' style={{ fontSize: '15px', fontWeight: 'normal', color: '#666' }}>
                          {item?.color}
                        </p>
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <h5 className='total' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                        Rs.{item?.price * item?.count}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  SubTotal
                </p>
                <p className='total-price' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  Rs.{cartState?.cartTotal ? cartState.cartTotal : '0'}
                </p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  Discounts
                </p>
                <p className='mb-0 total-price' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  Rs.0
                </p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  Shipping
                </p>
                <p className='mb-0 total-price' style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  Rs.350
                </p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total' style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                Total
              </h4>
              <h5 className='total-price' style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                Rs.{cartState?.totalAfterDiscount ? cartState.totalAfterDiscount + 350 : '0'}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
