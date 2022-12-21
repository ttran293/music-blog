import React, { Component, useEffect, useState, useContext } from "react";
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
  Input,
  Modal,
  Header,
  Sidebar,
  Menu,
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";
import ReactPlayer from "react-player/lazy";
import Moment from "react-moment";
import { AuthContext } from "../../context/auth-context";


const GridPosts = () => {
    const auth = useContext(AuthContext);
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
      let userProfile = "/post/user/" + props.creatorID;
      const [open, setOpen] = React.useState(false);
      


      const [formValue, setFormValue] = useState({
        comment: "",
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
          if (!auth.isLoggedIn) 
            setOpen(true);
          else{
            console.log(comment);
            console.log(props.postID);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + auth.token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              content: comment,
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            try {
              await fetch(
                "http://localhost:8080/post/comment/" + props.postID,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                    if (result.status == "200") {
                      //Good
                    } else {
                      //Error
                    }
                });
            } catch (err) {}

            setFormValue({ comment: "" });
          }
         
          
      }
      const { comment } = formValue;

      const getComment = (commentList) =>{
        let content = []
        let commentLength = Object.keys(commentList).length;
        for (let i = 0; i < commentLength; i++) {
            // console.log(commentList[i]._id);
            // console.log(commentList[i].byUser.name);
            // console.log(commentList[i].content);
            // console.log(commentList[i].date);
            let commentProfile = "/post/user/" + commentList[i].byUser._id;
            content.push(
              <Feed.Event key={i}>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User href={commentProfile}>
                      {commentList[i].byUser.name}
                    </Feed.User>
                    <span className="comment"> {commentList[i].content}</span>
                    <Feed.Date>
                      <Moment fromNow>{commentList[i].date}</Moment>
                    </Feed.Date>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            );
          
        }
    

        return content;
      }

      return (
        <>
          <Grid.Column>
            <Card>
              <ReactPlayer className="iframeaddin" url={`${props.posturl}`} />
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User href={userProfile}>
                          {props.creator}
                        </Feed.User>
                        <span className="comment"> {props.caption}</span>
                        {/* {props.comments !== 0 && (
                          <p>View all {props.comments.length} comments</p>
                        )} */}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  {getComment(props.comments)}
                </Feed>
                <p>
                  <Moment fromNow>{props.postdate}</Moment>
                </p>

                <Form onSubmit={handleSubmit}>
                  <Input
                    fluid
                    action="Add"
                    labelPosition="right"
                    placeholder="Add a comment..."
                    name="comment"
                    onChange={handleChange}
                    value={comment}
                  />
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon="sign in" content="Please log in" />
            <Modal.Content>
              <span>Create an account to join the conversation!</span>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="hand point right outline" color="green" /> Go to
                Sign Up
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      ); 
    }


    function NumberList() {
      const listItems = musicPosts.map((p) => (
        <ListItem
          key={p._id}
          postID={p._id}
          posturl={p.posturl}
          creator={p.creator.name}
          creatorID={p.creator._id}
          caption={p.caption}
          postdate={p.date}
          comments={p.comments}
        />
      ));
      return (
        <>
          <Grid stackable columns={3} className="GridPostHome">
            {listItems}
          </Grid>
        </>
      );
    }
    



    return (<>
        {NumberList()}
    </>
    );
};

export default GridPosts;
