import React, { Component, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";


const PostForm = () => {
    const navigate = useNavigate();

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

            var myHeaders = new Headers();
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            navigate("/");
        }
       
        
        // console.log("Here")
      
    }


  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }} className="postGrid">
        <Header as="h2" color="teal" textAlign="center">
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
                      {/* <Feed.Date>3 days ago</Feed.Date> */}
                      <Feed.Summary>
                        {/* <a>Title</a>  */}

                        {SubmittedMusicPostCaption}
                        <Button
                          icon
                          className="editBtn"
                          onClick={reEnterCaption}
                        >
                          <Icon name="edit" />
                        </Button>
                        {/* <a>Title</a>  */}
                      </Feed.Summary>

                      {/* <Feed.Extra text className="postcaption">
                        Have you seen what's going on in Israel? Can you believe
                        it.
                      </Feed.Extra> */}
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                {/* <Comment.Group>
                    <Comment>
                        <Comment.Content>
                        <Comment.Author>Joe Henderson</Comment.Author>
                        <Comment.Text>
                            <span>
                            The hours, minutes and seconds stand as visible reminders
                            that your effort put them all there.
                            </span>
                        </Comment.Text>
                        </Comment.Content>
                    </Comment>

                    <Comment>
                        <Comment.Content>
                        <Comment.Author>Christian Rocha</Comment.Author>

                        <Comment.Text>I re-tweeted this.</Comment.Text>
                        </Comment.Content>
                    </Comment>

                    <Form>
                        <Form.TextArea rows={1} />
                        <Button size="small" content="Post" primary />
                    </Form>
                    </Comment.Group> */}
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
            color="teal"
            fluid
            size="large"
            onClick={submitPost}
          >
            Post
          </Button>
          {/* <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

         
          </Segment> */}
        </Form>
        {/* <Message>
          New to us? <a href="#">Sign Up</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};;

export default PostForm;
