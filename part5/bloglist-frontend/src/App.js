import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import "./App.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("blogUser"));
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createNotification = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(async () => {
    const res = await blogService.getAll();
    setBlogs(res);
  }, []);

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    blogService.setToken(null);
    createNotification({
      text: "logged out",
      type: "success",
    });
  };

  const saveBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.createBlog(newBlog);
    setBlogs((prevState) => prevState.concat(blog));
  };

  const handleDelete = async (blog) => {
    if (window.confirm("remove " + blog.title)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (err) {
        createNotification({
          text: "you can't do that",
          type: "warning",
        });
      }
    }
  };

  const addLike = async (blog) => {
    setBlogs([...blogs]);
    await blogService.updateBlog(blog);
  };

  return (
    <div>
      {message && (
        <div className={"notification " + message.type}>{message.text}</div>
      )}
      {user ? (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>logout</button>
          </p>
          <Togglable ref={blogFormRef} buttonText="create new blog">
            <BlogForm
              createNotification={createNotification}
              saveBlog={saveBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          <div id="blog-list">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleDelete={handleDelete}
                  sendLike={addLike}
                />
              ))}
          </div>
        </div>
      ) : (
        <LoginForm setUser={setUser} createNotification={createNotification} />
      )}
    </div>
  );
};

export default App;
