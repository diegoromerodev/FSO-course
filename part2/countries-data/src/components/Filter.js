import React from "react";

export default (props) => {
  const { filter, setFilter } = props;
  return (
    <div>
      find countries:{" "}
      <input
        type="text"
        name="filter"
        value={filter}
        placeholder="start typing... NOW!"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
