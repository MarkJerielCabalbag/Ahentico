import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/5">
        <Navbar />
      </div>

      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
