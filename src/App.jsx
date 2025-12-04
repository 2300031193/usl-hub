import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import gsap from 'gsap';
import { Terminal, RefreshCw } from 'lucide-react';

// Components
import Dashboard from './components/Dashboard';
import HubMenuButton from './components/HubMenuButton';
import MiniCalendar from './components/MiniCalendar';
import WeatherWidget from './components/WeatherWidget';

// Pages
import LinksPage from './pages/LinksPage';
import TimetablePage from './pages/TimetablePage';
import FilesPage from './pages/FilesPage';
import HanumanPage from './pages/HanumanPage';

// Daily Quote Component
const DailyQuote = () => {
  const quotes = [
    "Discipline is doing what needs to be done, even if you don't want to do it.",
    "The only bad workout is the one that didn't happen.",
    "Your future is created by what you do today, not tomorrow.",
    "Don't stop when you're tired. Stop when you're done.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Dream big. Start small. Act now.",
    "Focus on the process, not the outcome.",
    "You didn't come this far to only come this far.",
    "Pain is temporary. Quitting lasts forever.",
    "The secret of getting ahead is getting started."
  ];

  const [currentIndex, setCurrentIndex] = useState(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dayOfYear % quotes.length;
  });

  const refreshQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(newIndex);
  };

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1rem 2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      maxWidth: '800px',
      width: '90%'
    }}>
      <p style={{
        fontSize: '1.1rem',
        fontStyle: 'italic',
        color: '#fff',
        margin: 0,
        fontFamily: '"Outfit", sans-serif',
        letterSpacing: '0.02em',
        flex: 1
      }}>
        "{quotes[currentIndex]}"
      </p>
      <button
        onClick={refreshQuote}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
        title="New Quote"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
};

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("header", { y: -50, duration: 1, ease: "power3.out" });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <Router>
      <div ref={appRef} className="min-h-screen" style={{ paddingBottom: '4rem' }}>
        <div className="container">
          {/* Header Section */}
          <header style={{ marginBottom: '3rem', paddingTop: '2rem' }}>

            <div className="header-container">

              {/* Centered Title Group with Menu Button */}
              <div className="header-title-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                {/* Menu Button - Left of Logo */}
                <HubMenuButton />

                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '50%' }}>
                    <Terminal size={40} color="#3b82f6" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>USL Hub</h1>
                    <p style={{ fontSize: '1rem', color: '#cbd5e1', margin: 0 }}>Command Center • Chaitanya USL</p>
                  </div>
                </Link>
              </div>

              {/* Right Side Widgets */}
              <div className="header-widgets">
                <MiniCalendar />
                <WeatherWidget />
              </div>

            </div>

            {/* Daily Quote Section */}
            <div style={{ textAlign: 'center' }}>
              <DailyQuote />
            </div>
          </header>

          {/* Main Content Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/hanuman" element={<HanumanPage />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
