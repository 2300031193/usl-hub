import React, { useState, useEffect } from 'react';
import { Target, Zap, Edit3, Save, Sparkles, Heart, Compass, X } from 'lucide-react';

const GoalSection = () => {
    // State for all three sections
    const [visionText, setVisionText] = useState(() => localStorage.getItem('usl_vision_text') || "To build a high-paying, successful career and live a happy, peaceful, and healthy life.");
    const [balanceText, setBalanceText] = useState(() => localStorage.getItem('usl_balance_text') || "Parents always blessed and proud.\nMoving closer to a brighter future every day.");
    const [focusTasks, setFocusTasks] = useState(() => localStorage.getItem('usl_focus_tasks') || "Java & Python DSA\nAWS Cloud Practitioner\nSystem Design");

    const [activeEditCard, setActiveEditCard] = useState(null); // 'vision', 'balance', 'focus', or null

    const handleSave = (key, value) => {
        localStorage.setItem(key, value);
        setActiveEditCard(null);
    };

    return (
        <div className="h-full flex flex-col justify-center p-1">

            {/* Symmetric 3-Card Layout */}
            <div className="grid grid-cols-3 gap-4 h-full">

                {/* Card 1: Ultimate Vision */}
                <EditableCard
                    id="vision"
                    title="Vision"
                    icon={<Compass size={18} className="text-blue-400" />}
                    gradient="from-blue-500/20 to-indigo-500/20"
                    content={visionText}
                    isEditing={activeEditCard === 'vision'}
                    onEdit={() => setActiveEditCard('vision')}
                    onSave={(val) => { setVisionText(val); handleSave('usl_vision_text', val); }}
                    onCancel={() => setActiveEditCard(null)}
                />

                {/* Card 2: Life & Balance */}
                <EditableCard
                    id="balance"
                    title="Balance"
                    icon={<Heart size={18} className="text-rose-400" />}
                    gradient="from-rose-500/20 to-pink-500/20"
                    content={balanceText}
                    isEditing={activeEditCard === 'balance'}
                    onEdit={() => setActiveEditCard('balance')}
                    onSave={(val) => { setBalanceText(val); handleSave('usl_balance_text', val); }}
                    onCancel={() => setActiveEditCard(null)}
                />

                {/* Card 3: Career Focus */}
                <EditableCard
                    id="focus"
                    title="Focus"
                    icon={<Zap size={18} className="text-amber-400" />}
                    gradient="from-amber-500/20 to-orange-500/20"
                    content={focusTasks}
                    isEditing={activeEditCard === 'focus'}
                    onEdit={() => setActiveEditCard('focus')}
                    onSave={(val) => { setFocusTasks(val); handleSave('usl_focus_tasks', val); }}
                    onCancel={() => setActiveEditCard(null)}
                    isList={true}
                />

            </div>
        </div>
    );
};

const EditableCard = ({ id, title, icon, gradient, content, isEditing, onEdit, onSave, onCancel, isList }) => {
    const [tempValue, setTempValue] = useState(content);

    useEffect(() => {
        setTempValue(content);
    }, [content, isEditing]);

    return (
        <div className="relative group bg-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">

            {/* Edit Button (Visible on Hover) */}
            {!isEditing && (
                <button
                    onClick={onEdit}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-700/50 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-blue-500 hover:text-white transition-all"
                >
                    <Edit3 size={12} />
                </button>
            )}

            {/* Icon Header */}
            <div className={`mb-3 p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-inner`}>
                {icon}
            </div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</h3>

            {/* Content Area */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                {isEditing ? (
                    <div className="w-full h-full flex flex-col gap-2">
                        <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full flex-1 bg-slate-900/50 rounded-lg p-2 text-xs text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 border border-slate-700"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => onSave(tempValue)} className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"><Save size={14} /></button>
                            <button onClick={onCancel} className="p-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"><X size={14} /></button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full overflow-y-auto custom-scrollbar max-h-[80px]">
                        {isList ? (
                            <div className="space-y-1.5">
                                {content.split('\n').map((item, idx) => (
                                    item.trim() && (
                                        <div key={idx} className="px-2 py-1.5 rounded-md bg-slate-900/30 border border-slate-700/30 text-[11px] font-medium text-slate-200">
                                            {item}
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-200 font-medium leading-relaxed whitespace-pre-wrap font-['Outfit']">
                                {content}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalSection;
