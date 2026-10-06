'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import TeacherSchedule from './TeacherSchedule';
import TeacherStudentList from './TeacherStudentList';
import UploadMaterial from './UploadMaterial';

interface Props {
  user: { role: 'student' | 'teacher'; name: string; id: string };
  onLogout: () => void;
}

const teacherStats = [
  { id: 'tstat-classes', label: 'Classes This Week', value: '10', icon: 'CalendarIcon', color: 'bg-blue-50 text-blue-600' },
  { id: 'tstat-students', label: 'Total Students', value: '74', icon: 'UserGroupIcon', color: 'bg-green-50 text-green-600' },
  { id: 'tstat-materials', label: 'Materials Uploaded', value: '18', icon: 'DocumentTextIcon', color: 'bg-purple-50 text-purple-600' },
  { id: 'tstat-attendance', label: 'Avg. Attendance', value: '86%', icon: 'ChartBarIcon', color: 'bg-amber-50 text-amber-600' },
];

export default function TeacherPortal({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'upload'>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'dashboard' as const, label: 'My Classes', icon: 'CalendarDaysIcon' },
    { id: 'students' as const, label: 'My Students', icon: 'UserGroupIcon' },
    { id: 'upload' as const, label: 'Upload Material', icon: 'ArrowUpTrayIcon' },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
      {/* Portal Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 bg-gold/10 rounded-full px-3 py-1 text-xs font-semibold text-gold border border-gold/20">
              <Icon name="AcademicCapIcon" size={12} variant="solid" />
              Teacher Portal
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Monday, 05 October 2026 · Core Mathematics & Science · Derche Educational Complex
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-gold flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Icon name="PlusCircleIcon" size={17} variant="solid" />
            Schedule Class
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all duration-150"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={16} variant="outline" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Active Session Alert */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 shadow-card-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="VideoCameraIcon" size={20} variant="solid" className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white live-pulse" />
              <span className="text-white/90 text-xs font-semibold uppercase">Your Class is Live Now</span>
            </div>
            <p className="text-white font-bold text-sm">
              Core Mathematics — Quadratic Equations · JHS 2A · 18/25 students present
            </p>
          </div>
        </div>
        <button className="flex-shrink-0 bg-white text-red-600 font-bold text-sm px-4 py-2 rounded-xl hover:bg-white/90 transition-colors active:scale-95">
          Manage Session
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {teacherStats.map((stat) => (
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
            key={`ttab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-card text-gold shadow-sm border border-gold/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon as 'CalendarDaysIcon'} size={15} variant={activeTab === tab.id ? 'solid' : 'outline'} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && <TeacherSchedule />}
      {activeTab === 'students' && <TeacherStudentList />}
      {activeTab === 'upload' && <UploadMaterial />}

      {/* Create Class Modal */}
      {showCreateModal && (
        <CreateClassModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function CreateClassModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    // Backend integration point: POST /api/classes/create
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-card-lg w-full max-w-md fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Schedule a New Class</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <Icon name="XMarkIcon" size={20} variant="outline" />
          </button>
        </div>
        {success ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={28} variant="solid" className="text-success" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Class Scheduled!</h3>
            <p className="text-muted-foreground text-sm mb-4">Students will be notified of the new session.</p>
            <button onClick={onClose} className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Subject</label>
              <input type="text" placeholder="e.g. Core Mathematics" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" {...register('subject', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Topic</label>
              <input type="text" placeholder="e.g. Quadratic Equations" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" {...register('topic', { required: true })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Date</label>
                <input type="date" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" {...register('date', { required: true })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Time</label>
                <input type="time" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" {...register('time', { required: true })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Class / Year Group</label>
              <select className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-card" {...register('classGroup', { required: true })}>
                <option value="">Select class</option>
                <option>JHS 1A</option><option>JHS 1B</option><option>JHS 2A</option>
                <option>JHS 2B</option><option>JHS 3A</option><option>SHS 1</option>
                <option>SHS 2</option><option>SHS 3</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />Scheduling...</> : 'Schedule Class'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Import at top of file
import { useForm } from 'react-hook-form'
;