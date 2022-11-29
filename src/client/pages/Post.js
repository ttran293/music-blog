import React, { Component, useState, useEffect } from "react";
// import "./app.css";
// import Logo from "./Logo.png";
// import {
//   Image,
// } from "semantic-ui-react";
import PostForm from './../Components/PostForm/PostForm';
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import HeaderLogo from "../Components/HeaderLogo/HeaderLogo";
function Post() {
  return (
    <>
      {/* <HeaderLogo></HeaderLogo> */}
      <SidebarLink></SidebarLink>
      <PostForm></PostForm>
    </>
  );
}

export default Post;
