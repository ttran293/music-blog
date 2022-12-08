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
import PasswordChecklist from "react-password-checklist";


const Signup = () => {
  const auth = useContext(AuthContext);
  
  const [usernameValid, toggleUsernameMsg] = useState('');
  const [checkValid, setcheckValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
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

    if (checkValid)
    {
      const signupinfo = {
        name: username,
        email,
        password,
      };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(signupinfo);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };


      try {
        console.log("here");
        await fetch("http://localhost:8080/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status=='422'){
            toggleUsernameMsg('Error');
          }
          else{
            toggleUsernameMsg("Success");
            auth.login(result.userId, result.name, result.token);
          }
        });
      } catch (err) {
      }
    }


    
  };

  const { username, email } = formValue;
  return (
    <>
      <SidebarLink></SidebarLink>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {usernameValid == "Success" && (
            <Message positive>
              <a href="/post">
                <Message.Header>Congratulation!</Message.Header>
                <p>
                  Go to post your first <b>song</b> page to see now.
                </p>
              </a>
            </Message>
          )}
          <Header as="h2" color="black" textAlign="center">
            Sign Up
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={username}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email (Optional)"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              name="password"
              onChange={(e) => setPasswordAgain(e.target.value)}
              // value={password}
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Form>
          <Message>
            <PasswordChecklist
              rules={[
                "minLength",
                // "specialChar",
                // "number",
                // "capital",
                "match",
                "notEmpty",
              ]}
              minLength={6}
              value={password}
              valueAgain={passwordAgain}
              onChange={(isValid) => {
                setcheckValid(isValid);
              }}
              className="pwchecklist"
            />
          </Message>
          {usernameValid == "Error" && (
            <Message negative>
              Username already exists, please use choose a different username
              instead.
            </Message>
          )}

          <Message>
            Already have an account? <a href="/login">Login</a>
          </Message>
        </Grid.Column>
        
      </Grid>
    </>
  );
};

export default Signup;
