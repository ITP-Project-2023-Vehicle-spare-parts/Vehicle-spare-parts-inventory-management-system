import React, { useEffect } from 'react';
import CustomInput from '../components/CustomeInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import { toast } from "react-toastify";
import { createColor, resetState } from '../features/color/colorSlice';

let schema = yup.object().shape({
  title: yup.string().required("Color is required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isError) {
      toast.error("Color you entered already there..");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    initialValues:{
      title: "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list");
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div style={{ backgroundColor: 'white', padding: '50px',borderRadius: '50px' }}>
    <div>
        <h3 className='mb-4 title text-center'> Add Color</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
                <CustomInput type='text' id="color" label="Enter color" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur("title")} val={formik.values.title}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-3 my-5 productSubmitbtn' type="Submit"> Add-Color</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Addcolor;