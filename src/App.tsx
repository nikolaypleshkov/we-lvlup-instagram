import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./styles.scss";
import "@fontsource/roboto"
import AuthenticatePage from "./pages/AuthenticatePage/AuthenticatePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import ProtectedRoute from "routes/ProtectedRoute";
import PrivateRoutes from "routes/PrivateRoutes";
import UserPage from "pages/UserPage/UserPage";
import TopBar from "layouts/TopBar";
import { logout } from "redux/actions/authActions";
import UserSettingPage from "pages/UserSettingPage/UserSettingPage";
import UploadPage from "pages/UploadPage/UploadPage";
import PostPage from "pages/PostPage/PostPage";

const theme = createTheme();
const App = (): JSX.Element => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(location.pathname === "/logout"){
      dispatch(logout());
    }
    console.log(location.pathname);
  }, [location, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={
          <PrivateRoutes>
            <AuthenticatePage />
          </PrivateRoutes>
        }>
        </Route>
        <Route path="/login" element={
          <PrivateRoutes>
            <LoginPage />
          </PrivateRoutes>
        }>
        </Route>
        <Route path="/register" element={
          <PrivateRoutes>
            <RegisterPage />
          </PrivateRoutes>
        }>
        </Route>
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        } />
        <Route path="/logout" element={
          <Navigate to="/" replace state={{ from: location }} />
        } />
        <Route path="/user-settings" element={
          <UserSettingPage />
        } />
        <Route path="/add-post" element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        } />
        <Route path="/post/:id" element={<PostPage />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App