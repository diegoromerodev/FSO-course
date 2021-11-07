import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTable = styled.table`
  margin: 0 auto;
  thead tr {
    background-color: #333;
    color: #fafafa;
    vertical-align: middle;
    text-align: center;
  }
  thead th {
    padding: 10px;
  }
  tbody td {
    padding: 20px;
  }
  tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

const StyledH2 = styled.h2`
  text-align: center;
`;

const Users = () => {
  const usersInfo = useSelector((state) => {
    return state.blogs.reduce((users, currBlog) => {
      users[currBlog.author.name] = {
        blogs: state.blogs.filter(
          (b) => (b.author.name = currBlog.author.name)
        ),
        id: currBlog.author.id,
      };
      return users;
    }, {});
  });
  return (
    <div>
      <StyledH2>Users</StyledH2>
      <StyledTable>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(usersInfo).map((user) => {
            return (
              <tr key={user}>
                <td>
                  <Link to={`${usersInfo[user].id}`}>{user}</Link>
                </td>
                <td>{usersInfo[user].blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Users;
