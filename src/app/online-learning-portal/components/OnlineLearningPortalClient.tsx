'use client';
import React, { useState } from 'react';
import StudentPortal from './StudentPortal';
import TeacherPortal from './TeacherPortal';
import PortalAuthModal from './PortalAuthModal';
import Icon from '@/components/ui/AppIcon';

type PortalRole = 'student' | 'teacher';
type AuthState = { role: PortalRole; name: string; id: string } | null;

export default function OnlineLearningPortalClient() {
  const [auth, setAuth] = useState<AuthState>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRole, setPendingRole] = useState<PortalRole>('student');

  const handleRoleAccess = (role: PortalRole) => {
    setPendingRole(role);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (role: PortalRole, name: string, id: string) => {
    setAuth({ role, name, id });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setAuth(null);
  };

  if (auth) {
    return auth.role === 'student' ? (
      <StudentPortal user={auth} onLogout={handleLogout} />
    ) : (
      <TeacherPortal user={auth} onLogout={handleLogout} />
    );
  }

  return (
    <>
      {/* Portal Landing */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-light-blue rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold tracking-wide uppercase">
              Online Learning Portal
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4 text-balance">
            Welcome to Derche Edu&apos;s{' '}
            <span className="text-primary">Digital Classroom</span>
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto">
            Join live classes, access course materials, and connect with your teachers —
            all from the comfort of your home.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Card */}
          <div className="bg-card border-2 border-border rounded-2xl p-8 card-hover flex flex-col items-center text-center group hover:border-primary/40">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <Icon name="UserIcon" size={38} variant="solid" className="text-primary" />
            </div>
            <h2 className="font-extrabold text-foreground text-xl mb-2">Student Portal</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              View your class schedule, join live sessions with your teachers, access course
              materials, and track your learning progress.
            </p>
            <ul className="text-left w-full space-y-2 mb-6">
              {[
                'Join live video classes',
                'View weekly timetable',
                'Download course materials',
                'Track attendance & progress',
              ].map((item) => (
                <li key={`student-feat-${item}`} className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleRoleAccess('student')}
              className="btn-primary w-full py-3 rounded-xl font-semibold text-sm"
            >
              Enter Student Portal
            </button>
          </div>

          {/* Teacher Card */}
          <div className="bg-card border-2 border-border rounded-2xl p-8 card-hover flex flex-col items-center text-center group hover:border-gold/40">
            <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
              <Icon name="AcademicCapIcon" size={38} variant="solid" className="text-gold" />
            </div>
            <h2 className="font-extrabold text-foreground text-xl mb-2">Teacher Portal</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Manage your scheduled classes, start live sessions, upload course materials,
              and track student attendance and performance.
            </p>
            <ul className="text-left w-full space-y-2 mb-6">
              {[
                'Start & host live classes',
                'Manage class schedules',
                'Upload notes & assignments',
                'Monitor student attendance',
              ].map((item) => (
                <li key={`teacher-feat-${item}`} className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleRoleAccess('teacher')}
              className="btn-gold w-full py-3 rounded-xl font-semibold text-sm"
            >
              Enter Teacher Portal
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-10 max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">New students and teachers</span> must first register and wait for admin
            approval before accessing the portal. Contact{' '}
            <a href="tel:0244255994" className="font-semibold underline">0244 255 994</a> for assistance.
          </p>
        </div>
      </div>

      {showAuthModal && (
        <PortalAuthModal
          role={pendingRole}
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}