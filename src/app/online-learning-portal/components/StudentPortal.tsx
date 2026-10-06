'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import LiveClassBanner from './LiveClassBanner';
import StudentSchedule from './StudentSchedule';
import CourseMaterials from './CourseMaterials';

interface Props {
  user: { role: 'student' | 'teacher'; name: string; id: string };
  onLogout: () => void;
}

const studentStats = [
  { id: 'stat-classes', label: 'Classes This Week', value: '8', icon: 'CalendarIcon', color: 'bg-blue-50 text-blue-600' },
  { id: 'stat-attended', label: 'Attended', value: '6', icon: 'CheckCircleIcon', color: 'bg-green-50 text-green-600' },
  { id: 'stat-materials', label: 'Materials Available', value: '14', icon: 'DocumentTextIcon', color: 'bg-purple-50 text-purple-600' },
  { id: 'stat-assignments', label: 'Pending Assignments', value: '2', icon: 'ClipboardDocumentListIcon', color: 'bg-amber-50 text-amber-600' },
];

export default function StudentPortal({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'materials'>('dashboard');

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'HomeIcon' },
    { id: 'schedule' as const, label: 'My Schedule', icon: 'CalendarDaysIcon' },
    { id: 'materials' as const, label: 'Course Materials', icon: 'DocumentTextIcon' },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
      {/* Portal Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 bg-light-blue rounded-full px-3 py-1 text-xs font-semibold text-primary">
              <Icon name="UserIcon" size={12} variant="solid" />
              Student Portal
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Monday, 05 October 2026 · JHS 2A · Derche Educational Complex
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all duration-150"
        >
          <Icon name="ArrowRightOnRectangleIcon" size={16} variant="outline" />
          Sign Out
        </button>
      </div>

      {/* Live Class Banner */}
      <LiveClassBanner />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {studentStats.map((stat) => (
          <div key={stat.id} className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon as 'CalendarIcon'} size={16} variant="solid" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-foreground tabular-nums">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={`stab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon as 'HomeIcon'} size={15} variant={activeTab === tab.id ? 'solid' : 'outline'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <StudentSchedule showToday />}
      {activeTab === 'schedule' && <StudentSchedule showToday={false} />}
      {activeTab === 'materials' && <CourseMaterials />}
    </div>
  );
}