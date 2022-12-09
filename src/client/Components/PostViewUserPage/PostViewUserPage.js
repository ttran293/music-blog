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
      await fetch("http://localhost:8080/post/user/" + id)
        .then((response) => response.json())
        .then((data) => {
          setMusicPosts(data.posts);
          setName(data.name);
        });
    };
    fetchPosts();
  }, [id]);
  
  function DeleteBtn(thatpostid){
    const [open, setOpen] = React.useState(false);

    const handleDeletePost = async (e) => {
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + auth.token);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "http://localhost:8080/post/delete/" + thatpostid,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));

       
        setMusicPosts((prevPost) =>
          prevPost.filter((post) => post._id !== thatpostid)
        );
 
        setOpen(false);
    }

    return (
      <Modal
        basic
        dimmer="blurring"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={
          <Button icon>
            <Icon name="delete" />
          </Button>
        }
      >
        <Header icon>
          <Icon color="red" name="delete" />
          Delete this post?
        </Header>
        <Modal.Content>
          <p className="modalContent">
            This action will delete the posts and every comments in it.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={handleDeletePost}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
    
  } 

  function ListItem(props) {
    return (
      <>
        <Card>
          <ReactPlayer className="iframeaddin" url={`${props.posturl}`} />
          <Card.Content>
            <span className="postCreator">{props.creator}&nbsp; </span>
            <span className="postCaption">{props.caption}</span>
            {/* {props.comments !== 0 && <p>View all {props.comments} comments</p>} */}
            <p>
              <Moment fromNow>{props.postdate}</Moment>
            </p>
          </Card.Content>
        </Card>
        {auth.userId === id && (
          <div>
            <Button icon>
              <Icon name="edit" />
            </Button>
            {DeleteBtn(props.postID)}
          </div>
        )}
        <Divider />
      </>
    );
  }

  function GridMainBar() {
    const listItems = musicPosts.map((p) => (
      <ListItem
        key={p._id}
        postID={p._id}
        posturl={p.posturl}
        creator={userName}
        caption={p.caption}
        postdate={p.date}
        comments={p.comments}
      />
    ));
    return (
      <Grid.Column className="mainBar">
        {listItems}
        {listItems}
        {listItems}
        {listItems}
      </Grid.Column>
    );
  }

 function GridSideBar() {
   return (
     <Grid.Column className="" style={{ marginTop: "50vh" }}>
       <div className="sideBar sideBarContent">
         <h1>{userName}</h1>
         <p>Joined in 2015</p>
         <p>Matthew is a musician living in Nashville.</p>
         <a>
           <Icon name="user" />
           22 Friends
         </a>
         <a>
           <Icon name="user" />
           22 Friends
         </a>
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
