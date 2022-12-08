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
  Input
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";
import ReactPlayer from "react-player/lazy";
import Moment from "react-moment";

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

    
    function ListItem(props) {

      // const dateToFormat = new Date(props.postdate);

      return (
        <Grid.Column>
          <Card>
            <div></div>
            {/* <iframe
              className="iframeaddin"
              src={`${props.posturl}`}
              title="YouTube video"
              allowFullScreen
              frameBorder="0"
            ></iframe> */}
            <ReactPlayer className="iframeaddin" url={`${props.posturl}`} />
            <Card.Content>
              <span className="postCreator">{props.creator}&nbsp; </span>
              <span className="postCaption">{props.caption}</span>
              {props.comments !== 0 && (
                <p>View all {props.comments} comments</p>
              )}
              <p>
                <Moment fromNow>{props.postdate}</Moment>
              </p>
             
              <Form>
                <Input
                  fluid
                  label={{ basic: true, content: "Post" }}
                  labelPosition="right"
                  placeholder="Add a comment..."
                />
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      ); 
    }


    function NumberList() {
      const listItems = musicPosts.map((p) => (
        <ListItem
          key={p._id}
          posturl={p.posturl}
          creator={p.creator.name}
          caption={p.caption}
          postdate={p.date}
          comments={p.comments.length}
        />
      ));
      return (
        <>
          <Grid stackable columns={4} className="GridPostHome">
            {listItems}
            {listItems}
          </Grid>
        </>
      );
    }
    
    return <>{NumberList()}</>;
};

export default GridPosts;
