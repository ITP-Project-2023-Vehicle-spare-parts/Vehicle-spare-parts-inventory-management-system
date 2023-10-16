import React from 'react'
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

const Home = () => {
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Chathura Spares - Home</title>
    </Helmet>
    <section className='home-wrapper-1 py-5'>
      <div className='container-xxl '>
        <div className='row'>
          <div className='col-6'>
            <div className='main-banner position-relative p-3'>
              <img src="images/engine.jpg" className='img-fluid rounded-3' alt ="main banner" />
              <div className='main-banner-content position-absolute'>
                <h4>Every Engine spares</h4>
                <h5>CT100, pulsar, etc...</h5>
                <p>with supper discounts</p>
                <NavLink className='button' to="/home/store">Order now</NavLink>
              </div> 
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex flex-wrap justify-content-between align-items-center'>
              <div className='small-banner position-relative p-1'>
              <img src="images/spare 2.jpg" className='img-fluid rounded-3 p-1' alt ="small banner" />
                <div className='small-banner-content position-absolute'>
               </div>
               <img src="images/spare 6.jpg" className='img-fluid rounded-3 p-1' alt ="small banner" />
                <div className='small-banner-content position-absolute'>
               </div>
              </div> 
              <div className='small-banner position-relative p-1'>
              <img src="images/spare 5.jpg" className='img-fluid rounded-3 p-1 !important' alt ="small banner" />
                <div className='small-banner-content position-absolute'>
               </div>
               <img src="images/spare 3.jpg" className='img-fluid rounded-3 p-1' alt ="small banner" />
                <div className='small-banner-content position-absolute'>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='home-wrapper-2 py-5' >
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-12'>
            <div className='services d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/service.png" alt="Services" />
                <div>
                  <h6><b>delivery</b></h6>
                  <p>For all orders</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/service-02.png" alt="Services" />
                <div>
                  <h6><b>Offers</b></h6>
                  <p>Save up to 50% off</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/service-03.png" alt="Services" />
                <div>
                  <h6><b>Support 24/7</b></h6>
                  <p>Shop with an expert</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/cupons.png" alt="Services" />
                <div>
                  <h6><b>Coupons</b></h6>
                  <p>Get more discount collecting Coupons</p>
                </div>
              </div>
            </div><br/>
            <div className='services d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/service-04.png" alt="Services" />
                <div>
                  <h6><b>Affordable prices</b></h6>
                  <p>Get Factory direct prices</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/service-05.png" alt="Services" />
                <div>
                  <h6><b>Secure Payments</b></h6>
                  <p>100% protected payments</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/warranty.png" alt="Services" />
                <div>
                  <h6><b>Warranty claims</b></h6>
                  <p>Warranty for battries</p>
                </div>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <img src="images/loyalty.png" alt="Services" />
                <div>
                  <h6><b>Friendly services</b></h6>
                  <p>Friendly and Loyal staff for your services anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='home-wrapper-3 py-5' >
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-12'>
            <div className='categories d-flex justify-content-between align-items-center'>
              <div>
                <img src="images/ct100.png" alt="" />
              </div>
              <div>
                <img src="images/pulsar.png" alt="" />
              </div>
              <div>
                <img src="images/dominar.png" alt="" />
              </div>
              <div>
                <img src="images/avenger.png" alt="" />
              </div>
            </div>
            <div className='categories d-flex justify-content-between align-items-center'>
              <div>
                <img src="images/xpulse.jpg" alt="" />
              </div>
              <div>
                <img src="images/hunk.jpg" alt="" />
              </div>
              <div>
                <img src="images/passion.jpg" alt="" />
              </div>
              <div>
                <img src="images/delux.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;