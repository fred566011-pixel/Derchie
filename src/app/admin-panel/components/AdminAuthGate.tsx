'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface Props {
  onAuth: () => void;
}

interface AdminLoginForm {
  email: string;
  password: string;
}

// Backend integration point: replace with real admin auth
const ADMIN_CREDS = { email: 'admin@derchedu.edu.gh', password: 'DercheAdmin2026' };

export default function AdminAuthGate({ onAuth }: Props) {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    setLoading(true);
    setError('');
    // Backend integration point: POST /api/admin/auth/login
    await new Promise((r) => setTimeout(r, 800));
    if (data.email === ADMIN_CREDS.email && data.password === ADMIN_CREDS.password) {
      onAuth();
    } else {
      setError('Invalid credentials — use the demo accounts below to sign in');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card-lg">
            <Icon name="ShieldCheckIcon" size={32} variant="solid" className="text-white" /></div>
          <h1 className="text-2xl font-extrabold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Derche Educational Complex — Administration
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@derchedu.edu.gh"
                className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={18} variant="outline" />
                </button>
              </div>
              {errors.password && (
                <p className="text-danger text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" className="text-danger flex-shrink-0 mt-0.5" />
                <p className="text-danger text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Icon name="LockOpenIcon" size={16} variant="solid" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Demo credentials box */}
          <div className="mt-5 bg-muted rounded-lg p-3 border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Demo Admin Credentials
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Email:</span>
                <button
                  type="button"
                  onClick={() => setValue('email', ADMIN_CREDS.email)}
                  className="text-xs font-mono text-primary hover:underline"
                >
                  {ADMIN_CREDS.email}
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Password:</span>
                <button
                  type="button"
                  onClick={() => setValue('password', ADMIN_CREDS.password)}
                  className="text-xs font-mono text-primary hover:underline"
                >
                  {ADMIN_CREDS.password}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click email or password to auto-fill the form.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Restricted access — Derche Educational Complex staff only.
          <br />
          Issues? Call{' '}
          <a href="tel:0244255994" className="text-primary font-semibold">
            0244 255 994
          </a>
        </p>
      </div>
    </div>
  );
}