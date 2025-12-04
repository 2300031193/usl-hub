import React, { useState } from 'react';
import { Plus, Trash2, List } from 'lucide-react';

function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review Morning Routine' },
        { id: 2, text: 'Complete Java DSA Practice' },
        { id: 3, text: 'Read Tech News' },
    ]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask }]);
        setNewTask('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2><List size={24} color="#10b981" /> Active Tasks</h2>

            <form onSubmit={addTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new mission..."
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none'
                    }}
                />
                <button type="submit" className="btn" style={{ padding: '0.75rem' }}>
                    <Plus size={20} />
                </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flex: 1 }}>
                {tasks.map(task => (
                    <div
                        key={task.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            transition: 'all 0.2s',
                            borderLeft: '3px solid #3b82f6'
                        }}
                    >
                        <span style={{ flex: 1, color: '#e5e7eb', fontSize: '1.05rem' }}>
                            {task.text}
                        </span>

                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', opacity: 0.7, padding: '4px' }}
                            title="Remove Task"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}

                {tasks.length === 0 && (
                    <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
                        <p>All clear. Ready for new orders.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoList;
