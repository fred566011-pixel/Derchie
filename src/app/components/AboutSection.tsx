import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-light-blue rounded-full px-4 py-1.5 mb-4">
              <Icon name="AcademicCapIcon" size={16} variant="solid" className="text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wide uppercase">About Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-5 text-balance">
              Rooted in Kubease Sekyere,{' '}
              <span className="text-primary">Reaching the World</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Derche Educational Complex was founded with a single mission: to provide every child
              in Kubease Sekyere and surrounding communities with access to high-quality education —
              whether they walk through our gates or connect from home.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Located off the Accra road, our complex serves students from nursery through JHS and
              senior secondary levels. Our newly launched online learning platform ensures that
              distance is never a barrier to greatness.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'EyeIcon', title: 'Our Vision', desc: 'To be the leading educational institution in the Ashanti Region, nurturing future leaders.' },
                { icon: 'LightBulbIcon', title: 'Our Mission', desc: 'Deliver holistic, accessible education blending in-person excellence with digital innovation.' },
              ].map((item) => (
                <div key={`about-${item.title}`} className="bg-muted rounded-xl p-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={item.icon as 'EyeIcon'} size={18} variant="solid" className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="font-bold text-foreground text-xl mb-6">Why Choose Derche Edu?</h3>
            <ul className="space-y-4">
              {[
                { icon: 'CheckBadgeIcon', title: 'Certified Curriculum', desc: 'Fully aligned with Ghana Education Service standards.' },
                { icon: 'VideoCameraIcon', title: 'Live Online Classes', desc: 'Join interactive sessions with teachers in real time from anywhere.' },
                { icon: 'UserGroupIcon', title: 'Small Class Sizes', desc: 'Personalized attention with a maximum of 25 students per class.' },
                { icon: 'ShieldCheckIcon', title: 'Safe Environment', desc: 'A secure, monitored learning environment — online and on campus.' },
                { icon: 'TrophyIcon', title: 'Proven Results', desc: 'Consistently strong BECE and WASSCE performance records.' },
              ].map((item) => (
                <li key={`value-${item.title}`} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={item.icon as 'CheckBadgeIcon'} size={18} variant="solid" className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}