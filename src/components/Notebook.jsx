import React, { useState } from 'react';
import { PenTool, X } from 'lucide-react';

function Notebook() {
    const [notes, setNotes] = useState([
        { id: 1, text: 'Research AI Agent frameworks' },
        { id: 2, text: 'Draft Car Rental DB Schema' },
    ]);
    const [newNote, setNewNote] = useState('');

    const addNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        setNotes([...notes, { id: Date.now(), text: newNote }]);
        setNewNote('');
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <div className="notebook-panel" style={{
            background: '#1e1e20', /* Darker paper */
            color: '#e4e4e7',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h2 style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '2rem',
                color: '#f59e0b', /* Amber */
                borderBottom: '1px solid #3f3f46',
                paddingBottom: '0.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <PenTool size={24} /> Ideas & Scratchpad
            </h2>

            <form onSubmit={addNote} style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write something brilliant..."
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px dashed #52525b',
                        padding: '0.5rem',
                        fontFamily: '"Caveat", cursive',
                        fontSize: '1.5rem',
                        color: '#fff',
                        outline: 'none'
                    }}
                />
            </form>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                overflowY: 'auto',
                flex: 1
            }}>
                {notes.map(note => (
                    <div
                        key={note.id}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            fontFamily: '"Caveat", cursive',
                            fontSize: '1.4rem',
                            lineHeight: '1.4',
                            color: '#d4d4d8'
                        }}
                    >
                        <span>- {note.text}</span>
                        <button
                            onClick={() => deleteNote(note.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', opacity: 0.5, marginTop: '5px' }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {/* CSS for Dot Grid & Font */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        .notebook-panel {
          background-image: radial-gradient(#3f3f46 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
        </div>
    );
}

export default Notebook;
