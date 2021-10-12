import React, { useState } from "react";

export default (props) => {
  const { persons, setPersons } = props;

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const checkDuplicate = (value) => {
    const tester = new RegExp(value, "i");
    const matches = persons.filter((person) => tester.test(person.name));
    return matches.length >= 1;
  };

  const addName = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) return;
    if (checkDuplicate(newName)) {
      alert(`${newName} is already present in the phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
