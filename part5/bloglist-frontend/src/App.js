import React, { useEffect } from "react";
import "./App.css";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import { useDispatch } from "react-redux";
import { setBlogs } from "./reducers/blogsReducer";
import { useSelector } from "react-redux";
import { existingLogin } from "./reducers/sessionReducer";
import User from "./components/User";
import NavBar from "./components/NavBar";

const App = () => {
  const message = useSelector((state) => state.notification);
  const user = useSelector((state) => state.session);

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(setBlogs());
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("blogUser"));
    if (user) {
      dispatch(existingLogin(user));
    }
  }, []);

  return (
    <>
      {message && (
        <div className={"notification " + message.split(":")[0]}>{message}</div>
      )}
      {user && <NavBar />}
      <Routes>
        <Route path="/:blogId" element={<Blog />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </>
  );
};

export default App;
