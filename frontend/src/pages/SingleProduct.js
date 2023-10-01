import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import ReactImageZoom from 'react-image-zoom';
import ReactStars from 'react-rating-stars-component';
//import Color from '../components/Color'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSingleProducts } from '../features/product/productSlice';

const SingleProduct = () => {
    const location = useLocation();
    const getProductID = location.pathname.split("/")[4];
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.Singledproduct);
    useEffect(()=>{
        dispatch(getSingleProducts(getProductID));
    })
        const props = {
        width: 400, 
        height: 250, 
        zoomWidth: 500, 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabWOctkyajxAVbHV4UN0AaUaQPUkMmyv_LW12Jq2t&s",
    };
    
    const [orderedProduct, setoderedProduct] = useState(true);

    console.log(orderedProduct)
    console.log(setoderedProduct)
  
    return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Product Info</title>
    </Helmet>
    <div className='home-wrapper-2'>
      <center><h4><br/>.....Details.....<br/><br/></h4></center>
    </div>

    <div className='main-product-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-6'>
                    <div className='main-product-image'>
                        <div><ReactImageZoom {...props} /></div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='main-product-details'>
                        <div className='border-bottom'>
                            <h3 style={{ color: 'blue' }}>
                                {productState?.Title}
                            </h3>
                        </div>
                        <div className='border-bottom'>
                            <p className='price'>
                            Rs.{productState?.price}.00
                            </p>
                            <div className='d-flex align-items-center gap-10'>
                                <ReactStars
                                count={5}
                                size={24}
                                value={productState?.totalrating.toString()}
                                edit={false}
                                activeColor="#ffd700"
                                />
                            </div>
                        </div>
                        <div className='border-bottom'>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Type : </h3> 
                                <p className='product-data'>{productState?.slug}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Brand : </h3> 
                                <p className='product-data' style={{ color: 'red' }}>{productState?.brand}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Categories : </h3> 
                                <p className='product-data'>{productState?.category}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Tags : </h3> 
                                <p className='product-data'>{productState?.tags}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Product ID : </h3> 
                                <p className='product-data'>{productState?.productID}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Color : </h3> 
                            </div>
                            {productState?.color}
                            {/*<Color />*/}
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Quantity : </h3> 
                                <div className=''>
                                    <input type='number' className="form-control" name='' min={1} max={100} style={{width:"70px"}} id=''></input>
                                </div>
                                <Link className='button'>Add To Cart</Link>
                            </div>
                            <div className='d-flex gap-10 align-items-center gap-15'>
                                <div>
                                 <a href='#!'><img src='/images/wish.svg' alt='wishlist' className='fs-5 me-2' />&nbsp; Add to Wishlist</a>
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