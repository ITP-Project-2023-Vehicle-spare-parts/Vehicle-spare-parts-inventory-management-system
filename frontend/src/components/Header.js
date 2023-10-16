import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "../utils/axiosconfig";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.user?.userCart?.products) || [];
  const navigate = useNavigate();
  console.log(navigate)

  useEffect(() => {
    if (getUserFromLocalStorage !== null) {
      dispatch(getUserCart());
    }
  }, [dispatch]);

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
                Hotline:
                <a className="text-white" href="+94 912245891" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
                  (+94) 91 2245891
                </a>
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
              <div className="input-group">
                <div style={{ fontFamily: "cursive", fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  <h2>Chathura Motors Spares Shop</h2>
                </div>
              </div>
            </div>
            <div className="col-4">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
              <div>
                <NavLink
                  to="/home/wishlist"
                  className="d-flex align-items-center gap-15 text-white"
                  style={{ fontSize: '18px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}
                >
                  <img src="/images/wishlist.svg" alt="wishlist" />
                  <p className="mb-0">Favourites <br /> Wishlist</p>
                </NavLink>
              </div>
              <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>  
                <Link
                  to="/user/profile"
                  className="d-flex align-items-center gap-15 text-white"
                  style={{ fontSize: '18px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}
                >
                  <img src="/images/user.svg" alt="user" />
                  <h6 className="text-white text-center" style={{ fontSize: '18px', fontWeight: 'normal', color: '#333', marginLeft: '5px' }}>
                  {getUserFromLocalStorage
                    ? "Hi, " + getUserFromLocalStorage?.firstname +  "!"
                    : "Please login"}
                    <p className="mb-0" style={{ whiteSpace: 'nowrap' }}>My Account</p>
                </h6>
                </Link>
              </div>

              <div style={{ marginLeft: '20px' }}>
                <Link
                  to="/home/cart"
                  className="d-flex align-items-center gap-15 text-white"
                  style={{ fontSize: '18px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}
                >
                  <img src="/images/cart.svg" alt="cart" />
                  <div className="d-flex flex-column gap-15">
                    <span className="badge bg-white text-dark">
                      {cartState.reduce((total, cartProduct) => total + cartProduct.count, 0)}
                    </span>
                    <p className="mb-0">Rs.{cartState.reduce((total, cartProduct) => total + cartProduct.price * cartProduct.count, 0).toFixed(2)}</p>
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
                      <NavLink to="/home" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        Home
                      </NavLink><b className="headerdash">|</b>
                      <NavLink to="/home/store" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        Store
                      </NavLink><b className="headerdash">|</b>
                      <NavLink to="/home/my-orders" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        My Orders
                      </NavLink><b className="headerdash">|</b>
                      <NavLink to="/home/contact" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        Contact
                      </NavLink><b className="headerdash">|</b>
                      <NavLink to="/track-order" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        Track Order
                      </NavLink><b className="headerdash">|</b>
                      <NavLink to="/home/addclaim" className="text-white px-0" style={{ fontSize: '20px', fontWeight: 'normal', color: '#333', textDecoration: 'none' }}>
                        Service
                      </NavLink>
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
