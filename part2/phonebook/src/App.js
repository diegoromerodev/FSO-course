import React, { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arturo Romero", number: "222-2232-545", id: 1 },
    { name: "Diego Romero", number: "222-7832-545", id: 2 },
    { name: "Maria Romero", number: "222-5532-545", id: 3 },
  ]);

  const [filter, setFilter] = useState("");

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
