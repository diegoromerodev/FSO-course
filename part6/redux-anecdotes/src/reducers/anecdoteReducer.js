import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
    console.log("state now: ", state);
    console.log("action", action);

    switch(action.type) {
    case "ADD_VOTE":
        const updatedNote = action.data;
        return state.map(ane => ane.id !== updatedNote.id ? ane : updatedNote);
    case "CREATE_ANECDOTE":
        return [...state, action.data];
    case "INIT_ANECDOTES":
        return action.data;
    default:
        return state;
    }
};

export const addVote = (id) => {
    return async (dispatch, getState) => {
        const {anecdotes} = getState();
        const toVote = anecdotes.find(a => a.id === id);
        const updatedAnecdote = {
            ...toVote,
            votes: toVote.votes + 1
        };
        const savedAnecdote = await anecdotesService.updateAnecdote(updatedAnecdote);
        dispatch({
            type: "ADD_VOTE",
            data: savedAnecdote
        });
    };
};

export const createAnecdote = (note) => {
    return async (dispatch) => {
        const savedNote = await anecdotesService.createNewAnecdote(note);
        dispatch({
            type: "CREATE_ANECDOTE",
            data: savedNote
        });
    };
};

export const initAnecdotes = () => {
    return async (dispatch) => {
        const initialState = await anecdotesService.getAll();
        dispatch({
            type: "INIT_ANECDOTES",
            data: initialState
        });
    };
};

export default reducer;