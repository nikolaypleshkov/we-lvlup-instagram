import BottomNav from 'layouts/BottomNavigation';
import TopBar from 'layouts/TopBar';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, useLocation } from 'react-router-dom';
import store, { RootState } from 'redux/store'
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import useSwipeableDrawer from 'hooks/useSwipeableDrawer';
const ProtectedRoute = ({children} : {children: JSX.Element}) => {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    return authenticated ? (
    <>
        <TopBar/>
        {children}
        <BottomNav/>
    </>
    ) : 
    <Navigate to="/" replace state={{ from: location }} />
}

export default ProtectedRoute;