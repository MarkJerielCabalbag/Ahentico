import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>flowStock</h1>
      <Link to="/home">Home</Link>
      <Link to="/distributor">Distributor</Link>
    </>
  );
};

export default Header;
