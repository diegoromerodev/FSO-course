import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsServices from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsServices.getAll().then(setPersons);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  );
}

export default App;
