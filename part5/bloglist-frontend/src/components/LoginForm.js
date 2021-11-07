import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../reducers/notificationsReducer";
import { sendLogin } from "../reducers/sessionReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { username, password };
      dispatch(sendLogin(user));
      setPassword("");
      dispatch(addNotification("success: logged in as " + username));
      setUsername("");
    } catch (exception) {
      dispatch(addNotification("warning: wrong username or password"));
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
