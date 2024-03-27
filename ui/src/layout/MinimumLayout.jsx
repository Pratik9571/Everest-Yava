import React from "react";
import { Outlet } from "react-router-dom";

const MinimumLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimumLayout;
