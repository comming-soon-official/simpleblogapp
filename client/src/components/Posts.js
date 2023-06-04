import React, { useEffect, useState } from "react";
import { apiGetPostbyId } from "../services/apis";
import { produce } from "immer";
import { useParams } from "react-router-dom";
const Posts = () => {
  const [postinfo, setPostInfo] = useState({
    title: "",
    description: "",
    content: "",
    published: false,
  });
  const { id: routeParams } = useParams();
  useEffect(() => {
    // Fetching post data by id from the API
    apiGetPostbyId(routeParams).then((res) => {
      console.log(res);

      setPostInfo(
        // Using immer.js to make state mutation simpler
        produce((state) => {
          state.title = res.success.title;
          state.description = res.success.description;
          state.content = res.success.content;
        })
      );
    });
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl font-semibold my-2">{postinfo.title}</h1>
          <h3 className="text-2xl my-2">{postinfo.description}</h3>
          <div className="prose mt-5">
            <div dangerouslySetInnerHTML={{ __html: postinfo.content }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
