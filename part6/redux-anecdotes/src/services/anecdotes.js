import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes/";

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNewAnecdote = async (anecdote) => {
    const res = await axios.post(baseUrl, anecdote);
    return res.data;
};

const updateAnecdote = async (updates) => {
    const res = await axios.put(baseUrl + updates.id, updates);
    return res.data;
};


export default { getAll, createNewAnecdote, updateAnecdote };