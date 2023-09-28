import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts) || [];
  const [total, setTotal] = useState(null);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState.length; index++) {
      sum += Number(cartState[index].quantity) * Number(cartState[index].price);
    }
    setTotal(sum);
  }, [cartState]);

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Since 2005</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:<a className="text-white" href="+94 912245891">(+94)91 2245891</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <p>
                <NavLink to="/">
                  <img src="/images/CMLogo.png" alt="CMlogo" height="90" />
                </NavLink>
              </p>
            </div>
            <div className="col-6">
              <div class="input-group">
                <input type="text" class="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2" />
                <span class="input-group-text p-3" id="basic-addon2"><BsSearch className="fs-6" /></span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <NavLink to="/home/wishlist" className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">Favourites <br /> wishlist</p>
                  </NavLink>
                </div>
                <div>
                  <Link to="/" className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/user.svg" alt="user" />
                    <p className="mb-0">Log in <br /> My Account</p>
                  </Link>
                </div>
                <div>
                  <Link to="/home/cart" className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cartState?.length ? cartState?.length : 0}</span>
                      <p className="mb-0">Rs.{total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <center>
              <div className="col-8">
                <div className="menu-bottom d-flex align-items-center">
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-15 ">
                      <NavLink to="/home" className="text-white">Home</NavLink>
                      <NavLink to="/home/store" className="text-white">Store</NavLink>
                      <NavLink to="/home/my-orders" className="text-white">My Orders</NavLink>
                      <NavLink to="/home/contact" className="text-white">Contact</NavLink>
                      <NavLink to="/home/about" className="text-white">About</NavLink>
                      <NavLink to="/home/about" className="text-white">News</NavLink>
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
