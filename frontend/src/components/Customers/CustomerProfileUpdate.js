import React from 'react';
import Container from '../components/Container';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from "../features/user/userSlice";
import * as yup from 'yup';
    
    const profileSchema = yup.object({
      firstname: yup.string().required("First name is required"),
      lastname: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Email should be valid")
        .required("Email address is required"),
      mobile: yup.string().required("Mobile number is required"),
      nic: yup.string().required("NIC is required"),
    });
    
    const CustomerProfile = () => {
      const dispatch = useDispatch();
      const userState = useSelector((state) => state.auth.user);
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: userState?.firstname,
          lastname: userState?.lastname,
          email: userState?.email,
          mobile: userState?.mobile,
          nic: userState?.nic,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
          // Dispatch an action or perform any other action here
          dispatch(updateProfile(values))
        },
      });
    
      return (
        <>
          <Container class1="cart-wrapper home-wrapper home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="example1" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      id="example1"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example2" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      id="example2"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example3" className="form-label">
                      Mobile
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      className="form-control"
                      id="example3"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example2" className="form-label">
                      NIC
                    </label>
                    <input
                      type="text"
                      name="nic"
                      className="form-control"
                      id="example4"
                      value={formik.values.nic}
                      onChange={formik.handleChange("nic")}
                      onBlur={formik.handleBlur("nic")}
                    />
                    <div className="error">
                      {formik.touched.nic && formik.errors.nic}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </>
      );
    };
    
    export default CustomerProfile;
    