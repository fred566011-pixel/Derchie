'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const materials = [
  { id: 'mat-001', subject: 'Core Mathematics', title: 'Quadratic Equations — Notes & Examples', type: 'PDF', size: '1.2 MB', teacher: 'Mr. E. Boateng', date: '04 Oct 2026', downloads: 22 },
  { id: 'mat-002', subject: 'English Language', title: 'Argumentative Essay — Sample Answers', type: 'PDF', size: '0.8 MB', teacher: 'Mrs. A. Mensah', date: '03 Oct 2026', downloads: 19 },
  { id: 'mat-003', subject: 'Integrated Science', title: 'Photosynthesis Diagrams & Worksheet', type: 'PDF', size: '2.1 MB', teacher: 'Mr. K. Owusu', date: '03 Oct 2026', downloads: 17 },
  { id: 'mat-004', subject: 'Core Mathematics', title: 'BECE Past Questions 2020–2024', type: 'PDF', size: '3.4 MB', teacher: 'Mr. E. Boateng', date: '01 Oct 2026', downloads: 24 },
  { id: 'mat-005', subject: 'Social Studies', title: 'Governance in Ghana — Chapter 7', type: 'PDF', size: '1.5 MB', teacher: 'Ms. Y. Frimpong', date: '30 Sep 2026', downloads: 15 },
  { id: 'mat-006', subject: 'French', title: 'Verbes Irréguliers — Conjugation Tables', type: 'PDF', size: '0.6 MB', teacher: 'Mr. A. Gyamfi', date: '29 Sep 2026', downloads: 12 },
  { id: 'mat-007', subject: 'Integrated Science', title: 'The Digestive System — Illustrated Notes', type: 'PDF', size: '1.9 MB', teacher: 'Mr. K. Owusu', date: '28 Sep 2026', downloads: 20 },
  { id: 'mat-008', subject: 'BDT', title: 'Business Planning — Assignment Brief', type: 'PDF', size: '0.4 MB', teacher: 'Mr. P. Acheampong', date: '27 Sep 2026', downloads: 14 },
];

const subjects = ['All', ...Array.from(new Set(materials.map((m) => m.subject)))];

const subjectColors: Record<string, string> = {
  'Core Mathematics': 'bg-blue-100 text-blue-700',
  'English Language': 'bg-green-100 text-green-700',
  'Integrated Science': 'bg-purple-100 text-purple-700',
  'Social Studies': 'bg-amber-100 text-amber-700',
  'French': 'bg-pink-100 text-pink-700',
  'BDT': 'bg-orange-100 text-orange-700',
};

export default function CourseMaterials() {
  const [filter, setFilter] = useState('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filtered = filter === 'All' ? materials : materials.filter((m) => m.subject === filter);

  const handleDownload = async (id: string) => {
    setDownloadingId(id);
    // Backend integration point: GET /api/materials/:id/download
    await new Promise((r) => setTimeout(r, 700));
    setDownloadingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-base">Course Materials</h2>
        <span className="text-xs text-muted-foreground">{filtered.length} files</span>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {subjects.map((subj) => (
          <button
            key={`filter-${subj}`}
            onClick={() => setFilter(subj)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
              filter === subj
                ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((mat) => {
          const subjColor = subjectColors[mat.subject] ?? 'bg-gray-100 text-gray-700';
          const isDownloading = downloadingId === mat.id;

          return (
            <div
              key={mat.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 hover:shadow-card-md transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="DocumentTextIcon" size={20} variant="solid" className="text-red-500" />
                </div>
                <div className="min-w-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${subjColor} mb-1 inline-block`}>
                    {mat.subject}
                  </span>
                  <h4 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                    {mat.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{mat.teacher}</span>
                <span>{mat.size} · {mat.type}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="ArrowDownTrayIcon" size={12} variant="outline" />
                  {mat.downloads} downloads
                </div>
                <button
                  onClick={() => handleDownload(mat.id)}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/15 transition-colors disabled:opacity-60 active:scale-95"
                >
                  {isDownloading ? (
                    <Icon name="ArrowPathIcon" size={13} variant="outline" className="animate-spin" />
                  ) : (
                    <Icon name="ArrowDownTrayIcon" size={13} variant="outline" />
                  )}
                  {isDownloading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}