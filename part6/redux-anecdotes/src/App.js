import React, { useEffect } from "react";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import {initAnecdotes} from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        anecdoteService.getAll()
            .then((data) => dispatch(initAnecdotes(data)));
    }, []);

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
