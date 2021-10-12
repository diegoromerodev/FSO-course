import React from "react";
import PersonItem from "./PersonItem";

export default ({ persons, filter }) => {
  return (
    <>
      {persons.reduce((personsResult, person) => {
        if (filter && !person.name.includes(filter)) return personsResult;
        personsResult.push(<PersonItem key={person.id} person={person} />);
        return personsResult;
      }, [])}
    </>
  );
};
