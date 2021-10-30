import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";
import {setNotification} from "./reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        const anecdoteState = anecdotes.sort((a, b) => b.votes - a.votes);
        if(!filter) return anecdoteState;
        return anecdoteState.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
    } );
    const dispatch = useDispatch();

    const vote = ({id, content}) => {
        dispatch(setNotification("you voted voted for '" + content + "'"));
        dispatch(addVote(id));
    };

    return <div>
        {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
            has
                    {" "}
                    {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        ))}
    </div>;
};

export default AnecdoteList;