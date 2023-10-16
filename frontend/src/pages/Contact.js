import React from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from '../components/Container';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';

const contactSchema = yup.object({
  name: yup.string().matches(/^[A-Za-z\s]+$/, 'Name should contain only letters and spaces').required("Name is required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is required"),
  mobile: yup.string().matches(/^[0-9]+$/, 'Mobile number should contain only numbers').default('').nullable().required("Mobile number is required"),
  comment: yup.string().nullable().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      comment: ''
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery({ name: values.name, email: values.email, mobile: values.mobile, comment: values.comment }))
      formik.resetForm(); 
    },
  });

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1='contact-wrapper py-5 home-wrapper-2'>

        <div className='row'>
          <div className='col-12'>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d506240.36164702656!2d80.00710813281246!3d7.574669199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae331839cdcbc15%3A0xf1564ca5ad0d8b67!2sChathura%20Morters!5e0!3m2!1sen!2slk!4v1693541757870!5m2!1sen!2slk"
              width="600"
              height="450"
              className='border-0 w-100'
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className='col-12 mt-5'>
            <div className='contact-inner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title mb-4' style={{ fontSize: '30px' , fontWeight: 'bold'}}>Contact</h3>
                <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Name'
                      name='name'
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur('name')}
                      value={formik.values.name}
                      style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                    />
                    <div className='errors' style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}>
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur('email')}
                      value={formik.values.email}
                      style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                    />
                    <div className='errors' style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}>
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Mobile Number'
                      name='mobile'
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur('mobile')}
                      value={formik.values.mobile}
                      style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                    />
                    <div className='errors' style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}>
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      id=''
                      className='w-100 form-control'
                      cols='30'
                      rows='4'
                      placeholder='Comments'
                      name='comment'
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur('comment')}
                      value={formik.values.comment}
                      style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)' }}
                    >
                    </textarea>
                    <div className='errors' style={{ fontSize: '14px', fontWeight: 'bold', color: 'red' }}>
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className='button border-0 button-color button-oval' style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', backgroundColor: '#2A3847', boxShadow: '0 0 5px rgba(0, 0, 255, 0.2)', transition: 'background-color 0.3s' }}>Submit</button>
                  </div>
                </form>
              </div>
              <div style={{ marginTop: '100px', marginLeft: '100px' }}>
                <h3 className='contact-title mb-4' style={{ fontSize: '30px' , fontWeight: 'bold'}}>Get in touch with us</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineHome className='fs-5' />
                      <address className='mb-0'style={{ fontSize: '16px', fontWeight: 'normal', color: '#333' }}>
                        No.65, Opposite People’s Bank, Dambulla Road, Ibbagamuwa.
                      </address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiPhoneCall className='fs-5' />
                      <a href='tel:+94123456789' style={{ fontSize: '16px', fontWeight: 'normal', color: '#333',textDecoration: 'none' }}>+94 123456789</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineMail className='fs-5' />
                      <a href='mailto:chathu@gmail.com' style={{ fontSize: '16px', fontWeight: 'normal', color: '#333',textDecoration: 'none' }}>chathu@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiInfoCircle className='fs-5' />
                      <p className='mb-0' style={{ fontSize: '16px', fontWeight: 'normal', color: '#333' }}>Monday - Saturday 9 AM - 7 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </>
  );
};

export default Contact;
