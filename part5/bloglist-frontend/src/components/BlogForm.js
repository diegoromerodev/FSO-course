import React, { useState } from "react";
import { addNotification } from "../reducers/notificationsReducer";
import { addBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, url };
      dispatch(addBlog(newBlog));
      setURL("");
      dispatch(
        addNotification("success: " + title + " blog was added successfully.")
      );
      setTitle("");
    } catch (exception) {
      dispatch(addNotification("warning: title or url missing."));
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

export default BlogForm;
