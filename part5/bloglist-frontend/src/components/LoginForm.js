import React, { useState } from "react";
import blogs from "../services/blogs";
import login from "../services/login";

const LoginForm = ({ setUser, createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { username, password };
      const res = await login.createLogin(user);
      setUser(res);
      localStorage.setItem("blogUser", JSON.stringify(res));
      blogs.setToken(res.token);
      setPassword("");
      createNotification({
        text: "logged in as " + username,
        type: "success",
      });
      setUsername("");
    } catch (exception) {
      createNotification({
        text: "wrong username or password",
        type: "warning",
      });
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
