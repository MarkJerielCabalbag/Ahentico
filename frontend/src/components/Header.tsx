import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl">flowStock</h1>
      <div className="flex gap-2">
        <Link to={"/flowStock"}>Home</Link>
        <Link to={"/flowStock/distributor"}>Distributor</Link>
      </div>
    </div>
  );
};

export default Header;
