import { useSelector } from "react-redux";
import { useParams } from "react-router";
import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  const params = useParams();
  const blogsById = useSelector(({ blogs }) => {
    return blogs.filter((b) => b.author.id === params.userId);
  });

  if (!blogsById.length) return null;

  return (
    <div>
      <h1>{blogsById[0].author.name}</h1>
      {blogsById.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={"/" + blog.id}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default User;
