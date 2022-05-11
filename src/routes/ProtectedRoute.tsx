import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, useLocation } from 'react-router-dom';
import store, { RootState } from 'redux/store'
const ProtectedRoute = ({children} : {children: JSX.Element}) => {
    const { authenticated, initAuth } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    useEffect(() => {
        console.log(initAuth);
        
    }, [])
    return authenticated ? (
    <>
        {
            initAuth ?  <Navigate to="/user-settings" replace state={{ from: location }} /> : ""
        }
        {children}
    </>
    ) : 
    <Navigate to="/" replace state={{ from: location }} />
}

export default ProtectedRoute;