import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bodyMain">
      <Header />
      <div className="scrollable-content">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
