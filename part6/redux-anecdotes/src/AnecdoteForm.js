import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = (e) => {
    console.log(createAnecdote, props);
    e.preventDefault();
    const newNote = {
      content: e.target.anecdote.value,
      votes: 0,
    };
    props.createAnecdote(newNote);
    props.setNotification("successfully created new note", 5);
    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
