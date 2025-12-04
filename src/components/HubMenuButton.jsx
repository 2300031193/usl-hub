import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, X, Globe, Calendar, FolderOpen, Sun, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const HubMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Open Animation
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: -20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
            );
            gsap.fromTo(itemsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "back.out(1.2)", delay: 0.1 }
            );
        }
    }, [isOpen]);

    const closeMenu = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            y: -10,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => setIsOpen(false)
        });
    };

    const toggleMenu = () => {
        if (isOpen) {
            closeMenu();
        } else {
            setIsOpen(true);
        }
    };

    const menuItems = [
        {
            path: '/links',
            label: 'My Links',
            icon: Globe,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            desc: 'Bookmarks'
        },
        {
            path: '/timetable',
            label: 'Time Table',
            icon: Calendar,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            desc: 'Schedule'
        },
        {
            path: '/files',
            label: 'My Files',
            icon: FolderOpen,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            desc: 'Documents'
        },
        {
            path: '/hanuman',
            label: 'Hanuman',
            icon: Sun,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            desc: 'Spiritual'
        },
    ];

    return (
        <div className="relative font-sans" ref={menuRef}>
            {/* Mega Button */}
            <button
                onClick={toggleMenu}
                className={`group relative p-5 rounded-3xl border-2 transition-all duration-500 ${isOpen
                        ? 'bg-white border-blue-500 shadow-[0_0_40px_rgba(255,255,255,0.4)] rotate-180 scale-110'
                        : 'bg-slate-900/90 border-slate-600 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                    }`}
                aria-label="Toggle Command Center"
            >
                {/* Idle Pulse (Only when closed) */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-lg animate-pulse"></div>
                )}

                <div className="relative w-12 h-12 flex items-center justify-center">
                    <LayoutGrid
                        size={40}
                        className={`absolute transition-all duration-500 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100 text-blue-300 group-hover:text-white'
                            }`}
                    />
                    <X
                        size={40}
                        className={`absolute transition-all duration-500 ${isOpen ? 'opacity-100 rotate-0 scale-100 text-blue-600' : 'opacity-0 -rotate-180 scale-0'
                            }`}
                    />
                </div>
            </button>

            {/* Launchpad Interface - Light Theme */}
            {isOpen && (
                <div
                    ref={containerRef}
                    className="absolute top-full left-0 mt-6 w-[360px] bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden z-50 origin-top-left"
                >

                    {/* Header */}
                    <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Sparkles size={18} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Command Center</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium pl-11">Select a destination</p>
                    </div>

                    {/* Grid Layout - Light Cards */}
                    <div className="p-5 grid grid-cols-2 gap-4 pb-8 bg-white">
                        {menuItems.map((item, index) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                ref={el => itemsRef.current[index] = el}
                                className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className={`mb-4 p-3 rounded-2xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={32} className={item.color} />
                                </div>
                                <span className="text-base font-bold text-slate-700 group-hover:text-slate-900 mb-1 transition-colors">{item.label}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">{item.desc}</span>
                            </Link>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default HubMenuButton;
