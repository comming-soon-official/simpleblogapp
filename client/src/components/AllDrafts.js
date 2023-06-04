import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPostDelete } from "../services/apis";

const AllDrafts = (props) => {
  const { title, description, id } = props; // Extracting props
  const navigate = useNavigate();

  const handleEdit = (id) => {
    window.location = `/update/${id}`; // Redirecting to the update page for the specific draft
  };

  const handleDelete = async (id) => {
    apiPostDelete(id); // Making an API call to delete the draft with the provided id
  };

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`); // Navigating to the specific blog page for the given id
  };
  return (
    <>
      <div className="">
        <div className="card max-w-md w-fit bg-base-100 shadow-lg border-2 m-5 md:w-[430px]">
          <div className="card-body">
            <h2 className="card-title mb-2">{title}</h2>
            <p>{description}</p>
            <div>
              <button
                onClick={() => handleReadMore(id)}
                className="mx-2 btn btn-primary"
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

export default AllDrafts;
