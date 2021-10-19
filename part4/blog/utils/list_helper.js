const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, post) => {
    if (!post.likes) return total;
    return total + post.likes;
  }, 0);
};

const highestLikes = (blogs) => {
  let highestLiked;
  for (const blog of blogs) {
    if (!highestLiked) highestLiked = blog;
    if (highestLiked.likes < blog.likes) highestLiked = blog;
  }
  return highestLiked;
};

const mostBlogs = (blogs) => {
  const countedAuthors = _.countBy(blogs, "author");
  const result = _.flow([_.entries, _.partialRight(_.maxBy, _.last)])(
    countedAuthors
  );
  if (!result) return;
  return { author: result[0], blogs: result[1] };
};

const mostLikes = (blogs) => {
  const counter = {};
  for (const blog of blogs) {
    if (blog.author in counter) {
      counter[blog.author] += blog.likes;
    } else {
      counter[blog.author] = blog.likes;
    }
  }
  const result = _.flow([_.entries, _.partialRight(_.maxBy, _.last)])(counter);
  if (!result) return;
  return { author: result[0], likes: result[1] };
};

module.exports = {
  dummy,
  totalLikes,
  highestLikes,
  mostBlogs,
  mostLikes,
};
