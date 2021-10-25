import axios from "axios";
const baseUrl = "/api/blogs";

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

export default { getAll, setToken, createBlog };
