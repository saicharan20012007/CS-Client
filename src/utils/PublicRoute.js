import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { accessToken } = useSelector((store) => store.AuthReducer);

  if (accessToken) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  } else {
    return children;
  }
};

export default PublicRoute;
