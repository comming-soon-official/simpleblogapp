import React, { useEffect, useState } from "react";
import AllDrafts from "../components/AllDrafts";
import { useSelector } from "react-redux";

const Drafts = () => {
  // Getting drafts from Redux store
  const alldrafts = useSelector((state) => state.posts.drafts);

  return (
    <div>
      {/* Check if there are no drafts */}
      {alldrafts.length === 0 ? (
        <div>
          <h1 className="text-4xl my-5 flex justify-center">
            it Seems there is no drafts
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-4xl my-5">Drafts</h1>

          {/* Render all drafts */}
          <div className="flex flex-wrap justify-center md:justify-start">
            {alldrafts.map((items, i) => (
              <AllDrafts
                key={i}
                id={items._id}
                title={items.title}
                description={items.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Drafts;
