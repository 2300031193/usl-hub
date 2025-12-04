import React, { useState } from 'react';
import { Clock, Sun, Moon, Book, Code, Zap, Activity, Coffee } from 'lucide-react';

const RoutineSection = () => {
    const [activeTab, setActiveTab] = useState('college');

    return (
        <div className="h-full flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-xl relative z-10 overflow-hidden">
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-slate-700 bg-slate-800">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Daily Routine</h2>
                    <p className="text-sm text-slate-400 font-medium">Stay Consistent</p>
                </div>

                {/* Simple Tab Switcher */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                    {['college', 'sunday'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-800">
                <div className="space-y-3">
                    {activeTab === 'college' ? (
                        <>
                            <StandardRow time="05:30 AM" title="Wake Up & Hydrate" icon={Sun} color="text-amber-400" bg="bg-amber-500/10" />
                            <StandardRow time="06:00 AM" title="Fat Loss Workout" icon={Activity} color="text-rose-400" bg="bg-rose-500/10" />
                            <StandardRow time="09:00 AM" title="College Hours" icon={Book} color="text-sky-400" bg="bg-sky-500/10" />
                            <StandardRow time="07:30 PM" title="Deep Work (Coding)" icon={Code} color="text-emerald-400" bg="bg-emerald-500/10" active />
                            <StandardRow time="09:30 PM" title="Projects & AI Research" icon={Zap} color="text-violet-400" bg="bg-violet-500/10" />
                        </>
                    ) : (
                        <>
                            <StandardRow time="06:30 AM" title="Long Cardio Session" icon={Activity} color="text-rose-400" bg="bg-rose-500/10" />
                            <StandardRow time="09:00 AM" title="4-Hour Power Block" icon={Zap} color="text-amber-400" bg="bg-amber-500/10" />
                            <StandardRow time="01:00 PM" title="Lunch & Recovery" icon={Coffee} color="text-orange-400" bg="bg-orange-500/10" />
                            <StandardRow time="02:30 PM" title="Creative Coding" icon={Code} color="text-violet-400" bg="bg-violet-500/10" />
                            <StandardRow time="06:00 PM" title="Weekly Review" icon={Book} color="text-sky-400" bg="bg-sky-500/10" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const StandardRow = ({ time, title, icon: Icon, color, bg, active }) => (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${active ? 'bg-slate-700 border border-slate-600' : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50'}`}>
        <div className={`p-2.5 rounded-lg ${bg} ${color}`}>
            <Icon size={18} />
        </div>

        <div className="flex-1">
            <h4 className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-200'}`}>{title}</h4>
            <p className="text-xs font-mono text-slate-500 mt-0.5">{time}</p>
        </div>

        {active && (
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        )}
    </div>
);

export default RoutineSection;
