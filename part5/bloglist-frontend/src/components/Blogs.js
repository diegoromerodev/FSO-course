import React, { useRef } from "react";
import BlogForm from "./BlogForm";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.session);

  const blogFormRef = useRef();

  const saveBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(newBlog));
  };

  const BlogsCont = styled.div`
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
  `;

  return (
    <div>
      {user ? (
        <BlogsCont>
          <Togglable ref={blogFormRef} buttonText="create new blog">
            <BlogForm saveBlog={saveBlog} />
          </Togglable>
          <h2>blogs</h2>
          <div id="blog-list">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <div key={blog.id}>
                  <Link to={blog.id}>{blog.title}</Link>
                </div>
              ))}
          </div>
        </BlogsCont>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Blogs;
