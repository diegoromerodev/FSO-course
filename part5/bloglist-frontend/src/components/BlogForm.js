import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createNotification, saveBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, url };
      saveBlog(newBlog);
      setURL("");
      createNotification({
        text: title + " blog was added successfully.",
        type: "success",
      });
      setTitle("");
    } catch (exception) {
      createNotification({
        text: "title or url missing.",
        type: "warning",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:{" "}
        <input
          id="title-field"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        url:{" "}
        <input
          id="url-field"
          value={url}
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button>save blog</button>
    </form>
  );
};

BlogForm.propTypes = {
  createNotification: PropTypes.func.isRequired,
  saveBlog: PropTypes.func.isRequired,
};

export default BlogForm;
