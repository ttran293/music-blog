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
import { AttentionSeeker, Slide } from "react-awesome-reveal";
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
      
      <Slide direction="down" key={time} triggerOnce={false}>
        <AttentionSeeker effect="pulse" key={time}>
          <Header
            className="headerName"
            as="h1"
            textAlign="center"
          >
           What songs are you listening to?
          </Header>
        </AttentionSeeker>
      </Slide>
    </>
  );
};

export default HeaderLogo;
