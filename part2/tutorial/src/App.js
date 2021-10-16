import React, { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import Notification from './components/Notification';
import { create, getAll, update } from './services/notes';

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        getAll()
        .then(setNotes)
    }

    useEffect(hook, [])

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = (e) => {
        e.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            date: new Date().toISOString(),
            id: notes.length + 1,
        }
        create(noteObject).then(() => {
            setNotes(notes.concat(noteObject));
            setNewNote("")
        })
    }

    const handleChange = (e) => {
        setNewNote(e.target.value);
    }

    const showSome = () => setShowAll(!showAll)

    const toggleImportance = (note) => {
        const editedNote = {...note, important: !note.important}
        update(editedNote.id, editedNote)
        .then((notesData) => {
            setNotes(notes.map(noteEl => noteEl.id === editedNote.id ? notesData : noteEl))
        })
        .catch(error => {
            setErrorMessage(
              `the note '${note.content}' was already deleted from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            setNotes(notes.filter(n => n.id !== note.id))
        })
    }

    return (
      <div>
          <Notification message={errorMessage} />
        <h1>Notes</h1>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} 
                toggleImportance={() => toggleImportance(note)}/>
          ))}
        </ul>
        <button onClick={showSome} >{showAll ? "show important" : "show all"}</button>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleChange} />
            <button type="submit">save</button>
        </form>
        <Footer></Footer>
      </div>
    )
}

export default App;
