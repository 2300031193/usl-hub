import React from 'react';
import TodoList from './TodoList';
import PomodoroTimer from './PomodoroTimer';
import Notebook from './Notebook';
import GoalSection from './GoalSection';
import HealthSection from './HealthSection';
import RoutineSection from './RoutineSection';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
            {/* Row 1: Vision & Focus */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="h-full">
                    <GoalSection />
                </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="h-full">
                    <PomodoroTimer />
                </div>
            </div>

            {/* Row 2: Tasks & Ideas */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
                <div className="h-full">
                    <TodoList />
                </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                <div className="h-full">
                    <Notebook />
                </div>
            </div>

            {/* Row 3: Routine & Health */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                <div className="h-full">
                    <RoutineSection />
                </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
                <div className="h-full">
                    <HealthSection />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
