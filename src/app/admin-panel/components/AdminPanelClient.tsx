'use client';
import React, { useState } from 'react';
import AdminAuthGate from './AdminAuthGate';
import AdminDashboard from './AdminDashboard';

export default function AdminPanelClient() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <AdminAuthGate onAuth={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}