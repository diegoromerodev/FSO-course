import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { addNotification } from "../reducers/notificationsReducer";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));
  const [commentText, setCommentText] = useState("");

  if (!blog) return null;

  const addLike = async () => {
    blog.likes++;
    dispatch(updateBlog(blog));
  };

  const deleteClick = async () => {
    if (window.confirm("remove " + blog.title)) {
      try {
        dispatch(deleteBlog(blog.id));
        const message = "success: deleted " + blog.title;
        dispatch(addNotification(message));
      } catch (err) {
        const message = "warning: you can't do that";
        dispatch(addNotification(message));
      }
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!blog.comments) {
      blog.comments = [];
    }
    blog.comments.push(commentText);
    setCommentText("");
    dispatch(updateBlog(blog));
  };

  return (
    <div
      style={{ border: "1px solid #333", padding: 5, margin: 2 }}
      className="details"
    >
      {blog.title} <p>{blog.author.name ? blog.author.name : "Unknown"} </p>
      <div className="more-details">
        <p>{blog.url}</p>
        <p>
          <span className="likes">{blog.likes} like(s) </span>
          <button className="like-button" onClick={addLike}>
            like
          </button>
        </p>
      </div>
      <button onClick={deleteClick}>remove</button>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        ></input>
        <input type="submit" value="save comment"></input>
      </form>
      <h3>comments</h3>
      {blog.comments &&
        blog.comments.map((comment) => {
          return <p key={comment.slice(4)}>{comment}</p>;
        })}
    </div>
  );
};

export default Blog;
