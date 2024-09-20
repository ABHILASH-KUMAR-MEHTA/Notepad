import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesContainer from "./components/NoteContainer/NotesContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const [searchQuery, setSearchQuery] = useState("");

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NotesContainer
        notes={filteredNotes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
      <div className="abhi search-bar-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          style={{ marginBottom: "20px", width: "300px" }}
        />
      </div>
    </div>
  );
}

export default App;
