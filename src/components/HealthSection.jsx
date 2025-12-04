import React, { useState, useEffect } from 'react';
import { Heart, Droplets, Utensils, Flame, Sunrise, Sun, Moon, Coffee, Scale, Lightbulb, Leaf } from 'lucide-react';

const HealthSection = () => {
    const [currentTip, setCurrentTip] = useState(0);
    const tips = [
        "Drink 3-4 Liters of water daily.",
        "Eat until you are 80% full, not 100%.",
        "Sleep 7 Hours minimum. Poor sleep = Weight Gain.",
        "A 30-min walk every day is better than 2 hours once a week.",
        "If hungry at night, drink water or warm milk."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl border border-emerald-700/50 shadow-xl relative z-10 overflow-hidden">
            {/* Organic Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-emerald-800/50 bg-black/10 backdrop-blur-sm relative z-10">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        Project &lt; 95kg
                        <Leaf size={16} className="text-emerald-400" />
                    </h2>
                    <p className="text-sm text-emerald-200/80 font-medium">Vitality & Wellness</p>
                </div>

                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                    <Heart className="text-emerald-300" size={18} />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 relative z-10">

                {/* Weight Tracker */}
                <div className="mb-6 p-4 rounded-xl bg-black/20 border border-emerald-500/20 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Scale size={16} className="text-emerald-300" />
                            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Progress</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-300">Target: 95 kg</span>
                    </div>

                    <div className="relative h-3 bg-black/30 rounded-full overflow-hidden mb-2 border border-white/5">
                        <div className="absolute top-0 left-0 h-full w-[75%] bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                    </div>

                    <div className="flex justify-between text-[10px] font-medium text-emerald-200/60">
                        <span>Start: 105</span>
                        <span className="text-white font-bold">Current: 98 kg</span>
                        <span>Goal: 95</span>
                    </div>
                </div>

                {/* Rules Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <OrganicBadge icon="🚫" label="No Sugar" color="text-rose-300" bg="bg-rose-500/10" border="border-rose-500/20" />
                    <OrganicBadge icon={<Droplets size={20} />} label="Hydrate" color="text-cyan-300" bg="bg-cyan-500/10" border="border-cyan-500/20" />
                    <OrganicBadge icon={<Utensils size={20} />} label="Control" color="text-emerald-300" bg="bg-emerald-500/10" border="border-emerald-500/20" />
                </div>

                {/* Health Tip */}
                <div className="mb-6 p-3 rounded-xl bg-lime-500/10 border border-lime-500/20 flex gap-3 items-start">
                    <Lightbulb size={18} className="text-lime-300 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-[10px] font-bold text-lime-300 uppercase tracking-wider mb-1">Daily Wisdom</h4>
                        <p className="text-xs text-lime-100/90 leading-relaxed font-medium">
                            "{tips[currentTip]}"
                        </p>
                    </div>
                </div>

                {/* Fuel List Header */}
                <div className="flex items-center gap-2 mb-3">
                    <Flame size={14} className="text-orange-300" />
                    <h3 className="text-xs font-bold text-emerald-200/60 uppercase tracking-widest">Clean Fuel Plan</h3>
                </div>

                {/* Fuel List - Clean List Style (No Table) */}
                <div className="space-y-2">
                    <OrganicFuelRow
                        icon={<Sunrise size={16} />}
                        label="Morning"
                        text="Warm Water + Almonds"
                        color="text-orange-200"
                        bg="bg-orange-500/10"
                    />
                    <OrganicFuelRow
                        icon={<Coffee size={16} />}
                        label="Breakfast"
                        text="Idli / Dosa / Eggs"
                        color="text-yellow-200"
                        bg="bg-yellow-500/10"
                    />
                    <OrganicFuelRow
                        icon={<Sun size={16} />}
                        label="Lunch"
                        text="2 Roti + Dal + Veg"
                        color="text-amber-200"
                        bg="bg-amber-500/10"
                    />
                    <OrganicFuelRow
                        icon={<Moon size={16} />}
                        label="Dinner"
                        text="Light Protein (8:30 PM)"
                        color="text-indigo-200"
                        bg="bg-indigo-500/10"
                    />
                </div>
            </div>
        </div>
    );
};

const OrganicBadge = ({ icon, label, color, bg, border }) => (
    <div className={`p-3 rounded-2xl border ${bg} ${border} flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105`}>
        <div className={`${color} text-xl`}>{icon}</div>
        <span className={`text-[10px] font-bold uppercase tracking-wide ${color} opacity-90`}>{label}</span>
    </div>
);

const OrganicFuelRow = ({ icon, label, text, color, bg }) => (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-black/10 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
            {icon}
        </div>
        <div className="flex-1">
            <span className={`text-[10px] font-bold ${color} uppercase tracking-wider opacity-70 block mb-0.5`}>{label}</span>
            <span className="text-sm font-medium text-emerald-50">{text}</span>
        </div>
    </div>
);

export default HealthSection;
