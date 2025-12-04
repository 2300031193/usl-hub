import React, { useState, useEffect } from 'react';

function MiniCalendar() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sun

    // Adjust for Mon start if needed, but standard Sun start is usually fine for mini cals
    // Let's do Mon start to match the image (M T W T F S S)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} style={{ height: '20px' }}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === date.getDate();
        days.push(
            <div
                key={i}
                style={{
                    height: '20px',
                    width: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    color: isToday ? '#fff' : '#94a3b8',
                    background: isToday ? '#3b82f6' : 'transparent',
                    borderRadius: '4px',
                    fontWeight: isToday ? 'bold' : 'normal'
                }}
            >
                {i}
            </div>
        );
    }

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            marginLeft: '1.5rem'
        }}>
            {/* Time & Month Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#f43f5e', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}
                </span>
            </div>

            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                    <div key={d} style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
}

export default MiniCalendar;
