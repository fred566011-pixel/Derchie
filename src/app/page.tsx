import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import ProgramsSection from '@/app/components/ProgramsSection';
import OnlineLearningFeatures from '@/app/components/OnlineLearningFeatures';
import ContactSection from '@/app/components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <OnlineLearningFeatures />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}