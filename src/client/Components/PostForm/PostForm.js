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
import ReactPlayer from "react-player/lazy";
import { AuthContext } from "../../context/auth-context";
import Moment from "react-moment";
import LoginPage from "../../pages/Login"
const PostForm = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [MusicPostURL, setMusicPostURL] = useState("");
    const [SubmittedMusicPostURL, setSubmittedMusicPostURL] = useState("");
    const [correctURL, toggleURL] = useState(false);
    const [test, setTest] = useState(false);
    const [correctCaption, toggleCaption] = useState(true);

    const youtubeEmbbed = "https://www.youtube.com/embed/";
    let id;
    function handleClickURL(e) {
        if (MusicPostURL===""){
          toggleURL(true);
        } 
        else{
          id = getYouTubeID(MusicPostURL);
          if (id === null) {
            let requrl =
              "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
              process.env.YOUTUBEAPIKEY +
              "&maxResults=5&q=" +
              MusicPostURL;
            var youtuberequestOptions = {
              method: "GET",
              redirect: "manual",
            };
            fetch(requrl, youtuberequestOptions)
              .then((response) => response.json())
              .then((result) => {
                console.log(result.items[0].id.videoId);
                setSubmittedMusicPostURL(
                  youtubeEmbbed + result.items[0].id.videoId
                );
              })
              .catch((error) => console.log("error", error));
          } else {
            console.log(id);
            setSubmittedMusicPostURL(youtubeEmbbed + id);
          }
        }
    }
    function handleInputChangeURL(e) {
      setMusicPostURL(e.target.value);
      toggleURL(false);
    }

    function reEnterURL() {
      setMusicPostURL("");
      setSubmittedMusicPostURL("");
    }

    const [MusicPostCaption, setMusicPostCaption] = useState("");
    const [SubmittedMusicPostCaption, setSubmittedMusicPostCaption] =
      useState("");

    function handleClickCaption(e) {
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
        if (SubmittedMusicPostURL !== "") {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + auth.token);
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
            posturl: SubmittedMusicPostURL,
            caption: MusicPostCaption,
          });
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          await fetch("/post", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              if (result.status == "500") {
                //TODOO Error
              } else {
                navigate("/");
              }
            })
            .catch((error) => console.log("error", error));
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
            <Form size="large">
              <Card className=" ">
                {SubmittedMusicPostURL === "" ? (
                  <div className="">
                    <Input
                      className="inputCard"
                      fluid
                      placeholder="search or enter youtube url"
                      action={{
                        icon: "search",
                        onClick: (e) => handleClickURL(e),
                      }}
                      onChange={handleInputChangeURL}
                    />
                  </div>
                ) : (
                  <>
                    <ReactPlayer
                      className="iframeaddin"
                      url={SubmittedMusicPostURL}
                    />
                  </>
                )}

                {SubmittedMusicPostCaption === "" ? (
                  <>
                    <Input
                      fluid
                      className="inputCard"
                      placeholder="caption"
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
                          <Feed.Summary className="cardElement">
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

              {correctURL && (
                <p>music post cannot be empty, try search again</p>
              )}

              {SubmittedMusicPostURL !== "" && (
                <>
                  <Button className="" onClick={reEnterURL}>
                    edit
                  </Button>
                  <Button
                    // className="postBtn"
                    // secondary
                    // fluid
                    // size="large"
                    onClick={submitPost}
                  >
                    post
                  </Button>
                </>
              )}

            </Form>
          </Grid.Column>
        </Grid>
      </>
    );
};

export default PostForm;
