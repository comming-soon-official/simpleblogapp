import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          MyBlogs
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <a href="/" className="btn">
            Posts
          </a>
        </div>
        <div className="form-control">
          <a href="/drafts" className="btn">
            Drafts
          </a>
        </div>
        <div className="form-control">
          <a href="/create" className="btn btn-primary">
            Let's Create Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
