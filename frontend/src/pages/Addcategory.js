import React, { useEffect } from 'react';
import CustomInput from '../components/CustomeInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import { toast } from "react-toastify";
import {createCategory, resetState} from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required("Category name is required"),
});

const Addcategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Category is already there..");
    }
  }, [isSuccess, isError, isLoading, createdCategory]);

  const formik = useFormik({
    initialValues:{
      title: "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list");
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div style={{ backgroundColor: 'white', padding: '50px',borderRadius: '50px' }}>
    <div>
        <h3 className='mb-4 title text-center'> Add Category</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter category" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur("title")} val={formik.values.title}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-3 my-5 productSubmitbtn' type="Submit"> Add-category</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Addcategory;