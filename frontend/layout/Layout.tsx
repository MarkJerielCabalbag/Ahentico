import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen w-screen lg:flex">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <Header />
        <div className="w-full h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
