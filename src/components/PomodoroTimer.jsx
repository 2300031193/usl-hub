import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Settings } from 'lucide-react';

function PomodoroTimer() {
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // 'focus' or 'break'
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? focusDuration * 60 : breakDuration * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? focusDuration * 60 : breakDuration * 60);
    };

    const handleDurationChange = (type, val) => {
        const newVal = parseInt(val) || 1;
        if (type === 'focus') {
            setFocusDuration(newVal);
            if (mode === 'focus') setTimeLeft(newVal * 60);
        } else {
            setBreakDuration(newVal);
            if (mode === 'break') setTimeLeft(newVal * 60);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="glass-panel" style={{
            textAlign: 'center',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <button
                onClick={() => setIsEditing(!isEditing)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
                <Settings size={18} />
            </button>

            <h2 style={{ justifyContent: 'center' }}><Timer size={24} color="#f472b6" /> Focus Timer</h2>

            {isEditing ? (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <label style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}>Focus (min):</label>
                        <input
                            type="number"
                            value={focusDuration}
                            onChange={(e) => handleDurationChange('focus', e.target.value)}
                            style={{ width: '50px', padding: '0.25rem', borderRadius: '4px', border: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}>Break (min):</label>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e) => handleDurationChange('break', e.target.value)}
                            style={{ width: '50px', padding: '0.25rem', borderRadius: '4px', border: 'none' }}
                        />
                    </div>
                    <button onClick={() => setIsEditing(false)} className="btn" style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Done</button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => switchMode('focus')}
                            className="btn"
                            style={{
                                background: mode === 'focus' ? 'var(--accent-color)' : 'transparent',
                                border: '1px solid var(--accent-color)',
                                opacity: mode === 'focus' ? 1 : 0.5
                            }}
                        >
                            Focus
                        </button>
                        <button
                            onClick={() => switchMode('break')}
                            className="btn"
                            style={{
                                background: mode === 'break' ? '#10b981' : 'transparent',
                                border: '1px solid #10b981',
                                opacity: mode === 'break' ? 1 : 0.5
                            }}
                        >
                            Break
                        </button>
                    </div>

                    <div style={{
                        fontSize: '4rem',
                        fontWeight: '700',
                        fontFamily: 'monospace',
                        marginBottom: '1.5rem',
                        color: mode === 'focus' ? '#fff' : '#10b981'
                    }}>
                        {formatTime(timeLeft)}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button onClick={toggleTimer} className="btn" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isActive ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '4px' }} />}
                        </button>
                        <button onClick={resetTimer} className="btn" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PomodoroTimer;
