const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate({
    path: "author",
    select: "username name",
  });
  return response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  if (!request.body.title || !request.user) {
    return response.status(400).end();
  }

  const { user } = request;
  const blogInfo = { ...request.body, author: user };
  const blog = new Blog(blogInfo);

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  if (!request.body) {
    return response.status(400).end();
  }

  const blog = {
    likes: request.body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  return response.json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id);
    if (!request.body.title || !request.user) {
      return response.status(400).end();
    }

    blogToDelete.delete();

    response.status(204).end();
  }
);

module.exports = blogsRouter;
