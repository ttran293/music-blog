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
import "../SidebarLink/SidebarLink.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SidebarLink = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Button
        className="testing"
        color="green"
        circular
        icon
        onClick={() => setVisible(true)}
      ></Button>
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
        <Menu.Item className="itemAddinHome" as={Link} to="/">
          <Header as="h1">Home</Header>
        </Menu.Item>
        <Menu.Item className="itemAddinAbout" as={Link} to="/about">
          <Header as="h1">About</Header>
        </Menu.Item>
        <Menu.Item className="itemAddinAbout" as={Link} to="/post">
          <Header as="h1">Post</Header>
        </Menu.Item>
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
