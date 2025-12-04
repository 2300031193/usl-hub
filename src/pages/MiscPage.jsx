import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { StickyNote, Plus, Trash2, Save, Edit3 } from 'lucide-react';

const MiscPage = () => {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);

    useEffect(() => {
        const saved = storage.getItem('usl_misc', []);
        setNotes(saved);
        if (saved.length > 0) setActiveNote(saved[0]);
    }, []);

    const saveNote = () => {
        if (!activeNote) return;

        const updatedNotes = notes.map(n => n.id === activeNote.id ? { ...activeNote, updatedAt: Date.now() } : n);

        // If it's a new note not in the list yet
        if (!notes.find(n => n.id === activeNote.id)) {
            updatedNotes.push({ ...activeNote, updatedAt: Date.now() });
        }

        setNotes(updatedNotes);
        storage.setItem('usl_misc', updatedNotes);
    };

    const createNote = () => {
        const newNote = {
            id: crypto.randomUUID(),
            title: 'New Note',
            content: '',
            updatedAt: Date.now()
        };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote);
    };

    const deleteNote = (id) => {
        if (window.confirm('Delete this note?')) {
            const updated = notes.filter(n => n.id !== id);
            setNotes(updated);
            storage.setItem('usl_misc', updated);
            if (activeNote?.id === id) setActiveNote(null);
        }
    };

    return (
        <div className="container fade-in h-[calc(100vh-100px)] flex flex-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2><StickyNote className="text-purple-400 mr-2" /> Misc / Notes</h2>
                <button onClick={createNote} className="btn bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                    <Plus size={18} /> New Note
                </button>
            </div>

            <div className="glass-panel flex-1 flex overflow-hidden p-0">
                {/* Sidebar List */}
                <div className="w-1/3 border-r border-white/10 flex flex-col bg-black/20">
                    <div className="p-4 border-b border-white/10">
                        <input
                            placeholder="Search notes..."
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm text-white outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => setActiveNote(note)}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeNote?.id === note.id ? 'bg-white/10 border-l-4 border-l-purple-500' : ''}`}
                            >
                                <h4 className="font-medium truncate text-white">{note.title || 'Untitled'}</h4>
                                <p className="text-xs text-gray-500 mt-1 truncate">{note.content || 'No content'}</p>
                                <p className="text-[10px] text-gray-600 mt-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {notes.length === 0 && (
                            <div className="p-8 text-center text-gray-500 text-sm">No notes yet.</div>
                        )}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col bg-[#0f172a]/50">
                    {activeNote ? (
                        <>
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                                <input
                                    value={activeNote.title}
                                    onChange={e => setActiveNote({ ...activeNote, title: e.target.value })}
                                    className="bg-transparent text-xl font-bold text-white outline-none w-full"
                                    placeholder="Note Title"
                                />
                                <div className="flex gap-2">
                                    <button onClick={saveNote} className="p-2 text-green-400 hover:bg-white/10 rounded" title="Save">
                                        <Save size={20} />
                                    </button>
                                    <button onClick={() => deleteNote(activeNote.id)} className="p-2 text-red-400 hover:bg-white/10 rounded" title="Delete">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={activeNote.content}
                                onChange={e => setActiveNote({ ...activeNote, content: e.target.value })}
                                className="flex-1 bg-transparent p-6 text-gray-300 outline-none resize-none font-mono leading-relaxed"
                                placeholder="Start typing..."
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a note or create a new one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiscPage;
