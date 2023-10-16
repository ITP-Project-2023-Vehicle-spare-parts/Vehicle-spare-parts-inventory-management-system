import React, { useEffect } from 'react';
import CustomInput from '../components/CustomeInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import { createBrand, resetState } from '../features/brand/brandSlice';
import { toast } from "react-toastify";

let schema = yup.object().shape({
  title: yup.string().required("Brand name is required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isError) {
      toast.error("Brand Name is already there..");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const formik = useFormik({
    initialValues:{
      title: "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/brand-list");
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div style={{ backgroundColor: 'white', padding: '50px',borderRadius: '50px' }}>
    <div>
        <h3 className='mb-4 title text-center'> Add Brand</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter brand" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur("title")} val={formik.values.title}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-3 my-5 productSubmitbtn' type="Submit"> Add-Brand</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Addbrand;