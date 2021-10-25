import axios from "axios";
const baseUrl = "/api/login";

const createLogin = async (user) => {
  const res = await axios.post(baseUrl, user);
  return res.data;
};

export default { createLogin };
