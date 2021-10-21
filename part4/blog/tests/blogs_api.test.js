const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./helper");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe("basic crud for blogs", () => {
  test("returns all blogs", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("must have id property", async () => {
    const currentBlogs = await helper.currentBlogs();
    for (const blog of currentBlogs) {
      expect(blog.id).toBeDefined();
    }
  });

  test("can post blog", async () => {
    const newBlog = {
      title: "Diego Romero",
      author: "El Diego",
      url: "whatever.com",
      likes: 5,
    };

    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /json/);
    delete res.body.id;
    expect(res.body).toEqual(newBlog);

    const blogsNow = await helper.currentBlogs();
    expect(blogsNow).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("likes should default to 0", async () => {
    const newBlog = {
      title: "Diego Romero",
      author: "El Diego",
      url: "whatever.com",
    };

    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body.likes).toBe(0);
  });

  test("receives 400 status when missing title or url", async () => {
    const newBlog = {
      author: "El Diego",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("should delete with id", async () => {
    const blogId = helper.initialBlogs[0]._id;
    await api.delete("/api/blogs/" + blogId).expect(204);
    const currBlogs = await helper.currentBlogs();
    expect(currBlogs.length).toBe(helper.initialBlogs.length - 1);
  });

  test("should update blog likes", async () => {
    const blogId = helper.initialBlogs[0]._id;
    const moreLikes = { likes: 250 };
    const updatedBlog = await api
      .put("/api/blogs/" + blogId)
      .send(moreLikes)
      .expect(200)
      .expect("Content-Type", /json/);

    console.log(updatedBlog.body);

    expect(updatedBlog.body.likes).toBe(moreLikes.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
