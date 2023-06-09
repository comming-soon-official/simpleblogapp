import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./views/Home";
import CreateUpdatePosts from "./views/CreateUpdatePosts";
import Drafts from "./views/Drafts";
import Navbar from "./layouts/Navbar";
import { apiPostAll, apidraftAll } from "./services/apis";
import { allDrafts, allPosts } from "./redux/postSlice";
import Posts from "./components/Posts";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all drafts from the server and update Redux store
    apidraftAll().then((res) => {
      dispatch(allDrafts(res.success));
    });

    // Fetch all posts from the server and update Redux store
    apiPostAll().then((res) => {
      dispatch(allPosts(res.success));
    });
  }, []);

  return (
    // Assign routes to different components
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<Posts />} />
        <Route path="/create" element={<CreateUpdatePosts />} />
        <Route path="/create/:id" element={<CreateUpdatePosts />} />
        <Route path="/update/:id" element={<CreateUpdatePosts />} />
        <Route path="/drafts" element={<Drafts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
