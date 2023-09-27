import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link, useLocation} from 'react-router-dom'

const ProductCard = (props) => {
    const {grid} = props;
    let location = useLocation();
    
  return (
    <div className={`${location.pathname === "/home/store" ? `gr-${grid}` : "col-3"}`}>
        <div className='product-card position-relative'>
            <div className='wishlist-icon position-absolute'>
                <Link>
                    <img src='/images/wish.svg' alt='wishlist' />
                </Link>
            </div>
            <div className='product-image'>
                <img src='/images/oilcan.jpg' className='img-fluid' alt="product pic" />
                <img src='/images/spare 5.1.jpg' className='img-fluid' alt="product pic" />
            </div>
            <div className='product-details'>
                <h6 className='brand'>Bajaj</h6>
                <h5 className='product-title'>
                    Engine oils for CT100.
                </h5>
                <ReactStars count={5} size={24} value='3' edit={false} activeColor={"#ffd700"} />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                Motor oil, engine oil, or engine lubricant is any one of various substances used for the lubrication of internal combustion engines. They typically consist of base oils enhanced with various additives, particularly antiwear additives, detergents, dispersants, and, for multi-grade oils, viscosity index improvers
                </p>
                <p className='price'>Rs.750.00</p>
            </div>
            <div className='action-bar position-absolute'>
                <div className='d-flex flex-column gap-15'>
                    <Link to="product/:id">
                        <img src='/images/view.svg' alt='view' />
                    </Link>
                    <Link>
                        <img src='/images/add-cart.svg' alt='addcart' />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;