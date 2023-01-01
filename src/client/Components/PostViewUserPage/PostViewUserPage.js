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
  TextArea,
  CardContent,
} from "semantic-ui-react";
import "../PostViewUserPage/PostViewUserPage.css";
import ReactPlayer from "react-player/youtube";
import Moment from "react-moment";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Fade from "react-reveal/Fade";
import Userbio from "../Userbio/Userbio.js"

const PostViewUserPage = () => {
  const auth = useContext(AuthContext);
  const [musicPosts, setMusicPosts] = useState([]);
  const [userName, setName] = useState("");
  const [bio, setBio] = useState("");
  
  const [dateJoin, setdateJoin] = useState("");
  let { id } = useParams();
  
  useEffect(() => {
    const fetchPosts = async () => {
      await fetch("/post/user/" + id)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.posts)
          // console.log(data.user);
          setMusicPosts(data.posts);
          setName(data.user.name);
          setBio(data.user.information);
          setdateJoin(data.user.datejoin);
        });
    };
    fetchPosts();
  }, [id, bio]);

 

  function ListItem(props) {
    const [deleteConfirmModal, setdeleteConfirmModal] = React.useState(false);
    const [SinglePostModal, setSinglePostModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [likeColor, setLikeColor] = useState("grey");
    const [formValue, setFormValue] = useState({
      comment: "",
    });
    const [likeModal, setLikeModal] = React.useState(false);
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
            "/post/comment/" + props.postID,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              if (result.status == "200") {
                //Good
                // console.log(result);
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
        "/post/delete/" + props.postID,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
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
                <Link className="usernameCard" to={commentProfile}>
                  {commentList[i].byUser.name}
                </Link>
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
              "/post/like/" + props.postID,
              LikerequestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                if (result.status == "200") {
                  //Good
                  // console.log(result);
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

    
    const getLike = (likeList) => {
      let content = [];
      let likeLength = Object.keys(likeList).length;

      if (likeLength===0)
      {
        content.push(<p key={likeLength}>be the first to like</p>);
      }
      else {
        for (let i = 0; i < likeLength; i++) {
          let likeProfile = "/post/user/" + likeList[i].byUser._id;
          content.push(
            <div key={i}>
              <Link className="cardElement" to={likeProfile}>
                <Icon color="grey" name="hand point right outline" />
                {likeList[i].byUser.name}
              </Link>
            </div>
          );
        }
      }
      return content;
    };
    const { comment } = formValue;

    return (
      <>
        <Card>
          <Card.Content>
            <ReactPlayer
              controls={true}
              className="iframeaddin"
              url={`${props.posturl}`}
            />
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
                    {auth.userId === id && (
                      <Feed.Like
                        className="cardElement"
                        onClick={() => setdeleteConfirmModal(true)}
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
            <p onClick={() => setdeleteConfirmModal(false)}>
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
                          <span onClick={() => setLikeModal(true)}>
                            {" "}
                            {props.likes.length} Likes
                          </span>
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
                        <Feed.User className="usernameCard">
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
       
      <Grid.Column width={5} className="mainBar">
        {listItems}
      </Grid.Column>
    );
  }


  // function GridSideBar() {

  //   const [editBioValue, setEditBioValue] = useState({
  //     editbio: "",
  //   });
  //   const [bioCount, setBioCount] = useState(0);
  //   const handleBioChange = (event) => {
  //     const { name, value } = event.target;

  //     // setBioCount(event.target.value.length);

  //     setEditBioValue((prevState) => {
  //       return {
  //         ...prevState,
  //         [name]: value,
  //       };
  //     });
  //   };
  //   const handleBioSubmit = async (event) => {

  //      var bioHeaders = new Headers();
  //      bioHeaders.append("Authorization", "Bearer " + auth.token);
  //      bioHeaders.append("Content-Type", "application/json");

  //      var bioinfo = JSON.stringify({
  //        content: editbio,
  //      });

  //      var biorequestOptions = {
  //        method: "POST",
  //        headers: bioHeaders,
  //        body: bioinfo,
  //        redirect: "follow",
  //      };

  //      try {
  //        await fetch("/post/user/bio/" + auth.userId, biorequestOptions)
  //          .then((response) => response.json())
  //          .then((result) => {
  //            if (result.status == "200") {
  //              //Good
  //             //  console.log(result);
  //              setBio(result.bio);
  //              setEditBioModal(false);
  //            } else {
  //              //Error
  //            }
  //          });
  //      } catch (err) {}

  //   };
  //   const { editbio } = editBioValue;
  //   const [editBioModal, setEditBioModal] = useState(false);

  //   return (
  //     <Grid.Column width={8} className="">
  //       {/* <Fade>
  //         <div className="sideBar sideBarContent">
  //           <Header className="userheaderName" as="h1" textAlign="left">
  //             {userName}
  //           </Header>

  //           {dateJoin !== "" && (
  //             <>
  //               <Header className="userheaderDes" as="h3" textAlign="left">
  //                 joined in <Moment format="MMMM YYYY">{dateJoin}</Moment>
  //               </Header>
  //               {auth.userId === id && (
  //                 <span
  //                   className="editBioBtn"
  //                   onClick={() => setEditBioModal(true)}
  //                 >
  //                   edit bio
  //                 </span>
  //               )}
  //             </>
  //           )}

  //           <Header className="userheaderDes" as="h3" textAlign="left">
  //             {bio}
  //           </Header>
  //         </div>
  //       </Fade> */}

  //       <Modal
  //         closeIcon
  //         onClose={() => setEditBioModal(false)}
  //         onOpen={() => setEditBioModal(true)}
  //         open={editBioModal}
  //         dimmer="blurring"
  //         size="large"
  //       >
  //         <Modal.Content className="modalPost">
  //           <Form onSubmit={handleBioSubmit}>
  //             <TextArea
  //               placeholder={bio}
  //               name="editbio"
  //               onChange={handleBioChange}
  //               value={editbio}
  //             />
  //             {/* <span>{bioCount}/150</span> */}
  //             <Button>submit</Button>
  //           </Form>
  //         </Modal.Content>
  //       </Modal>
  //     </Grid.Column>
  //   );
  // }

  return (
    <>
      <Grid centered stackable columns={2} className="GridPostHome">
        <Userbio
          id={id}
          userName={userName}
          dateJoin={dateJoin}
          bio={bio}
          setBio={setBio}
        ></Userbio>
        {/* {GridSideBar()} */}
        {GridMainBar()}
      </Grid>
    </>
  );
};

export default PostViewUserPage;
