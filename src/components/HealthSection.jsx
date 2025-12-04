import React from 'react';
import { Heart, Droplets, Utensils, Activity } from 'lucide-react';

const HealthSection = () => {
    return (
        <div className="glass-panel p-6 border border-red-500/20 bg-[#0f172a]/60 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Heart className="text-red-400" size={20} />
                <h2 className="text-lg font-bold text-gray-200">Project &lt; 95kg</h2>
            </div>

            <div className="space-y-6">
                {/* Rules */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-lg text-center">
                        <span className="block text-lg mb-1">🚫</span>
                        <span className="text-xs font-medium text-red-300">No Sugar</span>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg text-center">
                        <Droplets size={18} className="mx-auto mb-1 text-blue-400" />
                        <span className="text-xs font-medium text-blue-300">Hydrate</span>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/10 p-3 rounded-lg text-center">
                        <Utensils size={18} className="mx-auto mb-1 text-green-400" />
                        <span className="text-xs font-medium text-green-300">Control</span>
                    </div>
                </div>

                {/* Meal Plan */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Daily Fuel</h3>
                    <div className="space-y-2">
                        <MealRow icon="🌅" label="Morning" text="Warm Water + Almonds" />
                        <MealRow icon="🍳" label="Breakfast" text="Idli / Dosa / Eggs" />
                        <MealRow icon="🍛" label="Lunch" text="2 Roti + Dal + Veg" />
                        <MealRow icon="🌙" label="Dinner" text="Light Protein (8:30 PM)" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MealRow = ({ icon, label, text }) => (
    <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
        <span className="text-lg">{icon}</span>
        <div>
            <span className="text-xs font-bold text-gray-400 block">{label}</span>
            <span className="text-sm text-gray-300">{text}</span>
        </div>
    </div>
);

export default HealthSection;
