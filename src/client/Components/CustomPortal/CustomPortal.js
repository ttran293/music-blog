import React, { Component, useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  Icon,
  Feed,
  Form,
  Input,
  Modal,
  CardContent,
  Button,
  Checkbox,
  Sidebar,
  TransitionablePortal,
  Segment,
  Header,
} from "semantic-ui-react";

const CustomPortal = () => {
  const [openNewPostModal, setOpenNewPostModal] = React.useState(false);
  useEffect(() => {
    // Check if the URL contains '#newpost'
    if (window.location.hash === "#newpost") {
      setOpenNewPostModal(true);
      window.history.replaceState(null, null, " ");
    }
  }, []); 

  return (
    <>
      <TransitionablePortal
        onClose={() => setOpenNewPostModal(false)}
        open={openNewPostModal}
      >
        <Segment
          style={{
            left: "40%",
            position: "fixed",
            top: "50%",
            zIndex: 1000,
          }}
        >
          <Header as="h2">your new song is posted</Header>
        </Segment>
      </TransitionablePortal>
    </>
  );
};

export default CustomPortal;
