import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, Calendar, FolderOpen, Sun } from 'lucide-react';

const HubMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { path: '/links', label: 'My Links', icon: Globe, color: 'text-blue-400' },
        { path: '/timetable', label: 'Time Table', icon: Calendar, color: 'text-green-400' },
        { path: '/files', label: 'My Files', icon: FolderOpen, color: 'text-yellow-400' },
        { path: '/hanuman', label: 'Hanuman Chalisa', icon: Sun, color: 'text-orange-500' },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                aria-label="Open Menu"
                title="Menu"
            >
                <Menu size={20} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-gray-200 hover:text-white"
                            >
                                <item.icon size={18} className={item.color} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HubMenuButton;
