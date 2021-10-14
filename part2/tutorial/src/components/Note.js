import React from "react"

export default ({note, toggleImportance}) => {
    const label = note.important ? "make not important" : "make important"
    return (
    <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
    </li>
    )
}