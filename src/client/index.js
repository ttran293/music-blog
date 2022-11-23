import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from '../client/pages/Home';
import Aboutpage from "../client/pages/About";
import Postpage from "../client/pages/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/post" element={<Postpage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);