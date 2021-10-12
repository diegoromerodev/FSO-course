import { useState } from 'react';
import './App.css';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = (e) => {
        e.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            date: new Date().toISOString(),
            id: notes.length + 1,
        }
        setNotes(notes.concat(noteObject));
        setNewNote("")
    }

    const handleChange = (e) => {
        setNewNote(e.target.value);
    }

    const showSome = () => setShowAll(!showAll)

    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
        <button onClick={showSome} >{showAll ? "show important" : "show all"}</button>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleChange} />
            <button type="submit">save</button>
        </form>
      </div>
    )
}

export default App;
