import axios from "axios";
const baseUrl = "/api/blogs/";

let token;

const setToken = (storedToken) => {
  token = {
    Authorization: `Bearer ${storedToken}`,
  };
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, { headers: token });
  return res.data;
};

const updateBlog = async (blog) => {
  const res = await axios.put(baseUrl + blog.id, blog, { headers: token });
  return res.data;
};

const deleteBlog = async (id) => {
  return await axios.delete(baseUrl + id, { headers: token });
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
