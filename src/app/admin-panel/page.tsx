import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminPanelClient from '@/app/admin-panel/components/AdminPanelClient';

export default function AdminPanelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <AdminPanelClient />
      </main>
      <Footer />
    </div>
  );
}