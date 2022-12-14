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
  Icon
} from "semantic-ui-react";
import SidebarLink from "../Components/SidebarLink/SidebarLink";
import { AuthContext } from "../context/auth-context";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [statusFromServer, setStatusFromServer] = useState(null);
  const location = useLocation();

 
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
      await fetch("/login", requestOptions)
        .then((response) => {
          setStatusFromServer(response.status);
          return response.json();
        }
        )
        .then((result) => {
          auth.login(result.userId, result.name, result.token);
          if (location.pathname === "/post") navigate("/post");
          else navigate(-1);
        });
    } catch (err) {}


  };

  const { username, password } = formValue;


  return (
    <>
      <SidebarLink></SidebarLink>
      <Grid
        textAlign="center"
        style={{ height: "85vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 370 }}>
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

          {statusFromServer === 500 && (
            <p className="negativeMessage">wrong username or password. please try again.</p>
          )}

          <Link className="messageForm" to="/signup">
            <Icon color="grey" name="hand point right outline" />
            you new? sign up here
          </Link>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
