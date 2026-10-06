import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-light-blue rounded-full px-4 py-1.5 mb-4">
            <Icon name="PhoneIcon" size={16} variant="solid" className="text-primary" />
            <span className="text-primary text-xs font-semibold tracking-wide uppercase">Get In Touch</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-3">
            Contact Derche Edu
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Have questions about enrollment, programs, or our online learning platform?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href="tel:0244255994"
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-muted border border-border hover:border-primary/30 hover:bg-light-blue transition-all duration-200 card-hover"
          >
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4">
              <Icon name="PhoneIcon" size={26} variant="solid" className="text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Call Us</h3>
            <p className="text-primary font-semibold text-lg tabular-nums">0244 255 994</p>
            <p className="text-muted-foreground text-xs mt-1">Mon–Fri, 7am – 5pm</p>
          </a>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-muted border border-border">
            <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center mb-4">
              <Icon name="MapPinIcon" size={26} variant="solid" className="text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Visit Us</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Kubease Sekyere<br />
              Off the Accra Road<br />
              Ashanti Region, Ghana
            </p>
          </div>

          <a
            href="mailto:info@derchedu.edu.gh"
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-muted border border-border hover:border-primary/30 hover:bg-light-blue transition-all duration-200 card-hover"
          >
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4">
              <Icon name="EnvelopeIcon" size={26} variant="solid" className="text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Email Us</h3>
            <p className="text-primary font-semibold text-sm break-all">info@derchedu.edu.gh</p>
            <p className="text-muted-foreground text-xs mt-1">We reply within 24 hours</p>
          </a>
        </div>
      </div>
    </section>
  );
}