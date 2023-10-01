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
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProducts, getSingleProducts, resetState } from "../features/product/productSlice";

let schema = yup.object().shape({
  productID: yup.string().required("productID is required"),
  Title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  discount: yup.number().required("Discount is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  color: yup.string().required("Color is required"),
  tags: yup.string().required("Tag is required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductID = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  console.log(images,setImages)
  useEffect(()=>{
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  
  useEffect(()=>{
    if(getProductID !== undefined){
      dispatch(getSingleProducts(getProductID))
    }else{
      dispatch(resetState());
    }
  },[dispatch, getProductID]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Product you entered already there.");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  const colors = [];
  colorState.forEach(i => {
    colors.push({
      _id: i._id,
      color: i.title,
    })
  });

  const img = [];
  imgState.forEach(i => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    })
  });

 // useEffect(()=>{
  //  formik.values.images = img;
 // }, [img]);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
      productID: "",
      Title: "",
      category: "",
      brand: "",
      description: "",
      price: "",
      discount: "",
      color: "",
      tags:"",
      images: [],
    },

    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/product-list");
        dispatch(resetState());
      }, 300);
    },
  });

    const [desc, setDesc] = useState();
    const handleDesc = (e) =>{
        setDesc(e);
    };
    console.log(handleDesc)
    console.log(desc)
  return (
    <div>
        <h3 className='mb-4 title text text-center'> {getProductID !== undefined?"Edit " : "Add "} Product...</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Product ID " name="productID" onCh={formik.handleChange("productID")} onBl={formik.handleBlur("productID")} val={formik.values.productID} />
                  <div className='error'>
                    {formik.touched.productID && formik.errors.productID}
                  </div>
                <CustomInput type="text" label="Enter Product Title " name="Title" onCh={formik.handleChange("Title")} onBl={formik.handleBlur("Title")} val={formik.values.Title}/>
                  <div className='error'>
                    {formik.touched.Title && formik.errors.Title}
                  </div>
                <CustomInput type="number" label="Enter Product price " name="price" onCh={formik.handleChange("price")} onBl={formik.handleBlur("price")} val={formik.values.price} />
                  <div className='error'>
                    {formik.touched.price && formik.errors.price}
                  </div>
                <CustomInput type="number" label="Enter Product Discount %  " name="discount" onCh={formik.handleChange("discount")} onBl={formik.handleBlur("discount")} val={formik.values.discount} />
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
                <div className='error'>
                    {formik.touched.tags && formik.errors.tags}
                  </div>
                <select name='tags' className='form-control py-3 mb-3' id='' onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} value={formik.values.tags}>
                    <option value="" disabled>Select tag</option>
                    <option value="Original">Original</option>
                    <option value="Local" >Local</option>
                    <option value="Imported" >Imported</option>
                </select>
                <br/>
                <ReactQuill theme='snow' name="description"  onChange={formik.handleChange("description")}/><br/><br/>
                <div className='imageUploadProduct border-1 p-5 text-center'>
                <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                    {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </section>
                      )}
                </Dropzone>
                </div>
                <div className='showimages d-flex flex-wrap gap-3'>
                  {imgState?.map((i,j)=>{
                    return(
                      <div key={j} className='position-relative'>
                        <button type='button'
                        onClick={()=> dispatch(delImg(i.public_id))}
                        className='btn-close position-absolute'
                        style={{top:"10px", right:"10px"}} />
                       <img src={i.url} alt='' width={200} height={200}/>
                      </div>
                    );
                  })};
                  
                </div>
            <button className='btn btn-success border-0 rounded-3 my-5 productSubmitbtn' type="Submit">{getProductID !== undefined?"Edit" : "Add"} -Product</button>
            </form>
        </div>
    </div>
  )
}

export default Addproduct