'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Online Learning', href: '/online-learning-portal' },
  { label: 'Admin Panel', href: '/admin-panel' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <AppLogo size={38} />
            <div className="hidden sm:block">
              <span className="font-extrabold text-white text-lg leading-tight block">
                Derche Edu
              </span>
              <span className="text-gold text-xs font-medium leading-none">
                Educational Complex
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks?.map((link) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={`nav-${link?.href}`}
                  href={link?.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-gold' :'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link?.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0244255994"
              className="hidden lg:flex items-center gap-2 text-gold text-sm font-semibold hover:text-white transition-colors"
            >
              <Icon name="PhoneIcon" size={16} variant="solid" className="text-gold" />
              0244 255 994
            </a>
            <Link
              href="/online-learning-portal"
              className="hidden sm:inline-flex btn-gold px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Student Portal
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} variant="outline" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/20 py-3 pb-4 fade-in">
            {navLinks?.map((link) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={`mobile-nav-${link?.href}`}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors ${
                    isActive
                      ? 'bg-white/10 text-gold' :'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link?.label}
                </Link>
              );
            })}
            <div className="mt-2 px-4">
              <a
                href="tel:0244255994"
                className="flex items-center gap-2 text-gold text-sm font-semibold"
              >
                <Icon name="PhoneIcon" size={16} variant="solid" />
                0244 255 994
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}