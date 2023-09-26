import React, { useState } from 'react';
import Helmet from 'react-helmet';
import ReactImageZoom from 'react-image-zoom';
import ReactStars from 'react-rating-stars-component';
import Color from '../components/Color'
import { Link } from 'react-router-dom';

const SingleProduct = () => {
    const props = {
        width: 400, 
        height: 250, 
        zoomWidth: 500, 
        img: "data:image/jpeg;base64,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",
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
                            <h3>
                                Engine Oils
                            </h3>
                        </div>
                        <div className='border-bottom'>
                            <p className='price'>
                                Rs.100.00
                            </p>
                            <div className='d-flex align-items-center gap-10'>
                                <ReactStars
                                count={5}
                                size={24}
                                value={4}
                                edit={false}
                                activeColor="#ffd700"
                                />
                            </div>
                        </div>
                        <div className='border-bottom'>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Type : </h3> 
                                <p className='product-data'>gdsgg</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Brand : </h3> 
                                <p className='product-data'>gdsgg</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Categories : </h3> 
                                <p className='product-data'>gdsgg</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Tags : </h3> 
                                <p className='product-data'>gdsgg</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Product ID : </h3> 
                                <p className='product-data'>gdsgg</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Color : </h3> 
                            </div>
                            <Color />
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