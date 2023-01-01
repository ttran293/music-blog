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
  Dropdown,
} from "semantic-ui-react";
import "./SidebarLink.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Slide from "react-reveal/Slide";
import SmileIcon from "../../images/smile.svg"
import ProfileIcon from "../../images/profile.svg";
import PostIcon from "../../images/post.svg";
const SidebarLink = () => {
  const [visible, setVisible] = React.useState(false);

  const auth = useContext(AuthContext);

  let profileUrl;
  if (auth.isLoggedIn)
    profileUrl = "/post/user/" + auth.userId;

  return (
    <>
      <div className="headerSticky">
        <Menu inverted pointing secondary size="massive" className="headerMenu">
          <Menu.Item as={Link} to="/">
            <Image src={SmileIcon} className="iconBtn" />
          </Menu.Item>
          <Menu.Menu position="right">
           
            <Menu.Item className="" as={Link} to="/post">
              <Image src={PostIcon} className="iconBtn" />
            </Menu.Item>

            <Menu.Item className="">
              <Image src={ProfileIcon} className="iconBtn" />
              <Dropdown floating>
                <Dropdown.Menu>
                  {auth.isLoggedIn && (
                    <Dropdown.Item as={Link} to={profileUrl} text="profile" />
                  )}
                  {!auth.isLoggedIn ? (
                    <Dropdown.Item as={Link} to="/login" text="log in" />
                  ) : (
                    <Dropdown.Item onClick={auth.logout} text="log out" />
                  )}

                  {/* <Dropdown.Item as={Link} to="/signup" text="sign up" /> */}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    </>
  );
};

export default SidebarLink;
