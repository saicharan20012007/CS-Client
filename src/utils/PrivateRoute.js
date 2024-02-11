import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken.geometry");

  console.log(accessToken);

  if (accessToken) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
};

export default PrivateRoute;
