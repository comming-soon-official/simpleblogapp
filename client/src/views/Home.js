import React from "react";
import AllPosts from "../components/AllPosts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../components/Posts";

const Home = () => {
  //getting posts from redux store
  const allposts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto  ">
        {/*if posts contains it shows posts or else it shows to crete posts*/}
        {allposts.length === 0 ? (
          <div className="flex flex-row justify-center">
            <div className="card w-96 bg-base-100 shadow-xl m-2  border-2">
              <div className="card-body">
                <h2 className="card-title mb-2">Opps!</h2>
                <p className="mb-2">
                  It Seem we have No Blogs, <br />
                  Why Don't We create New Post
                </p>
                <div>
                  <button
                    onClick={() => navigate("/create")}
                    className="mx-2 btn btn-secondary"
                  >
                    Create New
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          allposts.map((items, i) => (
            <AllPosts
              key={i}
              id={items._id}
              title={items.title}
              discription={items.discription}
              content={items.content}
            />
          ))
        )}
        {/* create post button */}
        <div className="fixed bottom-24 right-24">
          <button
            onClick={() => navigate("/create")}
            className="group flex w-16 h-16 btn btn-success rounded-full hover:w-36"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(3 3)"
              >
                <path d="m7 1.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682" />

                <path d="m14.5.46667982c.5549155.5734054.5474396 1.48588056-.0167966 2.05011677l-6.9832034 6.98320341-3 1 1-3 6.9874295-7.04563515c.5136195-.5178979 1.3296676-.55351813 1.8848509-.1045243z" />

                <path d="m12.5 2.5.953 1" />
              </g>
            </svg>
            <p className="hidden group-hover:block">Create</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
