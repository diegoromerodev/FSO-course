import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAnecdote(e.target.anecdote.value));
        dispatch(setNotification("successfully created new note"));
        e.target.anecdote.value = "";
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;