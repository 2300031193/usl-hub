import React from 'react';
import { Sparkles, Target } from 'lucide-react';

const GoalSection = () => {
    return (
        <div className="glass-panel p-6 border border-blue-500/30 bg-[#0f172a]/60 relative overflow-hidden group h-full flex flex-col">
            {/* Subtle Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-yellow-400" size={18} />
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0">Ultimate Vision</h2>
            </div>

            <div className="relative z-10 flex-1 flex flex-col gap-6">
                {/* Final Goal / Focus Section */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Target size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">Final Goal</h3>
                        <p className="text-xl font-bold text-white tracking-wide">Focus & Determination</p>
                    </div>
                </div>

                <p className="text-lg text-gray-200 italic font-medium leading-relaxed">
                    "To build a high-paying and successful career that fulfills all my wishes and dreams. I will live a happy, peaceful, and healthy life, and my parents will always be blessed, healthy, and proud of me. <span className="text-yellow-400/90">Every single day, I move closer to a brighter, better, and more abundant future.</span>"
                </p>
            </div>
        </div>
    );
};

export default GoalSection;
