import React, { Component, useState, useEffect } from "react";
import PostForm from '../Components/PostForm/PostForm';
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import HeaderLogo from "../Components/HeaderLogo/HeaderLogo";
import PostViewUserPage from "../Components/PostViewUserPage/PostViewUserPage";

function PostsByUser() {
  return (
    <>
      <SidebarLink></SidebarLink>
      <PostViewUserPage></PostViewUserPage>
    </>
  );
}

export default PostsByUser;
