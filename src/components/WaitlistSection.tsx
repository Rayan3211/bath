import React, { useState } from 'react';
import { CategoryKey, WaitlistEntry } from '../types';
import { validateWaitlistLead } from '../utils/logic';
import { StorageService } from '../utils/storage';
import { 
  Sparkles, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

interface WaitlistSectionProps {
  onLeadAdded?: (lead: WaitlistEntry) => void;
  selectedPlanSource?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

const CATEGORY_OPTIONS: { key: CategoryKey; label: string }[] = [
  { key: 'comedy', label: 'كوميديا اجتماعية' },
  { key: 'talkshow', label: 'برامج وحوارات' },
  { key: 'drama', label: 'مسلسلات قصيرة وتشويق' },
  { key: 'documentary', label: 'وثائقيات سعودية' },
  { key: 'culture', label: 'ثقافة ومجتمع' },
  { key: 'shorts', label: 'مقاطع سريعة' },
];

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({
  onLeadAdded,
  selectedPlanSource,
  isModal = false,
  onCloseModal,
}) => {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([
    'comedy',
    'talkshow',
  ]);
  const [expectations, setExpectations] = useState('');
  const [consent, setConsent] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const toggleCategory = (cat: CategoryKey) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const existingLeads = StorageService.getWaitlistLeads();
    const validation = validateWaitlistLead(contact, consent, existingLeads);

    if (!validation.isValid) {
      setErrorMsg(validation.error || 'يرجى تصحيح البيانات المدخلة');
      return;
    }

    const newLead: WaitlistEntry = {
      id: `lead-${Date.now()}`,
      fullName: fullName.trim() || undefined,
      contact: validation.normalizedContact || contact.trim(),
      contactType: validation.contactType || 'email',
      preferredCategories: selectedCategories,
      expectations: expectations.trim() || undefined,
      consent: true,
      createdAt: new Date().toISOString(),
      sourcePlan: selectedPlanSource || 'تسجيل اهتمام عام',
    };

    StorageService.addWaitlistLead(newLead);
    if (onLeadAdded) onLeadAdded(newLead);

    // Generate random confirmation code for the user
    const code = `BATH-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFullName('');
    setContact('');
    setExpectations('');
    setConsent(false);
    setIsSuccess(false);
    if (onCloseModal) onCloseModal();
  };

  return (
    <section
      id="waitlist-section"
      className={`${
        isModal
          ? 'p-6 sm:p-8'
          : 'my-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
      }`}
      dir="rtl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2D33] via-[#052329] to-[#03171B] border border-[#234536] p-6 sm:p-10 shadow-2xl">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#7F903E]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#234536]/30 blur-3xl pointer-events-none" />

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-fade-in relative z-10">
            <div className="w-16 h-16 bg-[#234536] border border-[#7F903E] text-[#7F903E] rounded-full mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              أهلاً بك بين أوائل المنضمين إلى «بَث»!
            </h3>

            <p className="text-sm sm:text-base text-[#A3BDBC] max-w-lg mx-auto leading-relaxed">
              تم تسجيل اهتمامك بنجاح في قاعدة بيانات الإطلاق التجريبي. سنقوم بالتواصل معك مباشرة عبر ({contact}) فور فتح باب البث المسبق.
            </p>

            <div className="inline-block bg-[#052329] border border-[#234536] px-5 py-2.5 rounded-xl text-xs text-[#E8F0EA]">
              رقم التسجيل المؤكد: <span className="font-mono font-bold text-[#7F903E] mr-1">{confirmationCode}</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm transition-all"
              >
                متابعة تصفح المنصة
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 bg-[#234536]/50 text-[#7F903E] text-xs font-bold px-3 py-1 rounded-full border border-[#7F903E]/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>إثبات اهتمام السوق والتحقق الأولي</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                كن من أوائل المنضمين إلى بَث
              </h2>
              <p className="text-sm sm:text-base text-[#A3BDBC] mt-2 leading-relaxed">
                سجل اهتمامك اليوم لتصلك دعوات المشاهدة المسبقة للإنتاجات السعودية الأصلية، ولتساهم في توجيه نوعية المحتوى الذي ننتجه.
              </p>
              {selectedPlanSource && (
                <div className="mt-2 text-xs text-[#7F903E] font-semibold bg-[#7F903E]/10 py-1 px-3 rounded-lg inline-block">
                  الخيار المفضل المحدد: {selectedPlanSource}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full / First Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#E8F0EA] mb-1.5 text-right">
                    الاسم الأول (اختياري)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: عبدالله"
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#A3BDBC]/50 focus:outline-none focus:border-[#7F903E] transition-colors"
                  />
                </div>

                {/* Email or Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#E8F0EA] mb-1.5 text-right">
                    البريد الإلكتروني أو رقم الجوال <span className="text-[#7F903E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="name@example.com أو 05xxxxxxxx"
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#A3BDBC]/50 focus:outline-none focus:border-[#7F903E] transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Categories Multi-Select */}
              <div>
                <label className="block text-xs font-semibold text-[#E8F0EA] mb-2 text-right">
                  ما نوع المحتوى الذي تفضل مشاهدته في بَث؟ (اختر ما يناسبك)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.key);
                    return (
                      <button
                        type="button"
                        key={cat.key}
                        onClick={() => toggleCategory(cat.key)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#234536] text-white border-[#7F903E] shadow-sm'
                            : 'bg-[#052329] text-[#A3BDBC] border-[#234536]/80 hover:border-white/30'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expectations */}
              <div>
                <label className="block text-xs font-semibold text-[#E8F0EA] mb-1.5 text-right">
                  ما القصص أو البرامج التي تتمنى رؤيتها في المحتوى السعودي؟ (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                  placeholder="مثال: نتطلع لمسلسلات خيال علمي سعودية أو برامج حوارية صريحة في التقنية..."
                  className="w-full bg-[#052329] border border-[#234536] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#A3BDBC]/50 focus:outline-none focus:border-[#7F903E] transition-colors resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#234536] bg-[#052329] text-[#7F903E] accent-[#7F903E] focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="consent-checkbox"
                  className="text-xs text-[#A3BDBC] leading-relaxed cursor-pointer select-none"
                >
                  أوافق صراحة على{' '}
                  <span className="text-[#E8F0EA] underline">سياسة الخصوصية وحماية البيانات الشخصية</span>{' '}
                  والتواصل معي عبر البريد أو الهاتف لإشعاري بجديد إطلاق منصة بَث والعروض الحصرية.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#7F903E]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-1" />
                  <span>تأكيد تسجيل الاهتمام والانضمام</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A3BDBC]/70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7F903E]" />
                <span>بياناتك محمية ولن تتم مشاركتها أو استخدامها لأي أغراض إعلانية خارجية</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};

export default WaitlistSection;
