import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addVote, initAnecdotes } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = ({ id, content }) => {
    props.setNotification("you voted for '" + content + "'", 5);
    props.addVote(id);
  };

  useEffect(() => props.initAnecdotes(), []);

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const sortedAnecdotes = state.anecdotes.sort((a, b) => b.votes - a.votes);
  if (!state.filter) return { anecdotes: sortedAnecdotes };
  return {
    anecdotes: sortedAnecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAnecdotes: () => dispatch(initAnecdotes()),
    setNotification: (content, delay) =>
      dispatch(setNotification(content, delay)),
    addVote: (id) => dispatch(addVote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
