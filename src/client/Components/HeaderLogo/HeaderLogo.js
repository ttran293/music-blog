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

const HeaderLogo = () => {
  

  return (
    <div>
      <Header as="h1">Music Blog</Header>
    </div>
  );
};

export default HeaderLogo;
