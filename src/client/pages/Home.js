import React, { Component, useState, useEffect } from "react";
import "../app.css";
// import Logo from "./Logo.png";
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import GridPosts from "./../Components/GridPosts/GridPosts";
import HeaderLogo from "../Components/HeaderLogo/HeaderLogo";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "semantic-ui-react";



function Home() {
  return (
    <>
      <HeaderLogo></HeaderLogo>
      <SidebarLink></SidebarLink>
      <GridPosts></GridPosts>
    </>
  );
}

export default Home;
