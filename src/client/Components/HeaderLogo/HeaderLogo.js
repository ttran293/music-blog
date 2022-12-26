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
} from "semantic-ui-react";
import "../HeaderLogo/HeaderLogo.css";
import Jump from "react-reveal/Jump";

const HeaderLogo = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div>
   
      <Jump spy={time}>
        <Header
          className="headerName"
          as="h1"
          textAlign="center"
          // floated="left"
        >
          what songs are you listening to?
        </Header>
      </Jump>

      {/* <Header className="headerDescription" as="h2" textAlign="center">
        Share and discover new songs.
      </Header> */}
    </div>
  );
};

export default HeaderLogo;
