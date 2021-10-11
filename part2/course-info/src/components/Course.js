import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

export default (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
