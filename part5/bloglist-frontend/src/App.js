import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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
          <BlogForm
            setBlogs={setBlogs}
            createNotification={createNotification}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm setUser={setUser} createNotification={createNotification} />
      )}
    </div>
  );
};

export default App;
