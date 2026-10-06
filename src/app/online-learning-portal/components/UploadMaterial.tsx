'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface UploadForm {
  title: string;
  subject: string;
  classGroup: string;
  description: string;
}

export default function UploadMaterial() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UploadForm>();

  const onSubmit = async () => {
    setLoading(true);
    // Backend integration point: POST /api/materials/upload (multipart/form-data)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); reset(); }, 3000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-bold text-foreground text-base mb-5">Upload Course Material</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Material Title</label>
          <p className="text-muted-foreground text-xs mb-2">Give this material a clear, descriptive name.</p>
          <input
            type="text"
            placeholder="e.g. Quadratic Equations — Notes & Practice"
            className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Subject</label>
            <select
              className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-card"
              {...register('subject', { required: 'Subject is required' })}
            >
              <option value="">Select subject</option>
              <option>Core Mathematics</option>
              <option>English Language</option>
              <option>Integrated Science</option>
              <option>Social Studies</option>
              <option>French</option>
              <option>BDT</option>
              <option>R.M.E</option>
              <option>ICT</option>
            </select>
            {errors.subject && <p className="text-danger text-xs mt-1">{errors.subject.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Class / Year Group</label>
            <select
              className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-card"
              {...register('classGroup', { required: 'Class is required' })}
            >
              <option value="">Select class</option>
              <option>JHS 1A</option><option>JHS 1B</option><option>JHS 2A</option>
              <option>JHS 2B</option><option>JHS 3A</option><option>SHS 1</option>
              <option>SHS 2</option><option>SHS 3</option><option>All Classes</option>
            </select>
            {errors.classGroup && <p className="text-danger text-xs mt-1">{errors.classGroup.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Description (Optional)</label>
          <textarea
            rows={3}
            placeholder="Brief description of what this material covers..."
            className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            {...register('description')}
          />
        </div>

        {/* File Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            dragOver ? 'border-gold bg-gold/5' : 'border-border hover:border-primary/40 hover:bg-light-blue/30'
          }`}
        >
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="ArrowUpTrayIcon" size={24} variant="outline" className="text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground text-sm mb-1">Drop your file here, or click to browse</p>
          <p className="text-muted-foreground text-xs">Supports PDF, DOCX, PPTX, images — max 20MB</p>
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all duration-150 active:scale-[0.98] ${
            success ? 'bg-success text-white' : 'btn-gold'
          }`}
        >
          {loading ? (
            <><Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />Uploading...</>
          ) : success ? (
            <><Icon name="CheckCircleIcon" size={16} variant="solid" />Material Uploaded Successfully!</>
          ) : (
            <><Icon name="ArrowUpTrayIcon" size={16} variant="solid" />Upload Material</>
          )}
        </button>
      </form>
    </div>
  );
}