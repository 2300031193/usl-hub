import React from 'react';
import TodoList from './TodoList';
import PomodoroTimer from './PomodoroTimer';
import Notebook from './Notebook';
import GoalSection from './GoalSection';
import HealthSection from './HealthSection';
import RoutineSection from './RoutineSection';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '1600px', margin: '0 auto' }}>

            {/* Row 1: Vision (Rectangle - 66%) & Timer (Square - 33%) */}
            <div style={{ display: 'flex', gap: '24px', height: '280px', flexDirection: 'row' }}>
                <div style={{ flex: 2, minWidth: 0 }}>
                    <GoalSection />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <PomodoroTimer />
                </div>
            </div>

            {/* Row 2: Tasks & Ideas (50/50) */}
            <div style={{ display: 'flex', gap: '24px', height: '400px', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                    <TodoList />
                </div>
                <div style={{ flex: 1 }}>
                    <Notebook />
                </div>
            </div>

            {/* Row 3: Routine & Health (50/50) */}
            <div style={{ display: 'flex', gap: '24px', height: '400px', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                    <RoutineSection />
                </div>
                <div style={{ flex: 1 }}>
                    <HealthSection />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
