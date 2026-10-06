import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={40} />
              <div>
                <span className="font-extrabold text-white text-lg block">
                  Derche Educational Complex
                </span>
                <span className="text-gold text-xs font-medium">
                  Kubease Sekyere, Ghana
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Providing quality education from nursery to secondary level. Empowering
              the next generation of Ghanaian leaders through innovative online and
              in-person learning.
            </p>
            <div className="mt-4 flex items-center gap-2 text-gold text-sm font-semibold">
              <Icon name="PhoneIcon" size={16} variant="solid" />
              <a href="tel:0244255994" className="hover:text-white transition-colors">
                0244 255 994
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Online Learning Portal', href: '/online-learning-portal' },
                { label: 'Admin Panel', href: '/admin-panel' },
              ]?.map((link) => (
                <li key={`footer-${link?.href}`}>
                  <Link
                    href={link?.href}
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <Icon name="MapPinIcon" size={16} variant="solid" className="text-gold mt-0.5 flex-shrink-0" />
                Kubease Sekyere, off the Accra Road, Ghana
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Icon name="PhoneIcon" size={16} variant="solid" className="text-gold flex-shrink-0" />
                <a href="tel:0244255994" className="hover:text-gold transition-colors">
                  0244 255 994
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Icon name="EnvelopeIcon" size={16} variant="solid" className="text-gold flex-shrink-0" />
                info@derchedu.edu.gh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2026 Derche Educational Complex. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Kubease Sekyere · Ashanti Region · Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}