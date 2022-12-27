//React
import React, { Component, useState , useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Switch,
} from "react-router-dom";

//CSS
import './app.css';
import "semantic-ui-css/semantic.min.css";

//Context 
import { AuthContext } from "../client/context/auth-context";
import { useAuth } from "../client/hooks/auth-hook";

// Pages
import Homepage from "../client/pages/Home";
import Aboutpage from "../client/pages/About";
import Postpage from "../client/pages/Post";
import Loginpage from "../client/pages/Login";
import Signuppage from "../client/pages/Signup";
import Notfound from "../client/pages/Notfound";
import PostsByUser from "../client/pages/PostsByUser";

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
          <Route exact={true} path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/post" element={token ? <Postpage /> : <Loginpage />} />
          <Route path="/post/user/:id" element={<PostsByUser />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
  
export default App;