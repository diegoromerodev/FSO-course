import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

function App() {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
}

export default App;
