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
import Moment from "react-moment";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Fade from "react-reveal/Fade";

const Userbio = (props) => {
    
    const auth = useContext(AuthContext);
    const [editBioValue, setEditBioValue] = useState({
      editbio: "",
    });
    const [bioCount, setBioCount] = useState(0);
    const handleBioChange = (event) => {
      const { name, value } = event.target;

      setBioCount(event.target.value.length);

      setEditBioValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };
    const handleBioSubmit = async (event) => {

       var bioHeaders = new Headers();
       bioHeaders.append("Authorization", "Bearer " + auth.token);
       bioHeaders.append("Content-Type", "application/json");

       var bioinfo = JSON.stringify({
         content: editbio,
       });

       var biorequestOptions = {
         method: "POST",
         headers: bioHeaders,
         body: bioinfo,
         redirect: "follow",
       };

       try {
         await fetch("/post/user/bio/" + auth.userId, biorequestOptions)
           .then((response) => response.json())
           .then((result) => {
             if (result.status == "200") {
               //Good
               console.log(result);
               props.setBio(result.bio);
               setEditBioModal(false);
             } else {
               //Error
             }
           });
       } catch (err) {}

    };
    const { editbio } = editBioValue;
    const [editBioModal, setEditBioModal] = useState(false);
    return (
        <Grid.Column width={8} className="">
            <Fade>
                <div className="sideBar sideBarContent">
                    <Header className="userheaderName" as="h1" textAlign="left">
                    {props.userName}
                    </Header>

                    {props.dateJoin !== "" && (
                    <>
                        <Header className="userheaderDes" as="h3" textAlign="left">
                        joined in <Moment format="MMMM YYYY">{props.dateJoin}</Moment>
                        </Header>
                        {auth.userId === props.id && (
                        <span
                            className="editBioBtn"
                            onClick={() => setEditBioModal(true)}
                        >
                            edit bio
                        </span>
                        )}
                    </>
                    )}

                    <Header className="userheaderDes" as="h3" textAlign="left">
                    {props.bio}
                    </Header>
                </div>
            </Fade>
            <Modal
          closeIcon
          onClose={() => setEditBioModal(false)}
          onOpen={() => setEditBioModal(true)}
          open={editBioModal}
          dimmer="blurring"
          size="large"
        >
          <Modal.Content className="modalPost">
            <Form onSubmit={handleBioSubmit}>
              <TextArea
                placeholder={props.bio}
                name="editbio"
                onChange={handleBioChange}
                value={editbio}
              />
              <span>{bioCount}/150</span>
              <Button>submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
        </Grid.Column>
  );
};

export default Userbio;