import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* fixed w-screen */}
      
      <div className="flex justify-around p-2 align-middle text-[#272727] bg-blue-100">
        <div className="font-bold font-mono text-4xl text-[#272727] ">
          {/* <img src={logo} alt="" className="w-20" /> */}
          <h1>
            <NavLink to="/">Home</NavLink>
          </h1>
        </div>

        {/* align-middle text-center space-x-7*/}
        <ul className="sm:flex align-middle space-x-7 pt-2 hidden ">
          <li>
            <NavLink to="/transaction">Transaction</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
