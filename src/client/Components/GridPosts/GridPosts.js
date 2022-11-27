import React, { Component, useEffect, useState } from "react";
import {
  Grid,
  Image,
  Card,
  Icon,
  Feed,
  Comment,
  Form,
  Button,
  Embed,
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";

const imageSrc = "https://react.semantic-ui.com/images/wireframe/image.png";

const GridPosts = () => {
    const [musicPosts, setMusicPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () =>{
            await fetch("http://localhost:8080/post")
            .then((response) => response.json())
            .then((data) => setMusicPosts(data));
        }
        fetchPosts();
    }, []);

    console.log(musicPosts[0])
    function ListItem(props) {
        // Correct! There is no need to specify the key here:
        return (
          <Grid.Column>
            <Card>
              <iframe
                className="iframeaddin"
                src="https://www.youtube.com/embed/O6Xo21L0ybE"
                title="YouTube video"
                allowFullScreen
                frameBorder="0"
              ></iframe>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3 days ago</Feed.Date>
                      <Feed.Summary>
                        <a>Laura Faucet</a> created a post
                      </Feed.Summary>
                      <Feed.Extra text className="postcaption">
                        Have you seen what's going on in Israel? Can you believe
                        it.
                      </Feed.Extra>
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
            </Card>
          </Grid.Column>
        );
        
    }


    function NumberList() {
      const listItems = musicPosts.map((number) => (
        // Correct! Key should be specified inside the array.
        <ListItem key={number._id} value={number.title} />
      ));
      return (
        <Grid stackable columns={3} className="mt3">
          {listItems}{" "}
        </Grid>
      );
    }
    
    return <>{NumberList()}</>;
};

export default GridPosts;
