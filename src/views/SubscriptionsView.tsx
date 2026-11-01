import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { WaitlistSection } from '../components/WaitlistSection';
import { UserProfile, ViewState } from '../types';
import { StorageService } from '../utils/storage';
import { Check, Sparkles, Shield, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';

interface SubscriptionsViewProps {
  user: UserProfile;
  onUpdateUserPlan: (plan: 'free' | 'monthly' | 'annual') => void;
  onNavigate: (view: ViewState) => void;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  user,
  onUpdateUserPlan,
  onNavigate,
}) => {
  const [selectedPlanForWaitlist, setSelectedPlanForWaitlist] = useState<string | null>(null);
  const [showTestSuccessModal, setShowTestSuccessModal] = useState<string | null>(null);

  const handleSelectPlan = (planId: string, planName: string) => {
    // Prompt the waitlist lead generator to record payment willingness, or update session
    if (planId === 'free') {
      onUpdateUserPlan('free');
      setShowTestSuccessModal('تم تفعيل باقة بَث المجانية في جلستك التجريبية!');
    } else {
      setSelectedPlanForWaitlist(planName);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" dir="rtl">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7F903E] bg-[#234536]/40 border border-[#7F903E]/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>فرضيات نموذج الإيرادات والاشتراكات (Pricing Hypotheses)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading">
          اختر باقتك في «بَث» وشاهد قصصنا الأصلية
        </h1>
        <p className="text-sm sm:text-base text-[#A3BDBC] leading-relaxed">
          نقدم خيارات مرنة تبدأ من الوصول المجاني المدعوم بالإعلانات الخفيفة، وحتى الباقة السنوية الحصرية مع تجربة 4K ودعوات للعروض الأولى.
        </p>

        {/* Pricing Transparency Banner */}
        <div className="p-3.5 rounded-2xl bg-[#0B2D33] border border-amber-500/40 text-amber-200 text-xs flex items-center justify-center gap-2 max-w-xl mx-auto">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            تنبيه شفاف: هذه الأسعار هي فرضيات لاختبار مدى استعداد الجمهور للدفع قبل الإطلاق التجاري الرسمي، ولا يتم جمع أي بيانات بنكية حالياً.
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = user.plan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#123940] to-[#052329] border-2 border-[#7F903E] shadow-2xl shadow-[#7F903E]/10 -translate-y-2'
                  : 'bg-[#0B2D33] border border-[#234536]/80 hover:border-[#7F903E]/60'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md text-white ${
                      plan.isPopular ? 'bg-[#7F903E]' : 'bg-[#283D48]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div>
                <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                <p className="text-xs text-[#A3BDBC] mt-1.5 min-h-[36px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-[#234536]/60 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-semibold text-[#A3BDBC]">
                    {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-bold text-[#E8F0EA] block mb-2">
                    المزايا المشمولة:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E8F0EA]">
                      <Check className="w-4 h-4 text-[#7F903E] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleSelectPlan(plan.id, plan.name)}
                  className={`w-full py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-[#7F903E] hover:bg-[#8ea047] text-white shadow-lg shadow-[#7F903E]/20 hover:scale-[1.02]'
                      : 'bg-[#234536] hover:bg-[#2e5946] text-white'
                  }`}
                >
                  {isCurrent ? 'باقتك الحالية' : plan.ctaText}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Test Success Modal */}
      {showTestSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B2D33] border border-[#234536] rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <Check className="w-12 h-12 text-[#7F903E] mx-auto" />
            <h3 className="text-lg font-bold text-white font-heading">
              {showTestSuccessModal}
            </h3>
            <p className="text-xs text-[#A3BDBC]">
              تم تحديث حالة الحساب في الجلسة المحلية بنجاح.
            </p>
            <button
              onClick={() => setShowTestSuccessModal(null)}
              className="px-6 py-2 rounded-full bg-[#7F903E] text-white text-xs font-bold"
            >
              تم
            </button>
          </div>
        </div>
      )}

      {/* Modal for recording willingness to pay */}
      {selectedPlanForWaitlist && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#052329] border border-[#234536] rounded-3xl max-w-2xl w-full p-2 relative">
            <button
              onClick={() => setSelectedPlanForWaitlist(null)}
              className="absolute top-4 left-4 p-2 text-[#A3BDBC] hover:text-white z-20 text-xs"
            >
              ✕ إغلاق
            </button>
            <WaitlistSection
              isModal={true}
              selectedPlanSource={selectedPlanForWaitlist}
              onCloseModal={() => setSelectedPlanForWaitlist(null)}
            />
          </div>
        </div>
      )}

      {/* FAQ Accordion Summary */}
      <div className="max-w-3xl mx-auto bg-[#0B2D33]/60 border border-[#234536] rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#7F903E]" />
          <span>الأسئلة الشائعة حول نموذج الاشتراكات</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-[#A3BDBC]">
          <div className="border-b border-[#234536]/40 pb-3">
            <h4 className="font-bold text-white mb-1">هل يتم خصم أي مبالغ الآن؟</h4>
            <p className="leading-relaxed">
              لا، هذه النسخة مخصصة لقياس الرغبة في الاشتراك وحجم الطلب (Demand Validation). عند الإطلاق التجاري، سيتم ربط بوابات دفع سعودية معتمدة مثل (مدى، Apple Pay).
            </p>
          </div>

          <div className="border-b border-[#234536]/40 pb-3">
            <h4 className="font-bold text-white mb-1">هل يمكنني تجربة المنصة مجاناً؟</h4>
            <p className="leading-relaxed">
              نعم، يمكنك تصفح ومشاهدة المقاطع التجريبية والحلقات الأولى من كافة الأعمال فوراً دون أي رسوم.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-1">ما الميزة التي يحصل عليها المسجلون مبكراً؟</h4>
            <p className="leading-relaxed">
              سيحصل المسجلون في قائمة الاهتمام على خصم مؤسس 50% على اشتراكهم الأول بالإضافة إلى شهر مجاني عند الإطلاق الرسمي.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SubscriptionsView;
