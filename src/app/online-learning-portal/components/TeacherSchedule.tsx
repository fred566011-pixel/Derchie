'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const teacherClasses = [
  { id: 'tcls-001', subject: 'Core Mathematics', class: 'JHS 2A', time: '08:00 – 09:00', date: '05 Oct', day: 'Mon', topic: 'Quadratic Equations', status: 'live', students: 25, present: 18 },
  { id: 'tcls-002', subject: 'Core Mathematics', class: 'JHS 1B', time: '09:15 – 10:15', date: '05 Oct', day: 'Mon', topic: 'Introduction to Algebra', status: 'upcoming', students: 22, present: 0 },
  { id: 'tcls-003', subject: 'Core Mathematics', class: 'JHS 3A', time: '13:00 – 14:00', date: '05 Oct', day: 'Mon', topic: 'BECE Mock Review', status: 'upcoming', students: 28, present: 0 },
  { id: 'tcls-004', subject: 'Core Mathematics', class: 'JHS 2B', time: '08:00 – 09:00', date: '06 Oct', day: 'Tue', topic: 'Linear Equations', status: 'upcoming', students: 23, present: 0 },
  { id: 'tcls-005', subject: 'Core Mathematics', class: 'SHS 1', time: '10:30 – 11:30', date: '07 Oct', day: 'Wed', topic: 'Indices & Logarithms', status: 'upcoming', students: 30, present: 0 },
  { id: 'tcls-006', subject: 'Core Mathematics', class: 'JHS 1A', time: '09:15 – 10:15', date: '08 Oct', day: 'Thu', topic: 'Fractions & Decimals', status: 'upcoming', students: 20, present: 0 },
];

export default function TeacherSchedule() {
  const [startingId, setStartingId] = useState<string | null>(null);
  const [startedIds, setStartedIds] = useState<Set<string>>(new Set());

  const handleStart = async (id: string) => {
    setStartingId(id);
    // Backend integration point: POST /api/classes/:id/start
    await new Promise((r) => setTimeout(r, 900));
    setStartedIds((prev) => new Set(prev).add(id));
    setStartingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-base">Upcoming & Active Classes</h2>
        <span className="text-xs text-muted-foreground">{teacherClasses.length} sessions this week</span>
      </div>

      <div className="space-y-3">
        {teacherClasses.map((cls) => {
          const isLive = cls.status === 'live';
          const isStarting = startingId === cls.id;
          const isStarted = startedIds.has(cls.id);

          return (
            <div
              key={cls.id}
              className={`bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                isLive ? 'border-red-200 bg-red-50/20' : 'border-border hover:border-gold/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[52px]">
                  <div className="text-xs text-muted-foreground font-medium">{cls.day}</div>
                  <div className="text-xs font-bold text-foreground tabular-nums">{cls.time.split(' – ')[0]}</div>
                  <div className="text-xs text-muted-foreground">–{cls.time.split(' – ')[1]}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {cls.subject}
                    </span>
                    <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {cls.class}
                    </span>
                    {isLive && (
                      <span className="status-live inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{cls.topic}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {cls.date} · {isLive ? `${cls.present}/${cls.students} students present` : `${cls.students} students enrolled`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {isLive ? (
                  <button className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors active:scale-95">
                    <Icon name="VideoCameraIcon" size={15} variant="solid" />
                    Manage Live
                  </button>
                ) : (
                  <button
                    onClick={() => handleStart(cls.id)}
                    disabled={isStarting || isStarted}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95 disabled:opacity-60 ${
                      isStarted ? 'bg-success/10 text-success border border-success/20' : 'btn-gold'
                    }`}
                  >
                    {isStarting ? (
                      <Icon name="ArrowPathIcon" size={15} variant="outline" className="animate-spin" />
                    ) : isStarted ? (
                      <Icon name="CheckCircleIcon" size={15} variant="solid" />
                    ) : (
                      <Icon name="PlayIcon" size={15} variant="solid" />
                    )}
                    {isStarted ? 'Started' : isStarting ? 'Starting...' : 'Start Class'}
                  </button>
                )}
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Icon name="EllipsisVerticalIcon" size={18} variant="outline" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}