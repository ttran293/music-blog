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
import PasswordChecklist from "react-password-checklist";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

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

        await fetch("/signup", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status == "422") {
              toggleUsernameMsg("Error");
            } else {
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
        style={{ height: "85vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 370 }}>
          {usernameValid == "Success" ? (
            <div>
              congrats you created an account
              <div>
                <Link className="messageForm" to="/">
                  <Icon name="hand point left outline"></Icon> homepage
                </Link>
              </div>
              <div>
                <Link className="messageForm" to="/post">
                  <Icon name="hand point right outline"></Icon>share a post
                </Link>
              </div>
            </div>
          ) : (
            <div>
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
                  placeholder="email (optional)"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />
                <Form.Input
                  fluid
                  icon="hand point right outline"
                  iconPosition="left"
                  placeholder="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  // value={password}
                />
                <Form.Input
                  fluid
                  icon="hand point right outline"
                  iconPosition="left"
                  placeholder="confirm password"
                  type="password"
                  name="password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  // value={password}
                />
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
                <Button color="teal" fluid size="large">
                  okay sign me up
                </Button>
              </Form>

              {usernameValid == "Error" && (
                <p className="messageForm negativeMessage">
                  username already exists, please use choose a different
                  username instead.
                </p>
              )}

              <Link className="messageForm" to="/login">
                <Icon color="grey" name="hand point right outline" />
                already have an account? login here
              </Link>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Signup;
