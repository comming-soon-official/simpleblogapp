import React from "react";
import { useNavigate } from "react-router-dom";
import { apiPostDelete } from "../services/apis";

const AllDrafts = (props) => {
  const { title, discription, id } = props; // getting all props from Draft.js
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
      <div className="">
        <div className="card max-w-md w-fit bg-base-100 shadow-lg border-2 m-5 md:w-[430px]">
          <div className="card-body">
            <h2 className="card-title mb-2">{title}</h2>
            <p>{discription}</p>
            <div>
              <button
                onClick={() => handleReadMore(id)}
                className="mx-2 btn btn-secondary"
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
