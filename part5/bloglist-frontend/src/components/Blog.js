import React from "react";
const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author.name ? blog.author.name : "Unknown"}
  </div>
);

export default Blog;
