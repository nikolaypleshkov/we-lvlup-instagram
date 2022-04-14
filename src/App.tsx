import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import "@fontsource/roboto"
import AuthenticatePage from "./pages/AuthenticatePage/AuthenticatePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<AuthenticatePage />} />
          <Route path="home" element={<HomePage />}/>
          <Route path="register" element={<RegisterPage />}/>
          <Route path="login" element={<LoginPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App