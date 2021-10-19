const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("no posts", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test("single blog post", () => {
    const likes = listHelper.totalLikes([blogs[0]]);
    expect(likes).toBe(blogs[0].likes);
  });
  test("many posts", () => {
    const likes = listHelper.totalLikes(blogs);
    expect(likes).toBe(36);
  });
});

describe("highest liked", () => {
  test("no posts", () => {
    expect(listHelper.highestLikes([])).toBe(undefined);
  });

  test("single post", () => {
    const onePost = blogs[0];
    expect(listHelper.highestLikes([onePost])).toEqual(onePost);
  });

  test("multiple posts", () => {
    const mostLiked = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))[0];
    expect(listHelper.highestLikes(blogs)).toEqual(mostLiked);
  });
});

describe("author with most posts", () => {
  test("no posts", () => {
    expect(listHelper.mostBlogs([])).toBe(undefined);
  });

  test("one post", () => {
    expect(listHelper.mostBlogs([blogs[0]])).toEqual({
      author: blogs[0].author,
      blogs: 1,
    });
  });

  test("multiple posts", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with most likes", () => {
  test("no posts", () => {
    expect(listHelper.mostLikes([])).toBe(undefined);
  });

  test("one post", () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual({
      author: blogs[0].author,
      likes: blogs[0].likes,
    });
  });

  test("multiple posts", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("", () => {});

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
