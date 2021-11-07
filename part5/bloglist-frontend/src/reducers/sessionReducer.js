import blogs from "../services/blogs";
import login from "../services/login";

const sessionReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

export default sessionReducer;

export const sendLogin = (user) => {
  return async (dispatch) => {
    const userRes = await login.createLogin(user);
    localStorage.setItem("blogUser", JSON.stringify(userRes));
    blogs.setToken(userRes.token);
    dispatch({
      type: "SET_USER",
      user: userRes,
    });
  };
};

export const existingLogin = (user) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      user,
    });
    blogs.setToken(user.token);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      user: null,
    });
    blogs.setToken(null);
    localStorage.clear();
  };
};
