import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from 'redux/store'

const PrivateRoutes = ({ children} : {children: JSX.Element }) => {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
  return !authenticated ? children : <Navigate to="/home" replace state={{ from: location }} />
}

export default PrivateRoutes