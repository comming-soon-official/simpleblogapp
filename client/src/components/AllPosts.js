import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPostDelete } from "../services/apis";

const AllPosts = (props) => {
  const { title, discription, id, content } = props; //getting all props from Home.js
  const navigate = useNavigate();

  //to update Posts sending detials in navigation params to edit page
  const handleEdit = (id) => {
    window.location = `/update/${id}`;
  };

  //deleting post using id
  const handleDelete = async (id) => {
    apiPostDelete(id);
  };

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="card w-screen bg-base-100 shadow-xl m-2  border-2">
          <div className="card-body">
            <h2 className="card-title mb-2">{title}</h2>
            <p>{discription}</p>
            <div className="mt-5">
              <button
                className="mx-2 btn btn-primary"
                onClick={() => handleReadMore(id)}
              >
                Read More...
              </button>

              <button
                onClick={() => handleEdit(id)}
                className="mx-2 btn btn-secondary"
              >
                Edit
              </button>
              <button
                className="mx-2 btn btn-error"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPosts;
