import React, { useState } from 'react';
import { BathLogo } from './BathLogo';
import { ViewState, UserProfile } from '../types';
import { 
  Search, 
  Bookmark, 
  Sparkles, 
  ShieldAlert, 
  User, 
  Menu, 
  X, 
  Compass, 
  Tv, 
  Film, 
  CreditCard,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  watchlistCount: number;
  user: UserProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  watchlistCount,
  user,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', action: () => onNavigate({ type: 'home' }) },
    { id: 'explore', label: 'استكشاف', action: () => onNavigate({ type: 'explore' }), icon: Compass },
    { id: 'series', label: 'المسلسلات', action: () => onNavigate({ type: 'series' }), icon: Tv },
    { id: 'shows', label: 'البرامج والحوارات', action: () => onNavigate({ type: 'shows' }) },
    { id: 'shorts', label: 'محتوى قصير', action: () => onNavigate({ type: 'shorts' }) },
    { id: 'subscriptions', label: 'الاشتراكات', action: () => onNavigate({ type: 'subscriptions' }), icon: CreditCard },
  ];

  const isCurrentActive = (id: string) => {
    return currentView.type === id;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#052329]/95 backdrop-blur-md border-b border-[#234536]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Right side (RTL start): Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F903E] rounded-lg p-1"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <BathLogo size="md" variant="white" showWordmark={true} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.action}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isCurrentActive(link.id)
                    ? 'bg-[#234536] text-white font-bold shadow-sm shadow-[#234536]/50'
                    : 'text-[#E8F0EA]/80 hover:text-white hover:bg-[#234536]/30'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Left side (RTL end): Search, Watchlist, Investors Deck, Profile, Mobile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search */}
          <div className="relative flex items-center">
            {isSearchExpanded ? (
              <div className="flex items-center bg-[#0B2D33] border border-[#234536] rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-[#A3BDBC] shrink-0 ml-2" />
                <input
                  type="text"
                  placeholder="ابحث عن مسلسل، برنامج، تصنيف..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (currentView.type !== 'explore') {
                      onNavigate({ type: 'explore' });
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-sm text-white placeholder-[#A3BDBC]/60 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    onSearchChange('');
                  }}
                  className="text-[#A3BDBC] hover:text-white mr-1"
                  aria-label="إغلاق البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchExpanded(true);
                  if (currentView.type !== 'explore') {
                    onNavigate({ type: 'explore' });
                  }
                }}
                className="p-2 rounded-full text-[#E8F0EA] hover:bg-[#234536]/40 hover:text-white transition-colors"
                title="بحث في المنصة"
                aria-label="بحث في المنصة"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Watchlist Quick Button */}
          <button
            onClick={() => onNavigate({ type: 'watchlist' })}
            className={`relative p-2 rounded-full transition-colors ${
              currentView.type === 'watchlist'
                ? 'bg-[#234536] text-white'
                : 'text-[#E8F0EA] hover:bg-[#234536]/40 hover:text-white'
            }`}
            title="قائمة المشاهدة"
            aria-label="قائمة المشاهدة"
          >
            <Bookmark className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7F903E] text-white text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-[#052329]">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Pitch Deck / Investors Button */}
          <button
            onClick={() => onNavigate({ type: 'investors' })}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer ${
              currentView.type === 'investors'
                ? 'bg-[#7F903E] text-white border-[#7F903E] shadow-sm'
                : 'text-[#7F903E] border-[#7F903E]/50 hover:bg-[#7F903E]/15'
            }`}
            title="عرض ملف المستثمرين وحاضنات الأعمال"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>بَث للمستثمرين</span>
          </button>

          {/* Admin CMS Button */}
          <button
            onClick={() => onNavigate({ type: 'admin' })}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              currentView.type === 'admin'
                ? 'bg-[#283D48] text-white border-[#283D48]'
                : 'text-[#A3BDBC] border-[#283D48]/60 hover:bg-[#283D48]/30 hover:text-white'
            }`}
            title="لوحة الإدارة والمؤشرات"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>لوحة الإدارة</span>
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#234536]/40 transition-colors focus:outline-none"
              aria-label="قائمة المستخدم"
            >
              <div className="w-8 h-8 rounded-full bg-[#234536] border border-[#7F903E]/50 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                className="absolute left-0 mt-2 w-56 bg-[#0B2D33] border border-[#234536] rounded-xl shadow-xl py-2 z-50 text-right"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-[#234536]/60">
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  <p className="text-xs text-[#A3BDBC] truncate">{user.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] bg-[#234536] text-[#E8F0EA] px-2 py-0.5 rounded-md font-medium">
                      باقة: {user.plan === 'annual' ? 'بَث بلس سنوي' : user.plan === 'monthly' ? 'بَث بلس شهري' : 'بَث التجريبي'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate({ type: 'watchlist' })}
                  className="w-full px-4 py-2 text-sm text-[#E8F0EA] hover:bg-[#234536]/50 flex items-center justify-between text-right"
                >
                  <span>قائمة المشاهدة</span>
                  <span className="text-xs text-[#7F903E] font-bold">{watchlistCount}</span>
                </button>

                <button
                  onClick={() => onNavigate({ type: 'subscriptions' })}
                  className="w-full px-4 py-2 text-sm text-[#E8F0EA] hover:bg-[#234536]/50 flex items-center justify-between text-right"
                >
                  <span>ترقية الاشتراك</span>
                  <span className="text-[11px] text-[#7F903E]">الأسعار</span>
                </button>

                <button
                  onClick={() => onNavigate({ type: 'investors' })}
                  className="w-full px-4 py-2 text-sm text-[#7F903E] hover:bg-[#234536]/50 flex items-center gap-2 text-right"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ملف المستثمرين (Pitch Deck)</span>
                </button>

                <button
                  onClick={() => onNavigate({ type: 'admin' })}
                  className="w-full px-4 py-2 text-sm text-[#E8F0EA] hover:bg-[#234536]/50 flex items-center gap-2 text-right"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#A3BDBC]" />
                  <span>لوحة الإدارة والتحليلات</span>
                </button>

                <div className="border-t border-[#234536]/60 my-1"></div>

                <button
                  onClick={onOpenAuth}
                  className="w-full px-4 py-2 text-sm text-[#E8F0EA] hover:bg-[#234536]/50 flex items-center gap-2 text-right"
                >
                  <User className="w-3.5 h-3.5 text-[#A3BDBC]" />
                  <span>تبديل الحساب / تسجيل جديد</span>
                </button>

                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 flex items-center gap-2 text-right"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج (إعادة تعيين)</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#E8F0EA] hover:text-white hover:bg-[#234536]/40 rounded-lg"
            aria-label="القائمة الجانبية"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B2D33] border-b border-[#234536] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                link.action();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                isCurrentActive(link.id)
                  ? 'bg-[#234536] text-white font-bold'
                  : 'text-[#E8F0EA] hover:bg-[#234536]/30'
              }`}
            >
              <span>{link.label}</span>
              {link.icon && <link.icon className="w-4 h-4 opacity-70" />}
            </button>
          ))}

          <div className="pt-2 border-t border-[#234536]/60 space-y-2">
            <button
              onClick={() => {
                onNavigate({ type: 'investors' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2.5 rounded-lg text-sm font-bold bg-[#7F903E]/20 text-[#7F903E] border border-[#7F903E]/40 flex items-center justify-between"
            >
              <span>بَث للمستثمرين والحاضنات</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onNavigate({ type: 'admin' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-right px-4 py-2.5 rounded-lg text-sm text-[#A3BDBC] hover:bg-[#283D48]/40 flex items-center justify-between"
            >
              <span>لوحة الإدارة والمؤشرات</span>
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
