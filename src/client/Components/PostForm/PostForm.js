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

const PostForm = () => {
    const [MusicPostURL, setMusicPostURL] = useState("");
    const [SubmittedMusicPostURL, setSubmittedMusicPostURL] = useState("");
    const youtubeEmbbed = "https://www.youtube.com/embed/";
    function handleClickURL(e) {
        var id = getYouTubeID(MusicPostURL);
        console.log(id);
        setSubmittedMusicPostURL(youtubeEmbbed+id);
    }
    function handleInputChangeURL(e) {
      setMusicPostURL(e.target.value);
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
        setSubmittedMusicPostCaption(MusicPostCaption);
    }
    function handleInputChangeCaption(e) {
        setMusicPostCaption(e.target.value);
      
    }

    function reEnterCaption() {
        setMusicPostCaption("");
        setSubmittedMusicPostCaption("");
        console.log("Testing")
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
                  placeholder="Youtube URL"
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
          <Button className="postBtn" color="teal" fluid size="large">
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
