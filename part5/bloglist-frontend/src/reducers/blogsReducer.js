import blogServices from "../services/blogs";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.blogs;
    case "ADD_BLOG":
      return [...state, action.blog];
    case "UPDATE_BLOG":
      return state.map((b) => (b.id !== action.blog.id ? b : action.blog));
    case "DELETE_BLOG":
      return state.filter((b) => b.id !== action.id);
    default:
      return state;
  }
};

export default blogsReducer;

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch({
      type: "SET_BLOGS",
      blogs,
    });
  };
};

export const addBlog = (blogData) => {
  return async (dispatch) => {
    const blog = await blogServices.createBlog(blogData);
    dispatch({
      type: "ADD_BLOG",
      blog,
    });
  };
};

export const updateBlog = (blogData, comment = false) => {
  return async (dispatch) => {
    if (!comment) {
      await blogServices.updateBlog(blogData);
    } else {
      await blogServices.addComment(blogData);
    }
    dispatch({
      type: "UPDATE_BLOG",
      blog: blogData,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogServices.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      id,
    });
  };
};
