import React, { Component, useEffect, useState, useContext } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Card,
  Icon,
  Feed,
  Comment,
  Embed,
  Input
} from "semantic-ui-react";

import "../PostForm/PostForm.css";
import getYouTubeID from "get-youtube-id";
import { useNavigate, Navigate, redirect } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Moment from "react-moment";
import LoginPage from "../../pages/Login"
const PostForm = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [MusicPostURL, setMusicPostURL] = useState("");
    const [SubmittedMusicPostURL, setSubmittedMusicPostURL] = useState("");

    const [correctURL, toggleURL] = useState(true);

    const [correctCaption, toggleCaption] = useState(true);

    const youtubeEmbbed = "https://www.youtube.com/embed/";
    let id;
    function handleClickURL(e) {

        id = getYouTubeID(MusicPostURL);
        if (id === null){
            toggleURL(false);
        }
        else{
            console.log(id);
            setSubmittedMusicPostURL(youtubeEmbbed + id);
        }
        
    }
    function handleInputChangeURL(e) {
      setMusicPostURL(e.target.value);
      toggleURL(true);
    }

    function reEnterURL() {
      setMusicPostURL("");
      setSubmittedMusicPostURL("");
      console.log("Testing");
    }

    const [MusicPostCaption, setMusicPostCaption] = useState("");
    const [SubmittedMusicPostCaption, setSubmittedMusicPostCaption] =
      useState("");

    function handleClickCaption(e) {
        if (MusicPostCaption === "") 
            toggleCaption(false);
        else
            setSubmittedMusicPostCaption(MusicPostCaption);
    }
    function handleInputChangeCaption(e) {
        setMusicPostCaption(e.target.value);
        toggleCaption(true);
    }

    function reEnterCaption() {
        setMusicPostCaption("");
        setSubmittedMusicPostCaption("");
        console.log("Testing")
    }

    async function submitPost(e) {
        e.preventDefault();
        var isURLCorrect = false;
        var isCaptionCorrect = false;
        if (MusicPostURL === "") {
          toggleURL(false);
          console.log(id);
          console.log("Error");
        } 
        else {
          id = getYouTubeID(MusicPostURL);
          if (id === null) {
            toggleURL(false);
          } 
          else{
            isURLCorrect =true; 

          }
        }

        if (MusicPostCaption === "" || SubmittedMusicPostCaption === "") {
          toggleCaption(false);
        } else {
          isCaptionCorrect = true;
        }

        if (isURLCorrect && isCaptionCorrect) {
            console.log(SubmittedMusicPostURL);
            console.log(SubmittedMusicPostCaption);
             console.log("here");
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + auth.token);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              posturl: SubmittedMusicPostURL,
              caption: SubmittedMusicPostCaption,
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'  
            };
            await fetch("http://localhost:8080/post", requestOptions)
            .then(response => response.text())
            .then(result => {
              if (result.status == "500") {
                  //TODOO Error
              } 
              else {
                  navigate('/');
              }
          })
            .catch(error => console.log('error', error));
        }
    }


    return (
      <>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }} className="postGrid">
            <Header as="h1" textAlign="center">
              Share your music
            </Header>
            <Form size="large">
              <Card className=" ">
                {SubmittedMusicPostURL === "" ? (
                  <div className="">
                    <Input
                      className="inputCard"
                      fluid
                      placeholder="Validate Youtube URL"
                      action={{
                        icon: "search",
                        onClick: (e) => handleClickURL(e),
                      }}
                      onChange={handleInputChangeURL}
                    />
                  </div>
                ) : (
                  <>
                    <div></div>
                    <iframe
                      className="iframeaddin"
                      src={SubmittedMusicPostURL}
                      title="YouTube video"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                    <Button icon className="" onClick={reEnterURL}>
                      <Icon name="edit" />
                    </Button>
                  </>
                )}

                {SubmittedMusicPostCaption === "" ? (
                  <>
                    <Input
                      fluid
                      className="inputCard"
                      placeholder="Caption..."
                      action={{
                        icon: "add",
                        onClick: (e) => handleClickCaption(e),
                      }}
                      onChange={handleInputChangeCaption}
                    />
                  </>
                ) : (
                  <Card.Content>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            {SubmittedMusicPostCaption}
                            <Button
                              icon
                              className="editBtn"
                              onClick={reEnterCaption}
                            >
                              <Icon name="edit" />
                            </Button>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  </Card.Content>
                )}
              </Card>
              {correctURL ? (
                <></>
              ) : (
                <Message negative>
                  <Message.Header>URL Error</Message.Header>
                  <p>Please enter and validate your youtube url</p>
                </Message>
              )}

              {correctCaption ? (
                <></>
              ) : (
                <Message negative>
                  <Message.Header>Enter a caption</Message.Header>
                  <p>Please enter caption for your post</p>
                </Message>
              )}

              <Button
                className="postBtn"
                secondary
                fluid
                size="large"
                onClick={submitPost}
              >
                Post
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </>
    );
};

export default PostForm;
