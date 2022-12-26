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
  Label,
  Progress,
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";
import ReactPlayer from "react-player/lazy";
import Moment from "react-moment";
import { AuthContext } from "../../context/auth-context";
import Fade from "react-reveal/Fade";

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
      const [likeColor, setLikeColor] = useState("grey");
      const [SinglePostModal, setSinglePostModal] = React.useState(false);

      
      let found = props.likes.find(element => element.byUser._id === auth.userId)

      useEffect(() => { 
        let found = props.likes.find(
          (element) => element.byUser._id === auth.userId
        );
        if (!found) {
          
        } else {
          setLikeColor("red");
        }
      },[])
      
      // console.log(found)
      // console.log(props.likes)
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
            console.log(auth.userName);
            console.log(props.comments);
            let now = new Date();
            console.log(now);
            //props.comments.push(props.comments[0]);
            props.comments.push({
              byUser: { _id: auth.userId, name: auth.userName },
              content: comment,
              date: now,
              onPost: props.postID,
              _id: "propscomment"+props.postID,
            });
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
                      console.log(result)
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
            let commentProfile = "/post/user/" + commentList[i].byUser._id;
            content.push(
              <Feed.Event key={i}>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User href={commentProfile} className="cardElement">
                      {commentList[i].byUser.name}
                    </Feed.User>
                    <span className="cardElement">
                      {" "}
                      {commentList[i].content}
                    </span>
                    {/* <Feed.Date>
                      <Moment fromNow>{commentList[i].date}</Moment>
                    </Feed.Date> */}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            );
          
        }
    

        return content;
      }

      const updateLike = async () => {
        if (!auth.isLoggedIn) {
          setOpen(true);
        } else {
          let checkLike = props.likes.find(
            (element) => element.byUser._id === auth.userId
          );
          
          if (!checkLike) {

          
             var likeHeaders = new Headers();
             likeHeaders.append("Authorization", "Bearer " + auth.token);

             var LikerequestOptions = {
               method: "POST",
               headers: likeHeaders,
               redirect: "follow",
             };

             try {
               await fetch(
                 "http://localhost:8080/post/like/" + props.postID,
                 LikerequestOptions
               )
                 .then((response) => response.json())
                 .then((result) => {
                   if (result.status == "200") {
                     //Good
                     console.log(result);
                      props.likes.push({
                        byUser: { _id: auth.userId, name: auth.userName },
                        toPost: props.postID,
                        _id: result.resultLikeID,
                      });
                     setLikeColor("red");
                   } else {
                     //Error
                   }
                 });
             } catch (err) {}
          } else {

             
             var unlikeHeaders = new Headers();
             unlikeHeaders.append("Authorization", "Bearer " + auth.token);
             unlikeHeaders.append("Content-Type", "application/json");
             var likeInstasnce = JSON.stringify({
               postID: checkLike.toPost,
             });
             var UnlikerequestOptions = {
               method: "POST",
               body: likeInstasnce,
               headers: unlikeHeaders,
               redirect: "follow",
             };

             try {
               await fetch(
                 "http://localhost:8080/post/like/delete/" + checkLike._id,
                 UnlikerequestOptions
               )
                 .then((response) => response.json())
                 .then((result) => {
                   if (result.status == "200") {
                     //Good
                     props.likes.splice(props.likes.indexOf(checkLike), 1);
                     setLikeColor("grey");
                   } else {
                     //Error
                   }
                 });
             } catch (err) {}

            // setLikeColor("black");

          }
        }
      };
      // const onProgress = (e) => {
      //   console.log(e.playedSeconds);
      // };

      return (
        <>
          <Grid.Column>
            <Fade>
              <Card>
                <ReactPlayer
                  //onProgress={onProgress}
                  className="iframeaddin"
                  url={`${props.posturl}`}
                />
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Meta>
                          <Feed.Like className="cardElement">
                            <Icon
                              color={likeColor}
                              onClick={updateLike}
                              name="like"
                            />
                            {props.likes.length} Likes
                          </Feed.Like>
                          <Feed.Like
                            onClick={() => setSinglePostModal(true)}
                            className="cardElement"
                          >
                            <Icon color="grey" name="comment" />{" "}
                            {props.comments.length} comments
                          </Feed.Like>
                          <Feed.Like className="cardElement">
                            <Icon color="grey" name="clock" />
                            <Moment fromNow>{props.postdate}</Moment>
                          </Feed.Like>
                        </Feed.Meta>
                        <Feed.Summary>
                          <Feed.User
                            className="usernameCard"
                            href={userProfile}
                          >
                            {props.creator}
                          </Feed.User>
                          <span className="cardElement"> {props.caption}</span>
                          {/* {props.comments !== 0 && (
                          <p>View all {props.comments.length} comments</p>
                        )} */}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    {/* {getComment(props.comments)} */}
                    {/* <small>
                    <Moment fromNow>{props.postdate}</Moment>
                  </small> */}
                  </Feed>

                  {/* <Form onSubmit={handleSubmit}>
                  <Input
                    fluid
                    action="Add"
                    labelPosition="right"
                    placeholder="Add a comment..."
                    name="comment"
                    onChange={handleChange}
                    value={comment}
                  />
                </Form> */}
                </Card.Content>
              </Card>
            </Fade>
          </Grid.Column>
          <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            dimmer="blurring"
            size="mini"
          >
            {/* <Header icon="sign in" content="Please log in" /> */}
            <Modal.Content className="modalPost">
              <div>you need an account to like or join the conversation</div>
              <div>
                <a className="messageForm" href="/login">
                  <Icon color="grey" name="hand point right outline" />
                  already have an account? login here
                </a>
              </div>
              <div>
                <a className="messageForm" href="/sign up">
                  <Icon color="grey" name="hand point right outline" />
                  sign up here
                </a>
              </div>
            </Modal.Content>
            {/* <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="hand point right outline" color="green" /> Go to
                Sign Up
              </Button>
            </Modal.Actions> */}
          </Modal>
          <Modal
            onClose={() => setSinglePostModal(false)}
            onOpen={() => setSinglePostModal(true)}
            open={SinglePostModal}
            dimmer="blurring"
            size="large"
          >
            {/* <Modal.Header>Select a Photo</Modal.Header> */}
            <Modal.Content className="modalPost">
              <Grid centered stackable columns={2}>
                <Grid.Column className="">
                  <ReactPlayer
                    className="iframeaddinSingle"
                    url={`${props.posturl}`}
                  />
                </Grid.Column>
                <Grid.Column className="">
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Meta>
                          <Feed.Like className="cardElement">
                            <Icon
                              color={likeColor}
                              onClick={updateLike}
                              name="like"
                            />
                            {props.likes.length} Likes
                          </Feed.Like>
                          <Feed.Like
                            className="cardElement"
                            // onClick={() => setSinglePostModal(true)}
                          >
                            <Icon name="comment" /> {props.comments.length}{" "}
                            comments
                          </Feed.Like>
                          <Feed.Like className="cardElement">
                            <Icon name="clock" />{" "}
                            <Moment fromNow>{props.postdate}</Moment>
                          </Feed.Like>
                        </Feed.Meta>
                        <Feed.Summary>
                          <Feed.User href={userProfile} className="cardElement">
                            {props.creator}
                          </Feed.User>
                          <span className="cardElement"> {props.caption}</span>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                    {getComment(props.comments)}
                  </Feed>

                  <Form onSubmit={handleSubmit}>
                    <Input
                      fluid
                      action="add"
                      labelPosition="right"
                      placeholder="write a comment..."
                      name="comment"
                      onChange={handleChange}
                      value={comment}
                    />
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Content>
            {/* <Modal.Actions>
              <Button color="black" onClick={() => setSinglePostModal(false)}>
                Close
              </Button>
            </Modal.Actions> */}
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
          likes={p.likes}
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
