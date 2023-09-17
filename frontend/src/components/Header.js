import React from 'react'
import {NavLink, Link} from "react-router-dom";
import {BsSearch} from 'react-icons/bs';
const Header = () => {
  return (
    <>
    <header className = 'header-top-strip py-3'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-6'>
            <p className='text-white mb-0'>Since 2005</p>
            </div>
          <div className='col-6'>
            <p className='text-end text-white mb-0'>Hotline:<a className='text-white' href="+94 912245891">(+94)91 2245891</a></p>
          </div>
        </div>
      </div>
    </header>
    <header className='header-upper py-3'>
      <div className='container-xxl'>
        <div className='row align-items-center'>
          <div className='col-2'>
          <p>
            <NavLink to="/">
              <img src="/images/CMLogo.png" alt="CMlogo" height="90"/>
            </NavLink>
          </p>
          </div>
          <div className='col-6'>
            <div class="input-group">
              <input type="text" class="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2" />
              <span class="input-group-text p-3" id="basic-addon2"><BsSearch className='fs-6'/></span>
            </div>
          </div>
          <div className='col-4'>
            <div className='header-upper-links d-flex align-items-center justify-content-between'>
              <div>
                <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='/images/wishlist.svg' alt="wishlist"/>
                <p className='mb-0'>Favourites <br /> wishlist</p>
                </Link>
              </div>
              <div>
              <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='/images/user.svg' alt="user"/>
                <p className='mb-0'>Log in <br /> My Account</p>
                </Link>
              </div>
              <div>
              <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='/images/cart.svg' alt="cart"/>
                <div className='d-flex flex-column gap-10'>
                  <span className='badge bg-white text-dark'>0</span>
                  <p className='mb-0'>$0.0</p>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <header className='header-bottom py-3'>
      <div className='container-xxl'>
        <div className='row'>
          <center>
          <div className='col-8'>
            <div className='menu-bottom d-flex align-items-center'>
              <div className='menu-links'>
                <div className='d-flex align-items-center gap-15 '>
                  <NavLink to="/" className="px-5">Home</NavLink>
                  <NavLink to="/store" className="px-5">Store</NavLink>
                  <NavLink to="/contact" className="px-5">Contact</NavLink>
                  <NavLink to="/about" className="px-5">About</NavLink>
                  <NavLink to="/about" className="px-5">News</NavLink>
                </div>
              </div>
            </div>
          </div>
          </center>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;