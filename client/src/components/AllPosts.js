import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPostDelete } from "../services/apis";

const AllPosts = (props) => {
  const { title, description, id } = props; // Extracting props
  const navigate = useNavigate();

  const handleEdit = (id) => {
    window.location = `/update/${id}`; // Redirecting to the update page for the specific post
  };

  const handleDelete = async (id) => {
    apiPostDelete(id); // Making an API call to delete the post with the provided id
  };

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`); // Navigating to the specific blog page for the given id
  };
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="card w-screen bg-base-100 shadow-xl m-2  border-2">
          <div className="card-body">
            <h2 className="card-title mb-2">{title}</h2>
            <p>{description}</p>
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
