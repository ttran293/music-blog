import React, { Component, useState, useEffect, useContext } from "react";
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
import "./SidebarLink.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Slide from "react-reveal/Slide";

const SidebarLink = () => {
  const [visible, setVisible] = React.useState(false);

  const auth = useContext(AuthContext);

  let profileUrl;
  if (auth.isLoggedIn)
    profileUrl = "/post/user/" + auth.userId;

  return (
    <div>
      <Link className="" to="/">
        <Icon
          name="home"
          color="blue"
          className="backBtn"
          loading
          size="big"
        ></Icon>
      </Link>

      <Icon
        name="hand point down outline"
        color="red"
        className="menuBtn"
        loading
        size="big"
        onClick={() => setVisible(true)}
      ></Icon>
      <Sidebar
        as={Menu}
        direction="right"
        animation="overlay"
        icon="labeled"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
        secondary
        className="sidebarAddin"
      >
        <Menu.Item className="itemAddinHome" as={Link} to={profileUrl}>
          {auth.isLoggedIn && (
            <Header as="h1" inverted>
              {" "}
              {auth.userName}
            </Header>
          )}
        </Menu.Item>

        <Menu.Item className="itemAddinHome" as={Link} to="/">
          <Header as="h1" inverted>
            home
          </Header>
        </Menu.Item>
        {/* <Menu.Item className="itemAddinAbout" as={Link} to="/about">
          <Header as="h1" inverted>
            about
          </Header>
        </Menu.Item> */}
        <Menu.Item className="itemAddinAbout" as={Link} to="/post">
          <Header as="h1" inverted>
            post
          </Header>
        </Menu.Item>

        {!auth.isLoggedIn ? (
          <Menu.Item className="itemAddinAbout" as={Link} to="/login">
            <Header as="h1" inverted>
              log in
            </Header>
          </Menu.Item>
        ) : (
          <Menu.Item className="itemAddinAbout">
            <Header as="h1" onClick={auth.logout} inverted>
              log out
            </Header>
          </Menu.Item>
        )}
        <Menu.Item className="itemAddin ">
          <Menu secondary className="sociallink">
            <a className="item">
              <Icon name="discord" />
            </a>
            <a className="item">
              <Icon name="instagram" />
            </a>
            <a className="item" href="https://github.com/ttran293">
              <Icon name="github" />
            </a>
            <a className="item">
              <Icon name="youtube" />
            </a>
          </Menu>
        </Menu.Item>
      </Sidebar>
    </div>
  );
};

export default SidebarLink;
