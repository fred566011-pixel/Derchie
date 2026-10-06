import React from 'react';
import Icon from '@/components/ui/AppIcon';

const programs = [
  {
    id: 'prog-nursery',
    level: 'Nursery & Kindergarten',
    ages: 'Ages 2 – 5',
    icon: 'StarIcon',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-500',
    subjects: ['Phonics & Reading', 'Numeracy', 'Creative Arts', 'Social Skills'],
    description: 'Building the foundation of curiosity, creativity, and confidence in our youngest learners.',
  },
  {
    id: 'prog-primary',
    level: 'Primary School',
    ages: 'Classes 1 – 6',
    icon: 'BookOpenIcon',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'ICT', 'R.M.E'],
    description: 'Core academic skills delivered through engaging, activity-based learning methods.',
  },
  {
    id: 'prog-jhs',
    level: 'Junior High School',
    ages: 'JHS 1 – 3',
    icon: 'AcademicCapIcon',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    subjects: ['Core Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'French', 'BDT'],
    description: 'Rigorous BECE preparation with dedicated tutoring and mock examinations.',
  },
  {
    id: 'prog-shs',
    level: 'Senior High School',
    ages: 'SHS 1 – 3',
    icon: 'TrophyIcon',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    subjects: ['Core English', 'Core Mathematics', 'Elective Sciences', 'Elective Arts', 'Business Studies'],
    description: 'Comprehensive WASSCE preparation across Science, Arts, and Business tracks.',
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-16 lg:py-24 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-light-blue rounded-full px-4 py-1.5 mb-4">
            <Icon name="BookOpenIcon" size={16} variant="solid" className="text-primary" />
            <span className="text-primary text-xs font-semibold tracking-wide uppercase">Programs Offered</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-3 text-balance">
            Education for Every Stage
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            From our youngest nursery pupils to WASSCE candidates — we offer structured,
            certified programs at every level of a child's educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-2xl border-2 p-6 card-hover ${prog.color}`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon name={prog.icon as 'StarIcon'} size={24} variant="solid" className={prog.iconColor} />
              </div>
              <div className="inline-block bg-white/70 rounded-full px-2.5 py-0.5 text-xs font-semibold text-muted-foreground mb-2">
                {prog.ages}
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{prog.level}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">{prog.description}</p>
              <ul className="space-y-1.5">
                {prog.subjects.map((subj) => (
                  <li key={`${prog.id}-${subj}`} className="flex items-center gap-2 text-xs text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 flex-shrink-0" />
                    {subj}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}