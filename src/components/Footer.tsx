import React from 'react';
import { BathLogo } from './BathLogo';
import { ViewState } from '../types';
import { Mail, Shield, FileText, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacyModal }) => {
  return (
    <footer className="w-full bg-[#03171B] border-t border-[#234536]/40 text-[#A3BDBC] mt-20 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BathLogo size="md" variant="white" showWordmark={true} showTagline={true} />
            <p className="text-sm leading-relaxed text-[#A3BDBC]/90 max-w-sm mt-3">
              «بَث | BATH» منصة سعودية للترفيه الرقمي والمحتوى الأصلي؛ تجمع بين استوديو لصناعة الملكية الفكرية، وعلامة إعلامية حيوية، ومنصة رقمية لتوزيع القصص المحلية المستحقة للمشاهدة.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#7F903E] bg-[#234536]/20 border border-[#234536]/50 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مبادرة إعلامية وترفيهية سعودية واعدة</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 font-heading">استكشف المحتوى</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'series' })}
                  className="hover:text-white transition-colors"
                >
                  المسلسلات القصيرة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'shows' })}
                  className="hover:text-white transition-colors"
                >
                  البرامج والحوارات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'explore', category: 'documentary' })}
                  className="hover:text-white transition-colors"
                >
                  الأفلام والوثائقيات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'shorts' })}
                  className="hover:text-white transition-colors"
                >
                  مقاطع «على السريع»
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Investors */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 font-heading">للمستثمرين والشركاء</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'investors' })}
                  className="text-[#7F903E] hover:underline font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ملف بَث للمستثمرين (Pitch)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'subscriptions' })}
                  className="hover:text-white transition-colors"
                >
                  فرضيات باقات الاشتراك
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'admin' })}
                  className="hover:text-white transition-colors"
                >
                  لوحة مؤشرات الـ MVP
                </button>
              </li>
              <li>
                <a
                  href="mailto:contact@bath.sa"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>شراكات الإنتاج والاستثمار</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 font-heading">الشفافية والنظام</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>سياسة الخصوصية وحماية البيانات</span>
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>الشروط والأحكام</span>
                </span>
              </li>
              <li>
                <span className="text-xs text-[#A3BDBC]/70 leading-normal block">
                  حقوق الملكية الفكرية والعلامة التجارية محفوظة لمنصة بَث © 2026.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Identity credit and MVP Transparency disclaimer */}
        <div className="pt-8 border-t border-[#234536]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="space-y-1 text-center md:text-right">
            <p className="text-[#E8F0EA]/90 font-medium">
              تم تطبيق الهوية البصرية الرسمية لـ (بث) - تصميم: <span className="text-white font-bold">ريان بن عبدالله جابر الفيفي</span>
            </p>
            <p className="text-[#A3BDBC]/70">
              نموذج أولي تفاعلي (MVP) مخصص لعرض الفرضيات واختبار اهتمام السوق وحاضنات الأعمال في المملكة.
            </p>
          </div>

          <div className="flex items-center gap-4 text-center md:text-left text-[#A3BDBC]/60">
            <span>الرياض، المملكة العربية السعودية</span>
            <span>•</span>
            <span>رؤية 2030 للترفيه الرقمي</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
