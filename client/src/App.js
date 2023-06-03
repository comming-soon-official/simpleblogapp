import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./views/Home";
import CreateUpdatePosts from "./views/CreateUpdatePosts";
import Drafts from "./views/Drafts";
import Navbar from "./layouts/Navbar";
import { apiPostAll, apidraftAll } from "./services/apis";
import { allDrafts, allPosts } from "./redux/postSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //updating posts to redux
    apidraftAll().then((res) => {
      dispatch(allDrafts(res.success));
    });

    //updating drafts to redux
    apiPostAll().then((res) => {
      dispatch(allPosts(res.success));
    });
  }, []);

  return (
    //assigning routes
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUpdatePosts />} />
        <Route path="/update" element={<CreateUpdatePosts />} />
        <Route path="/drafts" element={<Drafts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
