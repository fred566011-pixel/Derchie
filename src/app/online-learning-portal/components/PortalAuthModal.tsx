'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

type PortalRole = 'student' | 'teacher';

interface Props {
  role: PortalRole;
  onSuccess: (role: PortalRole, name: string, id: string) => void;
  onClose: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  classOrSubject: string;
}

// Backend integration point: replace mock auth with real API call
const MOCK_USERS = {
  student: { email: 'kwame.asante@derchedu.edu.gh', password: 'student2026', name: 'Kwame Asante', id: 'stu-001' },
  teacher: { email: 'abena.mensah@derchedu.edu.gh', password: 'teacher2026', name: 'Abena Mensah', id: 'tch-001' },
};

export default function PortalAuthModal({ role, onSuccess, onClose }: Props) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    setLoginError('');
    // Backend integration point: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 900));
    const mock = MOCK_USERS[role];
    if (data.email === mock.email && data.password === mock.password) {
      onSuccess(role, mock.name, mock.id);
    } else {
      setLoginError('Invalid credentials — use the demo accounts below to sign in');
    }
    setIsLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    // Backend integration point: POST /api/auth/register
    await new Promise((r) => setTimeout(r, 1000));
    setRegisterSuccess(true);
    setIsLoading(false);
  };

  const roleLabel = role === 'student' ? 'Student' : 'Teacher';
  const roleColor = role === 'student' ? 'text-primary' : 'text-gold';
  const roleBtnClass = role === 'student' ? 'btn-primary' : 'btn-gold';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-card-lg w-full max-w-md fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-extrabold text-foreground text-lg">
              <span className={roleLabel === 'Teacher' ? 'text-gold' : 'text-primary'}>{roleLabel}</span> Portal
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              Derche Educational Complex
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <Icon name="XMarkIcon" size={20} variant="outline" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(['login', 'register'] as const).map((t) => (
            <button
              key={`auth-tab-${t}`}
              onClick={() => { setTab(t); setLoginError(''); setRegisterSuccess(false); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === t
                  ? `border-b-2 ${role === 'student' ? 'border-primary text-primary' : 'border-gold text-gold'}`
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@derchedu.edu.gh"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  {...loginForm.register('email', { required: 'Email is required' })}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-danger text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow pr-10"
                    {...loginForm.register('password', { required: 'Password is required' })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={18} variant="outline" />
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-danger text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              {loginError && (
                <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-2">
                  <Icon name="ExclamationCircleIcon" size={16} variant="solid" className="text-danger flex-shrink-0 mt-0.5" />
                  <p className="text-danger text-xs">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`${roleBtnClass} w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60`}
              >
                {isLoading ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  `Sign In as ${roleLabel}`
                )}
              </button>

              {/* Demo credentials */}
              <div className="bg-muted rounded-lg p-3 border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Demo Credentials
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Email:</span>
                    <span className="text-xs font-mono text-foreground">{MOCK_USERS[role].email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Password:</span>
                    <span className="text-xs font-mono text-foreground">{MOCK_USERS[role].password}</span>
                  </div>
                </div>
              </div>
            </form>
          ) : registerSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircleIcon" size={32} variant="solid" className="text-success" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">Registration Submitted!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Your registration as a <strong>{roleLabel}</strong> has been submitted. The admin will
                review and approve your account. You will be notified once approved.
              </p>
              <p className="text-xs text-muted-foreground">
                Questions? Call{' '}
                <a href="tel:0244255994" className="text-primary font-semibold">0244 255 994</a>
              </p>
            </div>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kwame Asante"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...registerForm.register('fullName', { required: 'Full name is required' })}
                />
                {registerForm.formState.errors.fullName && (
                  <p className="text-danger text-xs mt-1">{registerForm.formState.errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...registerForm.register('email', { required: 'Email is required' })}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-danger text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 0244123456"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...registerForm.register('phone', { required: 'Phone is required' })}
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-danger text-xs mt-1">{registerForm.formState.errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  {role === 'student' ? 'Class / Year Group' : 'Subject(s) Teaching'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'student' ? 'e.g. JHS 2' : 'e.g. Core Mathematics, Science'}
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...registerForm.register('classOrSubject', { required: 'This field is required' })}
                />
                {registerForm.formState.errors.classOrSubject && (
                  <p className="text-danger text-xs mt-1">{registerForm.formState.errors.classOrSubject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                    {...registerForm.register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={18} variant="outline" />
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-danger text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${roleBtnClass} w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60`}
              >
                {isLoading ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  `Register as ${roleLabel}`
                )}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Registration requires admin approval before you can access the portal.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}