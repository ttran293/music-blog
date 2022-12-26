import React, { Component, useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Input,
} from "semantic-ui-react";
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      await fetch(
        "http://localhost:8080/login",
        requestOptions)
        .then(response => response.json())
        .then(result => {
          auth.login(result.userId, result.name, result.token);
          navigate("/post");
        });
        

    } catch (err) {}


  };

  const { username, password } = formValue;


  return (
    <>
      <SidebarLink></SidebarLink>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {/* <p>{auth.userId}</p> */}
          {/* <Header as="h2" color="black" textAlign="center">
           Log in
          </Header> */}
          <Form inverted size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="hand point right outline"
              iconPosition="left"
              placeholder="username"
              name="username"
              onChange={handleChange}
              value={username}
            />
            <Form.Input
              fluid
              icon="hand point right outline"
              iconPosition="left"
              placeholder="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
            />

            <Button>let me in</Button>
          </Form>

          <a className="messageForm" href="/signup">
            you new? sign up here
          </a>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
