import React, { useEffect, useState } from 'react';
//import Helmet from 'react-helmet';
import ReactStars from 'react-rating-stars-component';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSingleProducts } from '../features/product/productSlice';
import { toast } from "react-toastify";
import { addProToCart } from '../features/user/userSlice';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import axios from 'axios';
import { base_url } from "../../src/utils/base_url";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1)
  const location = useLocation();
  const getProductID = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.Singledproduct);
  const color = productState?.color;

  useEffect(() => {
    dispatch(getSingleProducts(getProductID));
  }, [getProductID, dispatch])

  const uploadCart = async() => {
    
    if (color === null) {
      toast.error("Please choose color")
      return false
    } else {
      const cartData = {
        productId: productState?._id,
        quantity: quantity,
        price: productState?.price,
        color: color,
      };

      const jsonData = JSON.stringify(cartData);
      console.log(jsonData);
      console.log(productState?._id);
      dispatch(addProToCart(cartData));

      const soldAmount = productState?.sold + quantity;

      const soldAdd ={
        productID: productState?.productID,
        Title: productState?.Title,
        category: productState?.category,
        brand: productState?.brand,
        sold: soldAmount,
        description: productState?.description,
        price: productState?.price,
        discount: productState?.discount,
        color: productState?.color,
        tags: productState?.tags,
        images: productState?.images,
      };
      const SoldData = JSON.stringify(soldAdd);
      console.log(SoldData)

      try {
       await axios.put(`${base_url}product/${getProductID}`, soldAdd);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  }

  return (
    <>
      <Meta title="Product Details" />
      <BreadCrumb title="Product Details" />
      <div className='main-product-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div className='main-product-image'>
                <img
                  src={productState?.images}
                  className='img-fluid'
                  alt="product pic"
                  style={{ width: 400, height: 250 }}
                />
              </div>
            </div>
            <div className='col-6'>
              <div className='main-product-details'>
                <div className='border-bottom'>
                  <h3 style={{ fontSize: '26px', color: 'black', fontWeight: 'bold' }}>
                    {productState?.Title}
                  </h3>
                </div>
                <div className='border-bottom'>
                  <p className='price' style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}>
                    Rs.{productState?.price}.00
                  </p>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars
                      count={5}
                      size={24}
                      value={isNaN(parseInt(productState?.totalrating)) ? 0 : parseInt(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className='border-bottom'>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Type : </h3>
                    <p className='product-data' style={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}>{productState?.slug}</p>
                  </div>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Brand : </h3>
                    <p className='product-data' style={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}>{productState?.brand}</p>
                  </div>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Categories : </h3>
                    <p className='product-data'style={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}>{productState?.category}</p>
                  </div>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Tags : </h3>
                    <p className='product-data' style={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}>{productState?.tags}</p>
                  </div>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Product ID : </h3>
                    <p className='product-data' style={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}>{productState?.productID}</p>
                  </div>
                  <div className='d-flex gap-10 fle-column mt-2 mb-3'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Color : </h3>
                    <button
                      value={productState?.color}
                      style={{
                        fontSize: '10px',
                        color: 'transparent',
                        fontWeight: 'bold',
                        backgroundColor: productState?.color,
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 0 5px black',
                      }}
                    >
                      <p>{productState?.color}</p>
                    </button>
                  </div>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading' style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>Quantity : </h3>
                    <div className=''>
                      <input
                        type='number'
                        className="form-control"
                        name=''
                        min={1}
                        max={10}
                        style={{ fontSize: '16px', color: 'black', fontWeight: 'bold', width: "70px" }}
                        id=''
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        value={quantity}
                      >
                      </input>
                    </div>
                    <div className='d-flex align-items-center gap-30 ms-5'>
                      <button
                        className="button border-0"
                        type="button"
                        onClick={() => {
                          uploadCart(productState?._id)
                        }}
                        style={{
                          fontSize: '18px',
                          color: 'white',
                          fontWeight: 'bold',
                          backgroundColor: '#2A3847',
                          textDecoration: 'none'
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className='d-flex gap-10 align-items-center gap-15'>
                    <div>
                      <a href='#!' style={{ fontSize: '16px', color: 'black', fontWeight: 'bold' }}>
                        <img src='/images/wish.svg' alt='wishlist' className='fs-5 me-2' />&nbsp; Add to Wishlist
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
