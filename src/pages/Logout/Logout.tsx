import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/feature/userSlice';
import { isAuth } from '../../redux/selectors/user';
import { AppDispatch } from '../../redux/store';

const Logout = () => {
    const dispatch: AppDispatch = useDispatch();
  const authenticated = useSelector(isAuth);
  const location = useLocation();
    useEffect(() => {
            dispatch(logout());
    }, [])
  return (
    <Navigate to='/login' replace state={{ from: location }} />
  )
}

export default Logout