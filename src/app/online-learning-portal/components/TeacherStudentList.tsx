'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const students = [
  { id: 'stu-001', name: 'Kwame Asante', class: 'JHS 2A', attendance: 92, lastSeen: '05 Oct', status: 'active' },
  { id: 'stu-002', name: 'Ama Boateng', class: 'JHS 2A', attendance: 88, lastSeen: '05 Oct', status: 'active' },
  { id: 'stu-003', name: 'Kofi Mensah', class: 'JHS 2A', attendance: 76, lastSeen: '03 Oct', status: 'active' },
  { id: 'stu-004', name: 'Akosua Frimpong', class: 'JHS 1B', attendance: 95, lastSeen: '05 Oct', status: 'active' },
  { id: 'stu-005', name: 'Yaw Darko', class: 'JHS 1B', attendance: 64, lastSeen: '29 Sep', status: 'at-risk' },
  { id: 'stu-006', name: 'Abena Owusu', class: 'JHS 3A', attendance: 90, lastSeen: '04 Oct', status: 'active' },
  { id: 'stu-007', name: 'Nana Acheampong', class: 'JHS 3A', attendance: 72, lastSeen: '02 Oct', status: 'active' },
  { id: 'stu-008', name: 'Efua Gyamfi', class: 'JHS 2B', attendance: 55, lastSeen: '25 Sep', status: 'at-risk' },
  { id: 'stu-009', name: 'Kwabena Sarfo', class: 'SHS 1', attendance: 98, lastSeen: '05 Oct', status: 'active' },
  { id: 'stu-010', name: 'Adwoa Asare', class: 'JHS 1A', attendance: 83, lastSeen: '04 Oct', status: 'active' },
];

const classGroups = ['All', 'JHS 1A', 'JHS 1B', 'JHS 2A', 'JHS 2B', 'JHS 3A', 'SHS 1'];

export default function TeacherStudentList() {
  const [classFilter, setClassFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = students?.filter((s) => {
    const matchesClass = classFilter === 'All' || s?.class === classFilter;
    const matchesSearch = s?.name?.toLowerCase()?.includes(search?.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="font-bold text-foreground text-base">My Students ({students?.length})</h2>
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            className="pl-9 pr-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-56"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {classGroups?.map((cls) => (
          <button
            key={`cls-filter-${cls}`}
            onClick={() => setClassFilter(cls)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              classFilter === cls ? 'bg-gold text-white' : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Class</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Attendance</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Seen</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filtered?.map((stu) => (
                  <tr key={stu?.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {stu?.name?.split(' ')?.map((n) => n?.[0])?.join('')}
                        </div>
                        <span className="font-medium text-foreground">{stu?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{stu?.class}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${stu?.attendance >= 80 ? 'bg-success' : stu?.attendance >= 65 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${stu?.attendance}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold tabular-nums ${stu?.attendance >= 80 ? 'text-success' : stu?.attendance >= 65 ? 'text-warning' : 'text-danger'}`}>
                          {stu?.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{stu?.lastSeen}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        stu?.status === 'active' ? 'status-approved' : 'status-rejected'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stu?.status === 'active' ? 'bg-success' : 'bg-danger'}`} />
                        {stu?.status === 'active' ? 'Active' : 'At Risk'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}