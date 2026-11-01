import React, { useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../utils/storage';
import { BathLogo } from './BathLogo';
import { X, Lock, Mail, User, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن لا تقل عن 6 خانات');
      return;
    }

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      plan: 'free',
      watchlist: StorageService.getWatchlist(),
    };

    StorageService.saveUser(user);
    onLoginSuccess(user);
    onClose();
  };

  const handleDemoGuestLogin = () => {
    const demoUser: UserProfile = {
      id: 'demo-viewer',
      name: 'مُشاهد تجريبي',
      email: 'viewer@bath.sa',
      plan: 'monthly',
      watchlist: ['bath-001', 'bath-002', 'bath-003'],
    };
    StorageService.saveUser(demoUser);
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleDemoAdminLogin = () => {
    const adminUser: UserProfile = {
      id: 'admin-01',
      name: 'مدير المحتوى (بَث)',
      email: 'admin@bath.sa',
      plan: 'annual',
      watchlist: ['bath-001', 'bath-002', 'bath-004', 'bath-005'],
    };
    StorageService.saveUser(adminUser);
    StorageService.setAdminAuthenticated(true);
    onLoginSuccess(adminUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      dir="rtl"
    >
      <div className="relative w-full max-w-md bg-[#0B2D33] border border-[#234536] rounded-3xl p-6 sm:p-8 shadow-2xl text-right">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-[#A3BDBC] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Heading */}
        <div className="text-center mb-6">
          <BathLogo size="md" variant="white" showWordmark={true} />
          <h3 className="text-xl font-bold text-white mt-4 font-heading">
            {tab === 'login' ? 'تسجيل الدخول إلى بَث' : 'إنشاء حساب جديد'}
          </h3>
          <p className="text-xs text-[#A3BDBC] mt-1">
            تجربة مصادقة تجريبية للمنصة (MVP Session)
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#052329] p-1 rounded-xl mb-6 border border-[#234536]/80">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-[#234536] text-white shadow-sm'
                : 'text-[#A3BDBC] hover:text-white'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'register'
                ? 'bg-[#234536] text-white shadow-sm'
                : 'text-[#A3BDBC] hover:text-white'
            }`}
          >
            إنشاء حساب
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/70 border border-red-800 rounded-xl text-red-200 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#E8F0EA] mb-1">
                الاسم
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="محمد العتيبي"
                  className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7F903E]"
                />
                <User className="w-4 h-4 text-[#A3BDBC] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#E8F0EA] mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7F903E]"
              />
              <Mail className="w-4 h-4 text-[#A3BDBC] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E8F0EA] mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7F903E]"
              />
              <Lock className="w-4 h-4 text-[#A3BDBC] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm shadow-md transition-all cursor-pointer mt-2"
          >
            {tab === 'login' ? 'دخول' : 'تأكيد التسجيل'}
          </button>
        </form>

        {/* Demo Fast Logins for Pitch / Evaluators */}
        <div className="mt-6 pt-5 border-t border-[#234536]/60">
          <p className="text-[11px] text-center text-[#A3BDBC] mb-3 font-medium">
            للتجربة السريعة أثناء تقييم الحاضنة أو المستثمرين:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoGuestLogin}
              className="py-2 px-3 rounded-xl bg-[#234536]/50 hover:bg-[#234536] border border-[#234536] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7F903E]" />
              <span>دخول مشترك بلس</span>
            </button>
            <button
              onClick={handleDemoAdminLogin}
              className="py-2 px-3 rounded-xl bg-[#283D48]/50 hover:bg-[#283D48] border border-[#283D48] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>دخول مسؤول المحتوى</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
