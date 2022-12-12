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
      const [visible, setVisible] = React.useState(false);

      
    // function PopulateFeed(commentsInfo) {
      
    //   const feeds = [];
      
    //   for (const key in commentsInfo) {
    //       let eachobject = commentsInfo[key];
    //       for (const i in eachobject) {
    //         console.log(`${i}: ${eachobject[i]}`);
    //         if (i === "byUser"){
    //           let byuserobj = eachobject[i];
    //           for (const k in byuserobj){
    //             if (k === "name"){
    //             console.log(`${k}: ${byuserobj[k]}`);
    //           }
    //         }
    //       }


    //     }
    //   }
      
    //   // const feeds = commentsInfo.map((eachcomment) => {
    //   //   console.log(eachcomment);
    //   //   <Feed.Event>
    //   //     {/* <Feed.Label image="/images/avatar/small/joe.jpg" /> */}
    //   //     <Feed.Content>
    //   //       <Feed.Summary>
    //   //         <a>{eachcomment.byUser.name}</a> posted on his page
    //   //         <Feed.Date>{eachcomment.date}</Feed.Date>
    //   //       </Feed.Summary>
    //   //       <Feed.Extra text>{eachcomment.content}</Feed.Extra>
    //   //       <Feed.Meta>
    //   //         <Feed.Like>
    //   //           <Icon name="like" />5 Likes
    //   //         </Feed.Like>
    //   //       </Feed.Meta>
    //   //     </Feed.Content>
    //   //   </Feed.Event>
    //   // });
      
    //   return (
    //     <>
    //       <Feed size="large" className="feedClass">
    //         {/* {feeds  } */}
    //         <Feed.Event>
    //           {/* <Feed.Label image="/images/avatar/small/joe.jpg" /> */}
    //           <Feed.Content>
    //             <Feed.Summary>
    //               <a>test</a> posted on his page
    //               <Feed.Date>t</Feed.Date>
    //             </Feed.Summary>
    //             <Feed.Extra text>s</Feed.Extra>
    //             <Feed.Meta>
    //               <Feed.Like>
    //                 <Icon name="like" />5 Likes
    //               </Feed.Like>
    //             </Feed.Meta>
    //           </Feed.Content>
    //         </Feed.Event>
    //         <Form onSubmit={handleSubmit}>
    //           <Input
    //             fluid
    //             action="Add"
    //             labelPosition="right"
    //             placeholder="Add a comment..."
    //             name="comment"
    //             onChange={handleChange}
    //             value={comment}
    //           />
    //         </Form>
    //       </Feed>
    //     </>
    //   );
    // }

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

      return (
        <>
          <Grid.Column>
            <Card>
              <ReactPlayer className="iframeaddin" url={`${props.posturl}`} />
              <Card.Content>
                <a className="postCreator" href={userProfile}>
                  {props.creator}&nbsp;{" "}
                </a>
                <span className="postCaption">{props.caption}</span>
                {props.comments !== 0 && (
                  <p onClick={() => setVisible(true)}>
                    View all {props.comments.length} comments
                  </p>
                )}
                <p>
                  <Moment fromNow>{props.postdate}</Moment>
                </p>

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
          </Grid.Column>
          <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon="archive" content="Archive Old Messages" />
            <Modal.Content>
              <p>
                Your inbox is getting full, would you like us to enable
                automatic archiving of old messages?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
          <Sidebar
            as={Menu}
            direction="right"
            animation="overlay"
            onHide={() => setVisible(false)}
            visible={visible}
            width="very wide"
            className="postsidebarAddin"
          >
            {/* <Card>
              <Card.Content>
                <a className="postCreator" href={userProfile}>
                  {props.creator}&nbsp;{" "}
                </a>
                <span className="postCaption">{props.caption}</span>
             
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
            </Card> */}

            {PopulateFeed(props.comments)}
          </Sidebar>
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
          <Grid stackable columns={4} className="GridPostHome">
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
