import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <button className="outline-none border-node bg-blue-300 text-[#272727]  p-4 m-2 rounded-xl text-xl">
          <Link to="/customers"> customers</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
