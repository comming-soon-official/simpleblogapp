import React, { useEffect, useState } from "react";
import { apiGetPostbyId } from "../services/apis";
import { produce } from "immer";
import { useParams } from "react-router-dom";
const Posts = () => {
  const [postinfo, setPostInfo] = useState({
    title: "",
    discription: "",
    content: "",
    published: false,
  });
  const routeParams = useParams();
  useEffect(() => {
    apiGetPostbyId(routeParams.id).then((res) => {
      console.log(res);
      setPostInfo(
        //using immerjs to make mutation simple
        produce((state) => {
          state.title = res.success.title;
          state.discription = res.success.discription;
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
          <h3 className="text-2xl my-2">{postinfo.discription}</h3>
          <div className="prose mt-5">
            <div dangerouslySetInnerHTML={{ __html: postinfo.content }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;

{
  /* <div className="prose">
<div dangerouslySetInnerHTML={{ __html: "<h1>ufuwebg</h1>" }}></div>
</div> */
}
