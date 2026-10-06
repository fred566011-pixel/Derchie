'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function LiveClassBanner() {
  const [joined, setJoined] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card-md">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon name="VideoCameraIcon" size={24} variant="solid" className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-white live-pulse" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">Live Now</span>
          </div>
          <h3 className="font-bold text-white text-base">
            Core Mathematics — Quadratic Equations
          </h3>
          <p className="text-white/80 text-xs mt-0.5">
            Mr. Emmanuel Boateng · JHS 2A · Started 10 mins ago · 18/25 students joined
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {joined ? (
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2.5">
            <Icon name="CheckCircleIcon" size={18} variant="solid" className="text-white" />
            <span className="text-white text-sm font-semibold">Joined!</span>
          </div>
        ) : (
          <button
            onClick={() => setJoined(true)}
            className="gold-pulse bg-white text-red-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all duration-150 active:scale-95"
          >
            Join Now
          </button>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="XMarkIcon" size={18} variant="outline" />
        </button>
      </div>
    </div>
  );
}