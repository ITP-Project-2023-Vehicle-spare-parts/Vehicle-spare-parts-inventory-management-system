import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link, useLocation} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {addToWishlist} from '../features/product/productSlice'
import {useNavigate} from 'react-router-dom';

const ProductCard = (props) => {
  const {grid, data} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(data)
  let location = useLocation();

  const addWishlist = (id) => {
    dispatch(addToWishlist(id));
  }
  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div key={index} className={`${location.pathname === "/home/store" ? `gr-${grid}` : "col-3"}`}>
              <div className='product-card position-relative'>
                <div className='wishlist-icon position-absolute'>
                  <button className='border-0 bg-transparent' onClick={(e) => {
                    addWishlist(item?._id)
                  }}>
                    <img src='/images/wish.svg' alt='wishlist'/>
                  </button>
                </div>
                <div className='product-image'>
                  <img src='/images/oilcan.jpg' className='img-fluid' alt="product pic"/>
                  <img src='/images/spare 5.1.jpg' className='img-fluid' alt="product pic"/>
                </div>
                <div className='product-details'>
                  <h6 className='brand'>{item?.brand}</h6>
                  <h5 className='product-title'>
                    {item?.Title}
                  </h5>
                  <ReactStars count={5} size={24} value={parseInt(item?.totalrating)} edit={false}
                              activeColor={"#ffd700"}/>
                  <br/><p className={`description ${grid === 12 ? "d-block" : "d-none"}`} style={{fontSize: '17px'}}
                          dangerouslySetInnerHTML={{__html: item?.description}}>
                </p>
                  <p className='price'>Rs.{item?.price}.00</p>
                </div>
                <div className='action-bar position-absolute'>
                  <div className='d-flex flex-column gap-15'>
                    <button className='border-0 bg-transparent' onClick={() => {
                      navigate("product/" + item?._id)
                    }}>
                      <img src='/images/view.svg' alt='view'/>
                    </button>
                    <Link>
                      <img src='/images/add-cart.svg' alt='addcart'/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }

    </>
  );
};

export default ProductCard;
