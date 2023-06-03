import React, { useEffect, useState } from "react";
import AllDrafts from "../components/AllDrafts";
import { useSelector } from "react-redux";

const Drafts = () => {
  //getting drafts from redux store
  const alldrafts = useSelector((state) => state.posts.drafts);
  return (
    <div>
      {alldrafts.length === 0 ? (
        <div>
          <h1 className="text-4xl my-5">it Seems there is no drafts</h1>
        </div>
      ) : (
        <>
          <h1 className="text-4xl my-5">Drafts</h1>

          <div className="flex flex-wrap justify-center md:justify-start">
            {alldrafts.map((items, i) => (
              <AllDrafts
                key={i}
                id={items._id}
                title={items.title}
                discription={items.discription}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Drafts;
