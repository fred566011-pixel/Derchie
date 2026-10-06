'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,  } from 'recharts';
import Icon from '@/components/ui/AppIcon';

const enrollmentByMonth = [
  { month: 'Apr', students: 38, teachers: 2 },
  { month: 'May', students: 45, teachers: 1 },
  { month: 'Jun', students: 29, teachers: 3 },
  { month: 'Jul', students: 52, teachers: 4 },
  { month: 'Aug', students: 78, teachers: 6 },
  { month: 'Sep', students: 91, teachers: 5 },
  { month: 'Oct', students: 87, teachers: 7 },
];

const subjectEnrollment = [
  { subject: 'Core Maths', students: 420 },
  { subject: 'English', students: 420 },
  { subject: 'Science', students: 385 },
  { subject: 'Social Studies', students: 410 },
  { subject: 'French', students: 298 },
  { subject: 'BDT', students: 265 },
  { subject: 'ICT', students: 312 },
  { subject: 'R.M.E', students: 380 },
];

const classAttendance = [
  { week: 'Wk 28', rate: 78 },
  { week: 'Wk 29', rate: 83 },
  { week: 'Wk 30', rate: 81 },
  { week: 'Wk 31', rate: 88 },
  { week: 'Wk 32', rate: 85 },
  { week: 'Wk 33', rate: 91 },
  { week: 'Wk 34', rate: 87 },
  { week: 'Wk 35', rate: 93 },
  { week: 'Wk 36', rate: 89 },
  { week: 'Wk 37', rate: 86 },
];

const userBreakdown = [
  { name: 'JHS Students', value: 285, color: '#1a3a6b' },
  { name: 'SHS Students', value: 135, color: '#2d5aa0' },
  { name: 'Primary Pupils', value: 148, color: '#f5a623' },
  { name: 'Teachers', value: 28, color: '#16a34a' },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-card-md px-4 py-3 text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry) => (
          <div key={`tooltip-${entry.name}`} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminChartsInner() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-foreground text-base">School Analytics</h2>

      {/* Row 1: Enrollment + User Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground text-sm">Monthly Registrations</h3>
              <p className="text-muted-foreground text-xs mt-0.5">
                New student and teacher sign-ups per month
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
                Students
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-gold inline-block" />
                Teachers
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enrollmentByMonth} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Students" />
              <Bar dataKey="teachers" fill="var(--gold)" radius={[4, 4, 0, 0]} name="Teachers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Breakdown Pie */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="mb-5">
            <h3 className="font-bold text-foreground text-sm">User Breakdown</h3>
            <p className="text-muted-foreground text-xs mt-0.5">596 total users</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={userBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {userBreakdown.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-xl shadow-card-md px-3 py-2 text-xs">
                        <p className="font-semibold text-foreground">{payload[0].name}</p>
                        <p className="text-muted-foreground">{payload[0].value} users</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-2 mt-2">
            {userBreakdown.map((item) => (
              <li key={`legend-${item.name}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 2: Attendance Trend + Subject Enrollment */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Attendance Rate Trend */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground text-sm">Weekly Attendance Rate</h3>
              <p className="text-muted-foreground text-xs mt-0.5">
                Average student attendance across all live classes
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 rounded-lg px-2.5 py-1">
              <Icon name="ArrowTrendingUpIcon" size={13} variant="solid" className="text-success" />
              <span className="text-success text-xs font-semibold">+5% vs last term</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={classAttendance}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[60, 100]}
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-xl shadow-card-md px-3 py-2 text-xs">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-muted-foreground">
                          Attendance:{' '}
                          <span className="font-bold text-primary">{payload[0].value}%</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#attendanceGrad)"
                name="Attendance Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Enrollment Bar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="mb-5">
            <h3 className="font-bold text-foreground text-sm">Enrollment by Subject</h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              Number of students enrolled per subject
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectEnrollment} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="subject"
                type="category"
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-xl shadow-card-md px-3 py-2 text-xs">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-muted-foreground">
                          Students:{' '}
                          <span className="font-bold text-gold tabular-nums">
                            {payload[0].value}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="students" fill="var(--gold)" radius={[0, 4, 4, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}