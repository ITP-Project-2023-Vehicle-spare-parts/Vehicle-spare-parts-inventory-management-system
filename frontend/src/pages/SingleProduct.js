import React, {useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import ReactImageZoom from 'react-image-zoom';
import ReactStars from 'react-rating-stars-component';
import Color from '../components/Color'
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getSingleProducts} from '../features/product/productSlice';
import {toast} from "react-toastify";
import {addProToCart} from '../features/user/userSlice';

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

  const uploadCart = () => {
    
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
    }
  }

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
        <meta charSet="utf-8"/>
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
              <img src={productState?.images} className='img-fluid' alt="product pic" style={{ width: 400, height: 250 }} />
              </div>
            </div>
            <div className='col-6'>
              <div className='main-product-details'>
                <div className='border-bottom'>
                  <h3>
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
                      value={isNaN(parseInt(productState?.totalrating)) ? 0 : parseInt(productState?.totalrating)}
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
                    <p className='product-data'>{productState?.brand}</p>
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
                  <div className='d-flex gap-10 fle-column mt-2 mb-3'>
                    <h3 className='product-heading'>Color : </h3>
                    <button value={productState?.color}><p>{productState?.color}</p></button>

                  </div>

                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Quantity : </h3>
                    <div className=''>
                      <input
                        type='number'
                        className="form-control"
                        name=''
                        min={1}
                        max={10}
                        style={{width: "70px"}}
                        id=''
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        value={quantity}
                      >
                      </input>
                    </div>
                    <div className='d-flex align-items-center gap-30 ms-5'>
                      <button
                        className="button border-0"
                        /* data-bs-toggle="modal"
                         data-bs-target="#staticBackdrop" */
                        type="button"
                        onClick={() => {
                          uploadCart(productState?._id)
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className='d-flex gap-10 align-items-center gap-15'>
                    <div>
                      <a href='#!'><img src='/images/wish.svg' alt='wishlist' className='fs-5 me-2'/>&nbsp; Add to
                        Wishlist</a>
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
