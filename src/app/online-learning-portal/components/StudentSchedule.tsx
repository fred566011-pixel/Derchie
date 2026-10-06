'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Props {
  showToday: boolean;
}

const allClasses = [
  {
    id: 'cls-001',
    subject: 'Core Mathematics',
    teacher: 'Mr. Emmanuel Boateng',
    class: 'JHS 2A',
    time: '08:00 – 09:00',
    date: '05 Oct 2026',
    day: 'Monday',
    status: 'live',
    topic: 'Quadratic Equations',
    students: 25,
    joined: 18,
  },
  {
    id: 'cls-002',
    subject: 'English Language',
    teacher: 'Mrs. Abena Mensah',
    class: 'JHS 2A',
    time: '09:15 – 10:15',
    date: '05 Oct 2026',
    day: 'Monday',
    status: 'upcoming',
    topic: 'Essay Writing — Argumentative',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-003',
    subject: 'Integrated Science',
    teacher: 'Mr. Kofi Owusu',
    class: 'JHS 2A',
    time: '10:30 – 11:30',
    date: '05 Oct 2026',
    day: 'Monday',
    status: 'upcoming',
    topic: 'Photosynthesis & Respiration',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-004',
    subject: 'Social Studies',
    teacher: 'Ms. Yaa Frimpong',
    class: 'JHS 2A',
    time: '13:00 – 14:00',
    date: '05 Oct 2026',
    day: 'Monday',
    status: 'upcoming',
    topic: 'Governance in Ghana',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-005',
    subject: 'French',
    teacher: 'Mr. Adu Gyamfi',
    class: 'JHS 2A',
    time: '08:00 – 09:00',
    date: '06 Oct 2026',
    day: 'Tuesday',
    status: 'upcoming',
    topic: 'Les Verbes Irréguliers',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-006',
    subject: 'Core Mathematics',
    teacher: 'Mr. Emmanuel Boateng',
    class: 'JHS 2A',
    time: '09:15 – 10:15',
    date: '06 Oct 2026',
    day: 'Tuesday',
    status: 'upcoming',
    topic: 'Linear Equations Revision',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-007',
    subject: 'BDT',
    teacher: 'Mr. Prince Acheampong',
    class: 'JHS 2A',
    time: '10:30 – 11:30',
    date: '06 Oct 2026',
    day: 'Tuesday',
    status: 'upcoming',
    topic: 'Business Planning Basics',
    students: 25,
    joined: 0,
  },
  {
    id: 'cls-008',
    subject: 'Integrated Science',
    teacher: 'Mr. Kofi Owusu',
    class: 'JHS 2A',
    time: '08:00 – 09:00',
    date: '07 Oct 2026',
    day: 'Wednesday',
    status: 'upcoming',
    topic: 'The Digestive System',
    students: 25,
    joined: 0,
  },
];

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  live: { label: 'Live Now', className: 'status-live', dot: 'bg-danger animate-pulse' },
  upcoming: { label: 'Upcoming', className: 'status-upcoming', dot: 'bg-primary' },
  completed: { label: 'Completed', className: 'status-completed', dot: 'bg-muted-foreground' },
};

const subjectColors: Record<string, string> = {
  'Core Mathematics': 'bg-blue-100 text-blue-700',
  'English Language': 'bg-green-100 text-green-700',
  'Integrated Science': 'bg-purple-100 text-purple-700',
  'Social Studies': 'bg-amber-100 text-amber-700',
  'French': 'bg-pink-100 text-pink-700',
  'BDT': 'bg-orange-100 text-orange-700',
};

export default function StudentSchedule({ showToday }: Props) {
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());

  const displayed = showToday
    ? allClasses.filter((c) => c.day === 'Monday')
    : allClasses;

  const handleJoin = async (id: string) => {
    setJoiningId(id);
    // Backend integration point: POST /api/classes/:id/join
    await new Promise((r) => setTimeout(r, 800));
    setJoinedIds((prev) => new Set(prev).add(id));
    setJoiningId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-base">
          {showToday ? "Today's Classes — Monday, 05 Oct" : 'Full Weekly Schedule'}
        </h2>
        <span className="text-xs text-muted-foreground">{displayed.length} sessions</span>
      </div>

      <div className="space-y-3">
        {displayed.map((cls) => {
          const status = statusConfig[cls.status] ?? statusConfig.upcoming;
          const subjColor = subjectColors[cls.subject] ?? 'bg-gray-100 text-gray-700';
          const isJoined = joinedIds.has(cls.id);
          const isJoining = joiningId === cls.id;

          return (
            <div
              key={cls.id}
              className={`bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                cls.status === 'live' ? 'border-red-200 bg-red-50/30' : 'border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-center min-w-[52px]">
                  <div className="text-xs text-muted-foreground font-medium">{cls.day.slice(0, 3)}</div>
                  <div className="text-xs font-bold text-foreground tabular-nums">{cls.time.split(' – ')[0]}</div>
                  <div className="text-xs text-muted-foreground">–{cls.time.split(' – ')[1]}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${subjColor}`}>
                      {cls.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${status.className}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{cls.topic}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {cls.teacher} · {cls.class}
                    {cls.status === 'live' && (
                      <span className="ml-2 text-red-600 font-medium">
                        {cls.joined}/{cls.students} joined
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                {cls.status === 'live' && (
                  <button
                    onClick={() => handleJoin(cls.id)}
                    disabled={isJoining || isJoined}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95 ${
                      isJoined
                        ? 'bg-success/10 text-success border border-success/20' :'bg-danger text-white hover:bg-red-700'
                    } disabled:opacity-70`}
                  >
                    {isJoining ? (
                      <Icon name="ArrowPathIcon" size={15} variant="outline" className="animate-spin" />
                    ) : isJoined ? (
                      <Icon name="CheckCircleIcon" size={15} variant="solid" />
                    ) : (
                      <Icon name="PlayIcon" size={15} variant="solid" />
                    )}
                    {isJoined ? 'Joined' : isJoining ? 'Joining...' : 'Join Live'}
                  </button>
                )}
                {cls.status === 'upcoming' && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="ClockIcon" size={14} variant="outline" />
                    {cls.time.split(' – ')[0]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}