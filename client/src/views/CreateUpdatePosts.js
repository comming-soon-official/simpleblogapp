import React, { useCallback, useEffect, useState } from "react";
import { produce } from "immer";

import { useDebounce } from "use-debounce";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { apiPostCreate, apiPostUpdate } from "../services/apis";

const CreateUpdatePosts = () => {
  const location = useLocation(); //using to get the state parameterd from Posts Page
  const receivedProps = location.state; //storing values in a constant variable called receivedProps

  const [postinfo, setPostInfo] = useState({
    title: "",
    discription: "",
    content: "",
    published: false,
  });
  const [changeMode, setChangeMode] = useState(false); //its to manage contnents of our editor
  const [postId, setPostId] = useState(
    receivedProps?.id ? receivedProps.id : ""
  );
  const [value] = useDebounce(postinfo, 1000); //using debounce for autosave
  const navigate = useNavigate();

  useEffect(() => {
    if (postId === "") {
      apiPostCreate(
        postinfo.title,
        postinfo.discription,
        postinfo.content,
        false
      ).then((res) => {
        if (res.success) {
          setPostId(() => res.success._id);
          setChangeMode(() => true);
        }
      });
    }
    if (changeMode) {
      apiPostUpdate(
        postId,
        postinfo.title,
        postinfo.discription,
        postinfo.content,
        false
      );
    }
  }, [value]);

  //to update states that received value from posts
  useEffect(() => {
    //checking if value present in receivedProps it will update
    if (receivedProps) {
      setPostInfo(
        //using immerjs to make mutation simple
        produce((state) => {
          state.title = receivedProps.title;
          state.discription = receivedProps.discription;
          state.content = receivedProps.content;
        })
      );
    }
  }, []);

  //to update title state from event handlers
  const handleFillTitle = (e) => {
    let title = e.target.value;
    setPostInfo(
      produce((state) => {
        state.title = title;
      })
    );
  };

  //to update discription state from event handlers

  const handleFillDiscription = (e) => {
    let discription = e.target.value;
    setPostInfo(
      produce((state) => {
        state.discription = discription;
      })
    );
  };

  const CreateNewPost = async () => {
    // if receivedProps have data it will execute update function or else it will create new post
    if (receivedProps) {
      apiPostUpdate(
        receivedProps.id,
        postinfo.title,
        postinfo.discription,
        postinfo.content,
        false
      ).then((res) => {
        if (res.success) {
          navigate("/");
        }
      });
    } else {
      apiPostCreate(
        postinfo.title,
        postinfo.discription,
        postinfo.content,
        postinfo.published,
        false
      ).then((res) => {
        if (res.success) {
          navigate("/");
        }
      });
    }
  };
  const handleChange = (content) => {
    setPostInfo(
      produce((state) => {
        state.content = content;
      })
    );
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="card w-[50%] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-xl font-bold">
            {receivedProps ? "Update Post" : "Create New Post"}
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label className="block mb-2 text-sm font-medium ">Title</label>
              <input
                onChange={handleFillTitle}
                value={postinfo.title}
                type="text"
                className="input input-bordered w-full  mb-2"
                placeholder="Eg:- Himal's New Invention"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium ">
                discription
              </label>
              <textarea
                onChange={handleFillDiscription}
                value={postinfo.discription}
                placeholder="say something you like"
                className="textarea textarea-bordered "
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium mt-3">
                Publish
              </label>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={() =>
                  setPostInfo(
                    produce((state) => {
                      state.published = !state.published;
                    })
                  )
                }
                checked={postinfo.published}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium ">Content</label>
            <ReactQuill
              theme="snow"
              value={postinfo.content}
              onChange={handleChange}
              // modules={modules}
            />
          </div>
        </div>
        <button onClick={CreateNewPost} className="btn btn-secondary">
          {receivedProps ? "Save Post" : "Create New Post"}
        </button>
      </div>
    </div>
  );
};

export default CreateUpdatePosts;