import React, { useEffect, useState, useRef } from "react";
import { produce } from "immer";
import { useDebounce } from "use-debounce";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { apiGetPostbyId, apiPostCreate, apiPostUpdate } from "../services/apis";
const CreateUpdatePosts = () => {
  const { id: routerparamsId } = useParams();

  const [postinfo, setPostInfo] = useState({
    title: "",
    description: "",
    content: "",
    published: false,
  });
  const [value] = useDebounce(postinfo, 1000);
  const refer = useRef(false);
  const updateref = useRef(false);

  useEffect(() => {
    // Fetch post information by ID
    apiGetPostbyId(routerparamsId)
      .then((res) => {
        console.log(res);
        setPostInfo(
          produce((state) => {
            state.title = res.success.title;
            state.description = res.success.description;
            state.content = res.success.content;
            state.published = false;
          })
        );
      })
      .then(() => {
        updateref.current = true;
      });
  }, [routerparamsId]);

  useEffect(() => {
    if (typeof routerparamsId === "undefined" && !refer.current) {
      refer.current = true;
      // Create a new post
      apiPostCreate(
        postinfo.title,
        postinfo.description,
        postinfo.content,
        false
      ).then((res) => {
        console.log("hello");
        if (res.success) {
          window.location = `/create/${res.success._id}`;
        }
      });
    }
    if (updateref.current) {
      // Update an existing post
      apiPostUpdate(
        routerparamsId,
        postinfo.title,
        postinfo.description,
        postinfo.content,
        false
      );
    }
  }, [value]);

  const handleFillTitle = (e) => {
    let title = e.target.value;
    setPostInfo(
      produce((state) => {
        state.title = title;
      })
    );
  };

  const handleFillDescription = (e) => {
    let description = e.target.value; // Renamed from "discription"
    setPostInfo(
      produce((state) => {
        state.description = description;
      })
    );
  };

  const CreateNewPost = async () => {
    if (routerparamsId) {
      // Update an existing post
      apiPostUpdate(
        routerparamsId,
        postinfo.title,
        postinfo.description,
        postinfo.content,
        postinfo.published
      ).then((res) => {
        if (res.success) {
          console.log(postinfo.published);
        }
      });
    } else {
      // Create a new post
      apiPostCreate(
        postinfo.title,
        postinfo.description,
        postinfo.content,
        postinfo.published
      ).then((res) => {
        if (res.success) {
          console.log(postinfo.published);
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
                description
              </label>
              <textarea
                onChange={handleFilldescription}
                value={postinfo.description}
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
            />
          </div>
        </div>
        <button onClick={CreateNewPost} className="btn btn-secondary">
          {"Save Post"}
        </button>
      </div>
    </div>
  );
};

export default CreateUpdatePosts;
