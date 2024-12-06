import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="p-2">
      <p className="text-2xl ">FlowStock</p>
      <div className="flex flex-col gap-2 my-5">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/distributor"}>Distributors</Link>
      </div>
    </div>
  );
};

export default Sidebar;
