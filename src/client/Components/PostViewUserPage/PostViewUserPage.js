import React, {
  Component,
  useEffect,
  useState,
  createRef,
  useContext,
} from "react";
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
  Rail,
  Ref,
  Segment,
  Sticky,
  Header,
  Divider,
  Modal,
} from "semantic-ui-react";
import "../PostViewUserPage/PostViewUserPage.css";
import ReactPlayer from "react-player/lazy";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const PostViewUserPage = () => {
  const auth = useContext(AuthContext);
  const [musicPosts, setMusicPosts] = useState([]);
  const [userName, setName] = useState("");
  let { id } = useParams();
  
  useEffect(() => {
    const fetchPosts = async () => {
      await fetch("https://wsaylt.onrender.com/post/user/" + id)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.posts)
          // console.log(data.user);
          setMusicPosts(data.posts);
          setName(data.user.name);
        });
    };
    fetchPosts();
  }, [id]);

  function ListItem(props) {
    const [deleteConfirmModal, setdeleteConfirmModal] = React.useState(false);
    const [SinglePostModal, setSinglePostModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [likeColor, setLikeColor] = useState("grey");
    const [formValue, setFormValue] = useState({
      comment: "",
    });

    let found;

    useEffect(() => {
      found = props.likes.find(
        (element) => element.byUser._id === auth.userId
      );
      if (!found) {
      } else {
        setLikeColor("red");
      }
    }, []);

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
      if (!auth.isLoggedIn) setOpen(true);
      else {
        let now = new Date();
        //props.comments.push(props.comments[0]);
        props.comments.push({
          byUser: { _id: auth.userId, name: auth.userName },
          content: comment,
          date: now,
          onPost: props.postID,
          _id: "propscomment" + props.postID,
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
            "https://wsaylt.onrender.com/post/comment/" + props.postID,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              if (result.status == "200") {
                //Good
                console.log(result);
              } else {
                //Error
              }
            });
        } catch (err) {}

        setFormValue({ comment: "" });
      }
    };

    const handleDeletePost = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + auth.token);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "https://wsaylt.onrender.com/post/delete/" + props.postID,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));

        setMusicPosts((prevPost) =>
          prevPost.filter((post) => post._id !== props.postID)
        );

        setdeleteConfirmModal(false);
    }
    const getComment = (commentList) => {
      let content = [];
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
                <span className="cardElement"> {commentList[i].content}</span>
                {/* <Feed.Date>
                      <Moment fromNow>{commentList[i].date}</Moment>
                    </Feed.Date> */}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        );
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
              "https://wsaylt.onrender.com/post/like/" + props.postID,
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
              "https://wsaylt.onrender.com/post/like/delete/" + checkLike._id,
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

    const { comment } = formValue;

    return (
      <>
        <Card>
          <Card.Content>
            <ReactPlayer className="iframeaddin" url={`${props.posturl}`} />
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Meta>
                    <Feed.Like className="cardElement">
                      <Icon
                        name="like"
                        color={likeColor}
                        onClick={updateLike}
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
                    {auth.userId === id && (
                      <Feed.Like className="cardElement">
                        <Icon color="grey" name="edit" />
                        edit
                      </Feed.Like>
                    )}
                    {auth.userId === id && (
                      <Feed.Like
                        className="cardElement"
                        onClick={() => setOpen(true)}
                      >
                        <Icon color="grey" name="delete" />
                        delete
                      </Feed.Like>
                    )}
                  </Feed.Meta>
                  <Feed.Summary>
                    <Feed.User className="usernameCard">
                      {props.creator}
                    </Feed.User>
                    <span className="cardElement"> {props.caption}</span>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
        <Modal
          closeIcon
          open={deleteConfirmModal}
          onClose={() => setdeleteConfirmModal(false)}
          onOpen={() => setdeleteConfirmModal(true)}
          dimmer="blurring"
          size="mini"
        >
          {/* <Header icon="sign in" content="Please log in" /> */}
          <Modal.Content className="modalPost">
            <div>are you sure you want to delete this post?</div>
            <p onClick={handleDeletePost}>
              <Icon color="red" name="hand point right outline" />
              yes, delete
            </p>
            <p>
              <Icon color="grey" name="hand point right outline" />
              no
            </p>
          </Modal.Content>
        </Modal>
        <Modal
          closeIcon
          onClose={() => setSinglePostModal(false)}
          onOpen={() => setSinglePostModal(true)}
          open={SinglePostModal}
          dimmer="blurring"
          size="large"
        >
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
                          //onClick={() => setSinglePostModal(true)}
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
                        <Feed.User className="cardElement">
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
        </Modal>
      </>
    );
  }

  function GridMainBar() {
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
      <Grid.Column className="mainBar">
        {listItems}
      </Grid.Column>
    );
  }

 function GridSideBar() {
   return (
     <Grid.Column className="">
       <div className="sideBar sideBarContent">
         <Header
           className="headerName"
           as="h1"
           textAlign="left"
           //floated="left"
         >
           {userName}
         </Header>
         {/* <Header
           className="headerName"
           as="h3"
           textAlign="left"
           //floated="left"
         >
           Joined in 2015
         </Header>
         <Header
           className="headerName"
           as="h3"
           textAlign="left"
           //floated="left"
         >
           a musician living in Nashville a musician living in Nashville a
           musician living in Nashville a musician living in Nashville
         </Header> */}
         {/* <h1></h1> */}

         {/* <a>
           <Icon name="user" />
           22 Like
         </a>
         <a>
           <Icon name="user" />
           22 Comments
         </a> */}
       </div>
     </Grid.Column>
   );
 }


  return (
    <>
      <Grid
        centered
        stackable
        columns={2}
        className="GridPostHome"
      >
        {GridSideBar()}
        {GridMainBar()}
      </Grid>
    </>
  );
};

export default PostViewUserPage;
