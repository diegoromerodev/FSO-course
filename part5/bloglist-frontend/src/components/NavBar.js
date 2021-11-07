import React from "react";
import { useDispatch } from "react-redux";
import blogs from "../services/blogs";
import { addNotification } from "../reducers/notificationsReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  background: #bdcbbc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 60vh;
  gap: 10px;
  button {
    border: none;
    cursor: pointer;
    padding: 5px;
    background: #222;
    color: #fafafa;
    border-radius: 5px;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  h2 {
    font-size: 2rem;
    letter-spacing: -2px;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  const logOut = () => {
    dispatch(logOut());
    localStorage.clear();
    blogs.setToken(null);
    const message = "success: logged out";
    dispatch(addNotification(message));
  };

  return (
    <StyledNavBar>
      <h2>Diego&apos;s Blog</h2>
      <p>
        <Link to="/">blogs</Link>
      </p>
      <p>
        <Link to="/users">users</Link>
      </p>
      <p>
        {user.name} logged in <button onClick={logOut}>logout</button>
      </p>
    </StyledNavBar>
  );
};

export default NavBar;
