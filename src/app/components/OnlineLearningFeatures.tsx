import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const features = [
  {
    id: 'feat-live',
    icon: 'VideoCameraIcon',
    title: 'Live Interactive Classes',
    desc: 'Join real-time video sessions with your teacher. Ask questions, participate in discussions, and never miss a lesson.',
  },
  {
    id: 'feat-schedule',
    icon: 'CalendarDaysIcon',
    title: 'Class Schedules',
    desc: 'View your full weekly timetable online. Know exactly when your next class is and never be caught unprepared.',
  },
  {
    id: 'feat-materials',
    icon: 'DocumentTextIcon',
    title: 'Course Materials',
    desc: 'Access notes, past questions, and assignments uploaded by your teachers — available 24/7.',
  },
  {
    id: 'feat-track',
    icon: 'ChartBarIcon',
    title: 'Progress Tracking',
    desc: 'Students and parents can monitor attendance, assignment completion, and academic progress.',
  },
  {
    id: 'feat-portal',
    icon: 'UserCircleIcon',
    title: 'Personal Portal',
    desc: 'Each student and teacher has a dedicated portal with their schedule, classes, and profile.',
  },
  {
    id: 'feat-secure',
    icon: 'LockClosedIcon',
    title: 'Secure & Monitored',
    desc: 'All sessions are moderated by school administration. Only approved users can access classes.',
  },
];

export default function OnlineLearningFeatures() {
  return (
    <section id="online-learning" className="py-16 lg:py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f5a623 0%, transparent 40%)' }} />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
            <Icon name="WifiIcon" size={16} variant="solid" className="text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wide uppercase">Online Learning</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 text-balance">
            Learn From Anywhere in Ghana
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">
            Our digital classroom brings Derche Edu's quality teaching directly to your device —
            phone, tablet, or computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 card-hover"
            >
              <div className="w-11 h-11 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name={feat.icon as 'VideoCameraIcon'} size={22} variant="solid" className="text-gold" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/online-learning-portal"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base"
          >
            <Icon name="ArrowRightCircleIcon" size={20} variant="solid" />
            Access the Learning Portal
          </Link>
        </div>
      </div>
    </section>
  );
}