import React, { Component, useState, useEffect } from "react";
import "../app.css";
// import Logo from "./Logo.png";
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import GridPosts from "./../Components/GridPosts/GridPosts";
import HeaderLogo from "../Components/HeaderLogo/HeaderLogo";



function Home() {
  return (
    <>
      <SidebarLink></SidebarLink>
      <HeaderLogo></HeaderLogo>

      <GridPosts></GridPosts>
    </>
  );
}

export default Home;
