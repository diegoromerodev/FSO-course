import React from "react";

export default ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
