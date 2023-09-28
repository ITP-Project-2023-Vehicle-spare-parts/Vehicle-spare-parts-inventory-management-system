import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomeInput';
import * as yup from "yup";
import {useFormik} from "formik";
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories} from '../features/pcategory/pcategorySlice';
import {getColors} from '../features/color/colorSlice';

let schema = yup.object().shape({
  ProductID: yup.string().required("ProductID is required"),
  Ptitle: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  discount: yup.number().required("Discount is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  color: yup.string().required("Color is required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);

  const colors = [];
  colorState.forEach(i => {
    colors.push({
      _id: i._id,
      color: i.title,
    })
  });
  const formik = useFormik({
    initialValues:{
      ProductID: "",
      Ptitle: "",
      description: "",
      price: "",
      discount: "",
      brand: "",
      category: "",
      color: "",
    },

    validationSchema: schema,
    onSubmit: (values) =>{
      alert(JSON.stringify(values));
    },
  });

    const [desc, setDesc] = useState();
    const handleDesc = (e) =>{
        setDesc(e);
    };
  return (
    <div>
        <h3 className='mb-4 title'> Add Product...</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Product ID " name="ProductID" onCh={formik.handleChange("ProductID")} onBl={formik.handleBlur("ProductID")} val={formik.values.ProductID} />
                  <div className='error'>
                    {formik.touched.ProductID && formik.errors.ProductID}
                  </div>
                <CustomInput type="text" label="Enter Product Title " name="Ptitle" onChange={formik.handleChange("Ptitle")} onBlur={formik.handleBlur("Ptitle")} value={formik.values.Ptitle}/>
                  <div className='error'>
                    {formik.touched.Ptitle && formik.errors.Ptitle}
                  </div>
                <CustomInput type="number" label="Enter Product price " name="price" onChange={formik.handleChange("price")} onBlur={formik.handleBlur("price")} value={formik.values.price} />
                  <div className='error'>
                    {formik.touched.price && formik.errors.price}
                  </div>
                <CustomInput type="number" label="Enter Product Discount %  " name="discount" onChange={formik.handleChange("discount")} onBlur={formik.handleBlur("discount")} value={formik.values.discount} />
                  <div className='error'>
                    {formik.touched.discount && formik.errors.discount}
                  </div><br />
                  <div className='error'>
                    {formik.touched.brand && formik.errors.brand}
                  </div>
                <select name='brand' className='form-control py-3 mb-3' id='' onChange={formik.handleChange("brand")} onBlur={formik.handleBlur("brand")} value={formik.values.brand}>
                    <option value="">Select Brand</option>
                    {brandState.map((i, j) =>{
                      return <option key={j} value={i.title}>{i.title}</option>
                    })}
                </select>
                <div className='error'>
                    {formik.touched.category && formik.errors.category}
                  </div>
                <select name='category' className='form-control py-3 mb-3' id='' onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} value={formik.values.category}>
                    <option value="">Select Category</option>
                    {pCategoryState.map((i, j) =>{
                      return <option key={j} value={i.title}>{i.title}</option>
                    })}
                </select>
                <div className='error'>
                    {formik.touched.color && formik.errors.color}
                  </div>
                <select name='color' className='form-control py-3 mb-3' id='' onChange={formik.handleChange("color")} onBlur={formik.handleBlur("color")} value={formik.values.color}>
                    <option value="">Select Color</option>
                    {colorState.map((i, j) =>{
                      return <option key={j} value={i.title}>{i.title}</option>
                    })}
                </select>
                  
                <br/>
                <ReactQuill theme='snow' name="description"  onChange={formik.handleChange("description")}/>
            <button className='btn btn-success border-0 rounded-3 my-5' type="Submit"> Add-Product</button>
            </form>
        </div>
    </div>
  )
}

export default Addproduct