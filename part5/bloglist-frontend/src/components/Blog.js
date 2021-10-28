import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, sendLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const addLike = async () => {
    blog.likes++;
    setLikes(blog.likes);
    sendLike(blog);
  };

  const deleteClick = () => {
    handleDelete(blog);
  };

  return (
    <div
      style={{ border: "1px solid #333", padding: 5, margin: 2 }}
      className="details"
    >
      {blog.title} <p>{blog.author.name ? blog.author.name : "Unknown"} </p>
      <button onClick={toggleDetails}>{showDetails ? "hide" : "show"}</button>
      <div
        style={{ display: showDetails ? "" : "none" }}
        className="more-details"
      >
        <p>{blog.url}</p>
        <p>
          <span className="likes">{likes} likes </span>
          <button className="like-button" onClick={addLike}>
            like
          </button>
        </p>
      </div>
      <button onClick={deleteClick}>remove</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  sendLike: PropTypes.func.isRequired,
};

export default Blog;
