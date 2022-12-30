import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  Icon,
  Feed,
  Form,
  Input,
  Modal,
  CardContent,
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";
import ReactPlayer from "react-player/youtube";
import Moment from "react-moment";
import { AuthContext } from "../../context/auth-context";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const GridPosts = () => {
    const auth = useContext(AuthContext);
    const [musicPosts, setMusicPosts] = useState([]);



    useEffect(() => {
        const fetchPosts = async () =>{
            await fetch("/post")
              .then((response) => response.json())
              .then((data) => setMusicPosts(data));
        }
        fetchPosts();
    }, []);

    function ListItem(props) {
      let userProfile = "/post/user/" + props.creatorID;
      const [open, setOpen] = React.useState(false);
      const [likeModal, setLikeModal] = React.useState(false);
      const [likeColor, setLikeColor] = useState("grey");
      const [SinglePostModal, setSinglePostModal] = React.useState(false);

      
      let found;

      useEffect(() => { 
        found = props.likes.find(
          (element) => element.byUser._id === auth.userId
        );
        if (!found) {
          
        } else {
          setLikeColor("red");
        }
      },[])
      
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
            let now = new Date();
       
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
                "/post/comment/" + props.postID,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  if (result.status == "200") {
                    //Good
                    //console.log(result);
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
                    <Link className="cardElement" to={commentProfile}>
                      {commentList[i].byUser.name}
                    </Link>
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

      const getLike = (likeList) => {
        let content = [];
        let likeLength = Object.keys(likeList).length;

        if (likeLength===0)
        {
          content.push(
            <p>
              be the first to like
            </p>
          );
        }
        else {
          for (let i = 0; i < likeLength; i++) {
            let likeProfile = "/post/user/" + likeList[i].byUser._id;
            content.push(
              <div key={i}>
                <Link className="cardElement" to={likeProfile}>
                  <Icon color="red" name="like" />
                  {likeList[i].byUser.name}
                </Link>
              </div>
            );
          }
        }
        return content;
      };
      
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
                 "/post/like/" + props.postID,
                 LikerequestOptions
               )
                 .then((response) => response.json())
                 .then((result) => {
                   if (result.status == "200") {
                     //Good
                
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
                 "/post/like/delete/" + checkLike._id,
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
                            <span onClick={() => setLikeModal(true)}>
                              {" "}
                              {props.likes.length} Likes
                            </span>
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
                          <Link className="usernameCard" to={userProfile}>
                            {" "}
                            {props.creator}
                          </Link>
                          <span className="cardElement"> {props.caption}</span>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Fade>
          </Grid.Column>
          <Modal
            closeIcon
            open={likeModal}
            onClose={() => setLikeModal(false)}
            onOpen={() => setLikeModal(true)}
            dimmer="blurring"
            size="mini"
          >
            <Modal.Content className="modalPost">
              <Card>
                <CardContent>{getLike(props.likes)}</CardContent>
              </Card>
            </Modal.Content>
          </Modal>
          <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            dimmer="blurring"
            size="mini"
          >
            <Modal.Content className="modalPost">
              <div>you need an account to like or join the conversation</div>
              <div>
                <Link className="messageForm" to="/login">
                  <Icon color="grey" name="hand point right outline" />
                  already have an account? login here
                </Link>
              </div>
              <div>
                <Link className="messageForm" to="/signup">
                  <Icon color="grey" name="hand point right outline" />
                  sign up here
                </Link>
              </div>
            </Modal.Content>
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
                            <span onClick={() => setLikeModal(true)}>
                              {" "}
                              {props.likes.length} Likes
                            </span>
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
                          <Link className="cardElement" to={userProfile}>
                            {props.creator}
                          </Link>
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
          <Grid  stackable columns={3} className="GridPostHome">
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
