import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../Components/Global";

const BasicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default BasicLayout;
