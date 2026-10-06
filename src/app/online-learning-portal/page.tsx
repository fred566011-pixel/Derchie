import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlineLearningPortalClient from '@/app/online-learning-portal/components/OnlineLearningPortalClient';

export default function OnlineLearningPortalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <OnlineLearningPortalClient />
      </main>
      <Footer />
    </div>
  );
}