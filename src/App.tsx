import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import "@fontsource/roboto"
import AuthenticatePage from "./pages/AuthenticatePage/AuthenticatePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";


const theme = createTheme();
const App = (): JSX.Element => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/">
          <Route index element={<AuthenticatePage />} />
          <Route path="home" element={<HomePage />}/>
          <Route path="register" element={<RegisterPage />}/>
          <Route path="login" element={<LoginPage />}/>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App