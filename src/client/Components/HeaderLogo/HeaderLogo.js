import React from "react";
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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import smiley from "../../images/smile.png"
const HeaderLogo = () => {
  

  return (
    <div>
      <Header className="headerName" as="h1" textAlign="left">
        What songs are you listening to?
        <Image src={smiley} className="smiley"/>
      </Header>
      {/* <Header className="headerDescription" as="h2" textAlign="center">
        Share and discover new songs.
      </Header> */}
    </div>
  );
};

export default HeaderLogo;
