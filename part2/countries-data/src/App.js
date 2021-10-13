import React, { useState } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");
  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />{" "}
      <Countries filter={filter} />{" "}
    </>
  );
}

export default App;
