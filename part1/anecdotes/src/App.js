import React, { useState } from "react";

function App() {
  const anecdotes = [
    "Adding manpower to a late software project makes it later!",
    "The best way to get a project done faster is to start sooner",
    "How does a project get to be a year late?... One day at a time.",
    "Before software can be reusable it first has to be usable.",
    "Why do we never have time to do it right, but always have time to do it over?.",
    "Inside every large program, there is a small program trying to get out.",
    "Optimism is an occupational hazard of programming: feedback is the treatment.",
  ];

  const [selected, setSelected] = useState(1);
  const [votes, setVotes] = useState({});
  const [topAnecdote, setTopAnecdote] = useState(1);
  const generateAnecdote = () => {
    let newSelected;
    do {
      newSelected = Math.floor(Math.random() * anecdotes.length);
    } while (selected === newSelected);
    setSelected(newSelected);
  };

  const selectTopAnecdote = (allVotes) => {
    let index = 1;
    let highestVotes = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (allVotes[i] >= highestVotes) {
        index = i;
        highestVotes = allVotes[i];
      }
    }
    setTopAnecdote(index);
  };

  const voteForAnecdote = () => {
    const newVotes = { ...votes };
    if (newVotes[selected]) {
      newVotes[selected] += 1;
    } else {
      newVotes[selected] = 1;
    }
    setVotes(newVotes);
    selectTopAnecdote(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected] || 0} vote{votes[selected] === 1 ? "" : "s"}
      </p>
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
      <h2>Most voted anecdote</h2>
      <p>{anecdotes[topAnecdote]}</p>
      <p>
        has {votes[topAnecdote] || 0} vote{votes[topAnecdote] === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export default App;
