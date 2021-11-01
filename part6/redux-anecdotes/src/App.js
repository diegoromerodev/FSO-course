import React from "react";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
