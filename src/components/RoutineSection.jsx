import React, { useState } from 'react';
import { Clock, Sun, Moon, Book, Code, Zap, Activity, Coffee } from 'lucide-react';

const RoutineSection = () => {
    const [activeTab, setActiveTab] = useState('college');

    return (
        <div className="glass-panel p-6 border border-purple-500/20 bg-[#0f172a]/60 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Clock className="text-purple-400" size={20} />
                    <h2 className="text-lg font-bold text-gray-200">Daily Routine</h2>
                </div>

                <div className="flex bg-black/30 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setActiveTab('college')}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'college' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        College
                    </button>
                    <button
                        onClick={() => setActiveTab('sunday')}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'sunday' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Sunday
                    </button>
                </div>
            </div>

            <div className="space-y-1">
                {activeTab === 'college' ? (
                    <>
                        <RoutineRow time="05:30 AM" title="Wake Up" icon={Sun} color="text-yellow-400" />
                        <RoutineRow time="06:00 AM" title="Fat Loss Workout" icon={Activity} color="text-red-400" />
                        <RoutineRow time="09:00 AM" title="College Hours" icon={Book} color="text-blue-400" />
                        <RoutineRow time="07:30 PM" title="Deep Work (Coding)" icon={Code} color="text-green-400" />
                        <RoutineRow time="09:30 PM" title="Projects & AI" icon={Zap} color="text-purple-400" />
                    </>
                ) : (
                    <>
                        <RoutineRow time="06:30 AM" title="Long Cardio" icon={Activity} color="text-red-400" />
                        <RoutineRow time="09:00 AM" title="4-Hour Power Block" icon={Zap} color="text-yellow-400" />
                        <RoutineRow time="01:00 PM" title="Lunch & Nap" icon={Coffee} color="text-orange-400" />
                        <RoutineRow time="02:30 PM" title="Creative Coding" icon={Code} color="text-purple-400" />
                        <RoutineRow time="06:00 PM" title="Weekly Planning" icon={Book} color="text-blue-400" />
                    </>
                )}
            </div>
        </div>
    );
};

const RoutineRow = ({ time, title, icon: Icon, color }) => (
    <div className="flex items-center gap-3 p-2.5 hover:bg-white/5 rounded-lg transition-colors group">
        <div className={`p-1.5 rounded-md bg-white/5 group-hover:bg-white/10 ${color}`}>
            <Icon size={14} />
        </div>
        <div className="flex-1 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300">{title}</span>
            <span className="text-xs font-mono text-gray-500">{time}</span>
        </div>
    </div>
);

export default RoutineSection;
