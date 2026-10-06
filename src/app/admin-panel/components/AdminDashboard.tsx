'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AdminKPICards from './AdminKPICards';
import PendingApprovalsTable from './PendingApprovalsTable';
import AdminCharts from './AdminCharts';

type AdminTab = 'approvals' | 'students' | 'teachers' | 'analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('approvals');

  const tabs = [
    { id: 'approvals' as const, label: 'Pending Approvals', icon: 'ClockIcon', badge: 7 },
    { id: 'students' as const, label: 'All Students', icon: 'UserGroupIcon', badge: 0 },
    { id: 'teachers' as const, label: 'All Teachers', icon: 'AcademicCapIcon', badge: 0 },
    { id: 'analytics' as const, label: 'Analytics', icon: 'ChartBarIcon', badge: 0 },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold text-primary">
              <Icon name="ShieldCheckIcon" size={12} variant="solid" />
              Administration
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Derche Educational Complex · Monday, 05 October 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
            <Icon name="BellAlertIcon" size={16} variant="solid" className="text-warning" />
            <span className="text-warning text-xs font-semibold">7 pending approvals</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <Icon name="ArrowDownTrayIcon" size={16} variant="outline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <AdminKPICards />

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={`admin-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon
              name={tab.icon as 'ClockIcon'}
              size={15}
              variant={activeTab === tab.id ? 'solid' : 'outline'}
            />
            {tab.label}
            {tab.badge > 0 && (
              <span className="bg-warning text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'approvals' && <PendingApprovalsTable />}
      {activeTab === 'students' && <AllUsersTable role="student" />}
      {activeTab === 'teachers' && <AllUsersTable role="teacher" />}
      {activeTab === 'analytics' && <AdminCharts />}
    </div>
  );
}

// ─── Inline All Users Table ───────────────────────────────────────────────────
const allStudents = [
  { id: 'stu-001', name: 'Kwame Asante', email: 'kwame.asante@derchedu.edu.gh', phone: '0244123456', class: 'JHS 2A', joinDate: '12 Aug 2026', status: 'approved' },
  { id: 'stu-002', name: 'Ama Boateng', email: 'ama.boateng@derchedu.edu.gh', phone: '0551234567', class: 'JHS 2A', joinDate: '12 Aug 2026', status: 'approved' },
  { id: 'stu-003', name: 'Kofi Mensah', email: 'kofi.mensah@derchedu.edu.gh', phone: '0241234567', class: 'JHS 2A', joinDate: '13 Aug 2026', status: 'approved' },
  { id: 'stu-004', name: 'Akosua Frimpong', email: 'akosua.frimpong@derchedu.edu.gh', phone: '0209876543', class: 'JHS 1B', joinDate: '14 Aug 2026', status: 'approved' },
  { id: 'stu-005', name: 'Yaw Darko', email: 'yaw.darko@derchedu.edu.gh', phone: '0271234567', class: 'JHS 1B', joinDate: '15 Aug 2026', status: 'approved' },
  { id: 'stu-006', name: 'Abena Owusu', email: 'abena.owusu@derchedu.edu.gh', phone: '0244987654', class: 'JHS 3A', joinDate: '10 Aug 2026', status: 'approved' },
  { id: 'stu-007', name: 'Nana Acheampong', email: 'nana.acheampong@derchedu.edu.gh', phone: '0551987654', class: 'JHS 3A', joinDate: '10 Aug 2026', status: 'approved' },
  { id: 'stu-008', name: 'Efua Gyamfi', email: 'efua.gyamfi@derchedu.edu.gh', phone: '0241987654', class: 'JHS 2B', joinDate: '11 Aug 2026', status: 'approved' },
];

const allTeachers = [
  { id: 'tch-001', name: 'Abena Mensah', email: 'abena.mensah@derchedu.edu.gh', phone: '0244255994', subject: 'English Language', joinDate: '01 Aug 2026', status: 'approved' },
  { id: 'tch-002', name: 'Emmanuel Boateng', email: 'e.boateng@derchedu.edu.gh', phone: '0244112233', subject: 'Core Mathematics', joinDate: '01 Aug 2026', status: 'approved' },
  { id: 'tch-003', name: 'Kofi Owusu', email: 'k.owusu@derchedu.edu.gh', phone: '0551223344', subject: 'Integrated Science', joinDate: '02 Aug 2026', status: 'approved' },
  { id: 'tch-004', name: 'Yaa Frimpong', email: 'y.frimpong@derchedu.edu.gh', phone: '0241334455', subject: 'Social Studies', joinDate: '02 Aug 2026', status: 'approved' },
  { id: 'tch-005', name: 'Adu Gyamfi', email: 'a.gyamfi@derchedu.edu.gh', phone: '0209445566', subject: 'French', joinDate: '03 Aug 2026', status: 'approved' },
  { id: 'tch-006', name: 'Prince Acheampong', email: 'p.acheampong@derchedu.edu.gh', phone: '0271556677', subject: 'BDT', joinDate: '03 Aug 2026', status: 'approved' },
];

function AllUsersTable({ role }: { role: 'student' | 'teacher' }) {
  const data = role === 'student' ? allStudents : allTeachers;
  const [search, setSearch] = useState('');

  const filtered = data.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="font-bold text-foreground text-base">
          All {role === 'student' ? 'Students' : 'Teachers'} ({data.length})
        </h2>
        <div className="relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={16}
            variant="outline"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder={`Search ${role}s...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Phone
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {role === 'student' ? 'Class' : 'Subject'}
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Joined
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                    No {role}s found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                      {user.phone}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {'class' in user ? user.class : user.subject}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{user.joinDate}</td>
                    <td className="px-4 py-3">
                      <span className="status-approved inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        Approved
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