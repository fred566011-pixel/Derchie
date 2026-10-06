import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-semibold tracking-wide uppercase">
              Now Accepting Enrollments — 2026/2027
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance">
            Quality Education,{' '}
            <span className="text-gold">Right From Home</span>
          </h1>

          <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
            Derche Educational Complex in Kubease Sekyere brings world-class learning
            to every student — from nursery through secondary — with live online classes,
            dedicated teachers, and a community that cares.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/online-learning-portal"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base"
            >
              <Icon name="PlayCircleIcon" size={20} variant="solid" />
              Join a Live Class
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-150"
            >
              Learn More
              <Icon name="ArrowDownIcon" size={18} variant="outline" />
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { label: 'Students Enrolled', value: '420+' },
              { label: 'Qualified Teachers', value: '28' },
              { label: 'Subjects Offered', value: '15' },
              { label: 'Live Classes Weekly', value: '60+' },
            ]?.map((stat) => (
              <div key={`hero-stat-${stat?.label}`}>
                <div className="text-3xl font-extrabold text-gold tabular-nums">{stat?.value}</div>
                <div className="text-white/60 text-sm mt-0.5">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}