import React from 'react';
import Helmet from 'react-helmet';

const Wishlist = () => {
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Wishlist</title>
    </Helmet>
    <div className='home-wrapper-2'>
      <center><h4><br/>.....Wishlist.....<br/><br/></h4></center>
    </div>
    <div className='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-3 py-3'>
                    <div className='wishlist-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                        <div className='wishlist-card-image'>
                            <img src='images/oilCan.jpg' className='img-fluid w-100' alt='oil'></img>
                        </div>
                        <div className='bg-white px-2 py-3'>
                        <h5 className='title'>Engine oils for CT100</h5>
                        <h6 className='price'>Rs.750.00</h6>
                        </div>
                    </div>
                </div>
                <div className='col-3 py-3'>
                    <div className='wishlist-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                        <div className='wishlist-card-image'>
                            <img src='images/oilCan.jpg' className='img-fluid w-100' alt='oil'></img>
                        </div>
                        <div className='bg-white px-2 py-3'>
                        <h5 className='title'>Engine oils for CT100</h5>
                        <h6 className='price'>Rs.750.00</h6>
                        </div>
                    </div>
                </div>
                <div className='col-3 py-3'>
                    <div className='wishlist-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                        <div className='wishlist-card-image'>
                            <img src='images/oilCan.jpg' className='img-fluid w-100' alt='oil'></img>
                        </div>
                        <div className='bg-white px-2 py-3'>
                        <h5 className='title'>Engine oils for CT100</h5>
                        <h6 className='price'>Rs.750.00</h6>
                        </div>
                    </div>
                </div>
                <div className='col-3 py-3'>
                    <div className='wishlist-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                        <div className='wishlist-card-image'>
                            <img src='images/oilCan.jpg' className='img-fluid w-100' alt='oil'></img>
                        </div>
                        <div className='bg-white px-2 py-3'>
                        <h5 className='title'>Engine oils for CT100</h5>
                        <h6 className='price'>Rs.750.00</h6>
                        </div>
                    </div>
                </div>
                <div className='col-3 py-3'>
                    <div className='wishlist-card position-relative'>
                        <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                        <div className='wishlist-card-image'>
                            <img src='images/oilCan.jpg' className='img-fluid w-100' alt='oil'></img>
                        </div>
                        <div className='bg-white px-2 py-3'>
                        <h5 className='title'>Engine oils for CT100</h5>
                        <h6 className='price'>Rs.750.00</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Wishlist