import React, { Component, useEffect, useState, useContext } from "react";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
  Dropdown,
} from "semantic-ui-react";
import "../HeaderLogo/HeaderLogo.css";
import Pulse from "react-reveal/Pulse";
import Slide from "react-reveal/Slide";
import { Link } from "react-router-dom";
const HeaderLogo = () => {
  const [time, setTime] = useState(Date.now());
  const [activeItem, setActiveItem] = useState('home');


  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      
      <Slide top>
        <Pulse spy={time}>
          <Header
            className="headerName"
            as="h1"
            textAlign="center"
            // floated="left"
          >
           What songs are you listening to?
          </Header>
        </Pulse>
      </Slide>
    </>
  );
};

export default HeaderLogo;
