import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "../utils/axiosconfig";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.user?.userCart?.products) || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserFromLocalStorage !== null) {
      dispatch(getUserCart());
    }
  }, [dispatch]);

  // Calculate total count and total amount
  const totalCount = cartState.reduce((total, cartProduct) => {
    return total + cartProduct.count;
  }, 0);

  const totalAmount = cartState.reduce((total, cartProduct) => {
    return total + cartProduct.price * cartProduct.count;
  }, 0);

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
                <a className="text-white" href="+94 912245891">
                  (+94)91 2245891
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
                <div
                  style={{ fontFamily: "cursive", color: "white" }}
                >
                  <h2>Chathura Motors Spares Shop</h2>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <NavLink
                    to="/home/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourites <br /> Wishlist
                    </p>
                  </NavLink>
                </div>
                <div>
                  <h6 className="text-white text-center">
                    {getUserFromLocalStorage
                      ? "Hi, " + getUserFromLocalStorage?.firstname + "!"
                      : "Please login"}
                  </h6>
                  <Link
                    to="/user/profile"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/user.svg" alt="user" />
                    <p className="mb-0">My Account</p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/home/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {totalCount}
                      </span>
                      <p className="mb-0">Rs.{totalAmount.toFixed(2)}</p>
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
                      <NavLink to="/home" className="text-white">
                        Home
                      </NavLink>
                      <NavLink to="/home/store" className="text-white">
                        Store
                      </NavLink>
                      <NavLink to="/home/my-orders" className="text-white">
                        My Orders
                      </NavLink>
                      <NavLink to="/home/contact" className="text-white">
                        Contact
                      </NavLink>
                      <NavLink to="/home/about" className="text-white">
                        Pramotion
                      </NavLink>
                      <NavLink to="/track-order" className="text-white">
                        Track Order
                      </NavLink>
                      <NavLink to="/home/addclaim" className="text-white">
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
