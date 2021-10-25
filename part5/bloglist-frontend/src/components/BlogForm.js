import React, { useState } from "react";
import blogs from "../services/blogs";

const BlogForm = ({ setBlogs, createNotification }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogs.createBlog({ title, url });
      setBlogs((prevState) => prevState.concat(newBlog));
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
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        url:{" "}
        <input value={url} onChange={({ target }) => setURL(target.value)} />
      </div>
      <button>save blog</button>
    </form>
  );
};

export default BlogForm;
