import React, { Component, useState , useEffect} from 'react';
import './app.css';
import ReactDOM from "react-dom";
import Homepage from "../client/pages/Home";
import Aboutpage from "../client/pages/About";
import Postpage from "../client/pages/Post";
import Loginpage from "../client/pages/Login";
import Signuppage from "../client/pages/Signup";
import Notfound from "../client/pages/Notfound";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Switch,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { AuthContext } from "../client/context/auth-context";
import { useAuth } from "../client/hooks/auth-hook";






const App = () => {
  const { token, login, logout, userId, userName } = useAuth();
 
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/post" element={token ? <Postpage /> : <Loginpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
  
export default App;