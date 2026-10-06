'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

const kpis = [
  {
    id: 'kpi-pending',
    label: 'Pending Approvals',
    value: '7',
    sub: '4 students · 3 teachers',
    icon: 'ClockIcon',
    trend: 'up',
    trendLabel: '+3 since yesterday',
    bg: 'bg-warning/10 border-warning/30',
    iconBg: 'bg-warning/15',
    iconColor: 'text-warning',
    valueColor: 'text-warning',
  },
  {
    id: 'kpi-students',
    label: 'Total Students',
    value: '420',
    sub: '18 enrolled this week',
    icon: 'UserGroupIcon',
    trend: 'up',
    trendLabel: '+18 this week',
    bg: 'bg-card border-border',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    valueColor: 'text-foreground',
  },
  {
    id: 'kpi-teachers',
    label: 'Active Teachers',
    value: '28',
    sub: '2 pending onboarding',
    icon: 'AcademicCapIcon',
    trend: 'neutral',
    trendLabel: 'No change',
    bg: 'bg-card border-border',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
    valueColor: 'text-foreground',
  },
  {
    id: 'kpi-classes',
    label: 'Classes This Week',
    value: '64',
    sub: '3 live right now',
    icon: 'VideoCameraIcon',
    trend: 'up',
    trendLabel: '+6 vs last week',
    bg: 'bg-card border-border',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    valueColor: 'text-foreground',
  },
];

export default function AdminKPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className={`rounded-xl border p-5 shadow-card ${kpi.bg}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {kpi.label}
            </span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.iconBg}`}>
              <Icon name={kpi.icon as 'ClockIcon'} size={18} variant="solid" className={kpi.iconColor} />
            </div>
          </div>
          <div className={`text-3xl font-extrabold tabular-nums mb-1 ${kpi.valueColor}`}>
            {kpi.value}
          </div>
          <div className="text-xs text-muted-foreground">{kpi.sub}</div>
          <div className="mt-3 flex items-center gap-1">
            <Icon
              name={kpi.trend === 'up' ? 'ArrowTrendingUpIcon' : 'MinusIcon'}
              size={13}
              variant="solid"
              className={kpi.trend === 'up' ? 'text-success' : 'text-muted-foreground'}
            />
            <span
              className={`text-xs font-medium ${
                kpi.trend === 'up' ? 'text-success' : 'text-muted-foreground'
              }`}
            >
              {kpi.trendLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}