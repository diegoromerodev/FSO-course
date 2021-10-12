import React from "react";

export default (props) => {
  const { person } = props;
  return (
    <p>
      {person.name} - {person.number}
    </p>
  );
};
