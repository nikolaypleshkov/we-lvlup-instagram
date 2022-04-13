import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles.scss";
import "@fontsource/roboto"
import AuthenticatePage from './pages/AuthenticatePage/AuthenticatePage';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
type AppProps = {
  name: string
}
const App = (props: AppProps): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<AuthenticatePage />} />
          <Route path="home" element={<HomePage />}/>
          <Route path="register" element={<SignupPage />}/>
          <Route path="login" element={<LoginPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App