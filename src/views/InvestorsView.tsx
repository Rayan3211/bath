import React from 'react';
import { ViewState } from '../types';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Layers, 
  DollarSign, 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Mail,
  ShieldCheck,
  Award
} from 'lucide-react';

interface InvestorsViewProps {
  onNavigate: (view: ViewState) => void;
}

export const InvestorsView: React.FC<InvestorsViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" dir="rtl">
      
      {/* Pitch Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7F903E] bg-[#234536]/40 border border-[#7F903E]/30 px-4 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-[#7F903E]" />
          <span>ملف العرض الاستثماري وحاضنات الأعمال (Pitch Deck)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight leading-tight">
          منصة بَث | BATH
          <span className="block text-xl sm:text-2xl text-[#7F903E] font-medium mt-2">
            استوديو رقمي لصناعة وتوزيع الملكية الفكرية السعودية
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#A3BDBC] leading-relaxed">
          هذا العرض التقديمي يوضح الفرضيات الاستثمارية، نموذج التحقق من الطلب، واستراتيجية التدرج التجاري قبل الالتزام بإنتاجات ضخمة أو شراء حقوق باهظة.
        </p>
      </div>

      {/* The 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0B2D33] border border-[#234536] p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#234536] text-[#7F903E] flex items-center justify-center font-bold text-lg border border-[#7F903E]/30">
            01
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            استوديو صناعة محتوى (IP Studio)
          </h3>
          <p className="text-xs sm:text-sm text-[#A3BDBC] leading-relaxed">
            التركيز على بناء أصول فكرية وقصص سعودية قابلة للتوسع إلى مواسم متعددة، كتب، فعاليات، ورخص تجارية.
          </p>
        </div>

        <div className="bg-[#0B2D33] border border-[#234536] p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#234536] text-[#7F903E] flex items-center justify-center font-bold text-lg border border-[#7F903E]/30">
            02
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            علامة إعلامية حية (Media Brand)
          </h3>
          <p className="text-xs sm:text-sm text-[#A3BDBC] leading-relaxed">
            بناء جمهور وفيّ عبر حوارات «خارج النص» والاسكتشات القصيرة، مما يخفض تكلفة اكتساب المشاهدين (CAC).
          </p>
        </div>

        <div className="bg-[#0B2D33] border border-[#234536] p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#234536] text-[#7F903E] flex items-center justify-center font-bold text-lg border border-[#7F903E]/30">
            03
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            منصة توزيع رقمية (Digital Platform)
          </h3>
          <p className="text-xs sm:text-sm text-[#A3BDBC] leading-relaxed">
            توزيع مرن يبدأ باشتراكات تجريبية ويتوسع نحو البث الرقمي المباشر وقنوات التوزيع مع ثبوت الطلب.
          </p>
        </div>
      </div>

      {/* Problem & Opportunity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0B2D33]/60 border border-[#234536] p-6 sm:p-10 rounded-3xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
            <Target className="w-5 h-5" />
            <span>المشكلة والفرصة في السوق</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">
            الفجوة بين حجم الإنفاق وعطش القصص المحلية
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#A3BDBC] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
              <span><strong>المنصات العالمية:</strong> تركز على إنتاجات مكلفة ومحدودة سنوياً ولا تلامس نبض الحياة اليومية أو تفاصيل المدن والمحافظات السعودية.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
              <span><strong>المحتوى القصير العشوائي:</strong> يعاني من التشتت وغياب الهوية الاحترافية واستحالة تحويله لملكية فكرية دائمة.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
              <span><strong>نمو السوق السعودي:</strong> مستهدفات قطاع الترفيه والإعلام ضمن رؤية 2030 تفتح شهية الصناديق والرعاة للمحتوى الوطني عالي الإنتاج.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#7F903E] text-sm font-bold">
            <TrendingUp className="w-5 h-5" />
            <span>حل بَث الذكي والمستدام</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">
            الاختبار قبل الإنفاق والتدرج عبر البيانات
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#A3BDBC] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#7F903E] rounded-full mt-2 shrink-0"></span>
              <span><strong>الاختبار المصغر:</strong> إنتاج حلقات تجريبية (Pilots) ومقاطع سريعة لقياس تفاعل المشاهد قبل استثمار الملايين.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#7F903E] rounded-full mt-2 shrink-0"></span>
              <span><strong>حلقات إنتاج رشيقة:</strong> تمكين المواهب الشابة السعودية وفرق العمل المستقلة بتقنيات تصوير سينمائي بتكلفة مدروسة.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#7F903E] rounded-full mt-2 shrink-0"></span>
              <span><strong>تنويع المداخيل:</strong> عدم الاعتماد الوحيد على الاشتراكات، بل دمج الرعايات التجارية وتراخيص التوزيع.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 6 Diversified Revenue Streams */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7F903E] bg-[#234536]/40 px-3 py-1 rounded-full mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            <span>استدامة التدفقات النقدية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            نموذج الإيرادات الستة لمنصة بَث
          </h2>
          <p className="text-xs sm:text-sm text-[#A3BDBC] mt-1">
            مزيج استثماري يحمي المنصة من تقلبات الاشتراكات الفردية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '1. رعاية البرامج والحوارات',
              desc: 'شراكات استراتيجية مع البنوك، شركات التقنية، والعلامات الوطنية لرعاية مواسم برامج مثل «خارج النص» و«صناع الغد».',
              accent: '#234536',
            },
            {
              title: '2. الإعلانات الرقمية الموجهة',
              desc: 'إعلانات ذكية خفيفة مدمجة في الباقة المجانية والاسكتشات السريعة دون الإضرار بتجربة المشاهدة.',
              accent: '#283D48',
            },
            {
              title: '3. إنتاج المحتوى التوثيقي (B2B)',
              desc: 'تقديم خدمات الاستوديو والتوثيق السينمائي للشركات الكبرى والجهات الحكومية في مشاريع التحول والابتكار.',
              accent: '#7F903E',
            },
            {
              title: '4. ترخيص وتوزيع الأعمال',
              desc: 'بيع وتوزيع حقوق العرض على شركات الطيران وشبكات التوزيع الإقليمية والمنصات التلفزيونية العالمية.',
              accent: '#4C353F',
            },
            {
              title: '5. الاشتراكات المدفوعة (SVOD)',
              desc: 'باقات شهرية (19.99 ر.س) وسنوية (199 ر.س) توفر تجربة خالية من الإعلانات وجودة 4K ودعوات مسبقة.',
              accent: '#234536',
            },
            {
              title: '6. الفعاليات والعروض الحية',
              desc: 'تسجيل الحوارات أمام جمهور حي مدفوع، وعروض أولى للأفلام الوثائقية والمسلسلات في صالات السينما المستقلة.',
              accent: '#283D48',
            },
          ].map((stream, idx) => (
            <div
              key={idx}
              className="bg-[#0B2D33] border border-[#234536] p-5 rounded-2xl hover:border-[#7F903E] transition-colors text-right space-y-2"
            >
              <h4 className="text-sm font-bold text-white font-heading">{stream.title}</h4>
              <p className="text-xs text-[#A3BDBC] leading-relaxed">{stream.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Stage Roadmap */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7F903E] bg-[#234536]/40 px-3 py-1 rounded-full mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>خطة التوسع التدريجي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            خريطة الطريق التنفيذية (Roadmap)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              stage: 'المرحلة 1 (الحالية)',
              title: 'اختبار المحتوى والجمهور',
              duration: 'الأشهر 1 - 3',
              points: [
                'إطلاق الـ MVP التفاعلي',
                'حملة تسجيل الاهتمام (Waitlist)',
                'إنتاج 3 حلقات تجريبية مصغرة',
                'عرض المشروع على الحاضنات والمسرعات',
              ],
              active: true,
            },
            {
              stage: 'المرحلة 2',
              title: 'بناء المكتبة والشراكات',
              duration: 'الأشهر 4 - 8',
              points: [
                'إنتاج المواسم الأولى الكاملة',
                'توقيع أول رعاية تجارية للبرامج',
                'إطلاق تطبيق الهواتف (iOS / Android)',
                'تجاوز حاجز 50 ألف مستخدم مسجل',
              ],
              active: false,
            },
            {
              stage: 'المرحلة 3',
              title: 'العضوية المدفوعة والنمو',
              duration: 'الأشهر 9 - 14',
              points: [
                'تفعيل بوابات الدفع (مدى / Apple Pay)',
                'إطلاق الباقة السنوية والمزايا الحصرية',
                'شراكات توزيع مع منصات خارجية',
                'الوصول لنقطة التعادل التشغيلي (Breakeven)',
              ],
              active: false,
            },
            {
              stage: 'المرحلة 4',
              title: 'الإنتاج الكبرى والقنوات المباشرة',
              duration: 'الأشهر 15 - 24',
              points: [
                'إنتاج أول فيلم سينمائي طويل',
                'إطلاق قنوات بث رقمية مباشرة (FAST Channels)',
                'التوسع في التوزيع الخليجي والإقليمي',
                'جولة تمويل استثماري Series A',
              ],
              active: false,
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border text-right space-y-3 ${
                step.active
                  ? 'bg-[#123940] border-[#7F903E] shadow-lg'
                  : 'bg-[#0B2D33] border-[#234536]/80'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${step.active ? 'text-[#7F903E]' : 'text-[#A3BDBC]'}`}>
                  {step.stage}
                </span>
                <span className="text-[11px] text-[#A3BDBC]/70">{step.duration}</span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">{step.title}</h4>
              <ul className="space-y-1.5 text-xs text-[#A3BDBC]">
                {step.points.map((p, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#7F903E]"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Honest MVP Scope Verification Table */}
      <div className="bg-[#0B2D33] border border-[#234536] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#7F903E]" />
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              جدول الشفافية التقنية لنموذج الـ MVP
            </h3>
            <p className="text-xs text-[#A3BDBC]">
              تحديد دقيق لما تم تنفيذه فعلياً وما يتطلب استثماراً وتراخيص نظامية للانتقال للإنتاج
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[#234536] text-[#A3BDBC]">
                <th className="py-2.5 px-3">الوظيفة / المكون</th>
                <th className="py-2.5 px-3">الحالة في هذا الـ MVP</th>
                <th className="py-2.5 px-3">المتطلب للانتقال للإطلاق التجاري</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#234536]/40 text-[#E8F0EA]">
              <tr>
                <td className="py-3 px-3 font-semibold text-white">الهوية البصرية وتجربة المستخدم</td>
                <td className="py-3 px-3 text-[#7F903E] font-bold">منفذة بالكامل وفق الدليل المرفق</td>
                <td className="py-3 px-3 text-[#A3BDBC]">تسجيل العلامة التجارية لدى الهيئة السعودية للملكية الفكرية</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">مشغل الفيديو والتحكم التفاعلي</td>
                <td className="py-3 px-3 text-[#7F903E] font-bold">يعمل فعلياً مع فيديوهات مرخصة</td>
                <td className="py-3 px-3 text-[#A3BDBC]">تكامل شبكات التوصيل السحابي (CDN / HLS) وحماية DRM</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">نموذج تسجيل الاهتمام (Waitlist)</td>
                <td className="py-3 px-3 text-[#7F903E] font-bold">يعمل ومحمي ومحفوظ محلياً</td>
                <td className="py-3 px-3 text-[#A3BDBC]">الربط مع قاعدة بيانات سحابية (Supabase / Firebase) وتأكيد OTP</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">باقات الاشتراك والأسعار</td>
                <td className="py-3 px-3 text-amber-300 font-bold">فرضيات لاختبار الرغبة في الدفع</td>
                <td className="py-3 px-3 text-[#A3BDBC]">ربط بوابة دفع معتمدة (مدى، سداد، Apple Pay) وفوترة إلكترونية</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">لوحة الإدارة وإدارة المحتوى</td>
                <td className="py-3 px-3 text-[#7F903E] font-bold">لوحة تفاعلية تعمل محلياً</td>
                <td className="py-3 px-3 text-[#A3BDBC]">صلاحيات إدارة متعددة الأدوار (RBAC) وتشفير قواعد البيانات</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">التراخيص الإعلامية النظامية</td>
                <td className="py-3 px-3 text-amber-300 font-bold">غير مفعلة (نموذج أولي مغلق)</td>
                <td className="py-3 px-3 text-[#A3BDBC]">ترخيص منصات تقديم المحتوى المرئي والمسموع من الهيئة العامة لتنظيم الإعلام</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box for Incubator Evaluator */}
      <div className="text-center bg-gradient-to-r from-[#234536] via-[#123940] to-[#283D48] border border-[#7F903E]/50 rounded-3xl p-8 space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold text-white font-heading">
          جاهزون لمناقشة فرص الاحتضان والاستثمار
        </h3>
        <p className="text-sm text-[#E8F0EA] max-w-lg mx-auto leading-relaxed">
          يسر فريق «بَث» تقديم عرض تفصيلي ومشاركة خطة الميزانية التقديرية ونموذج التكلفة التشغيلية لكل دقيقة إنتاج.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="mailto:contact@bath.sa?subject=استفسار%20استثماري%20-%20منصة%20بث"
            className="px-6 py-3 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>التواصل المباشر مع المؤسسين</span>
          </a>
          <button
            onClick={() => onNavigate({ type: 'admin' })}
            className="px-6 py-3 rounded-full bg-[#052329] hover:bg-[#052329]/90 text-white font-bold text-sm border border-[#234536] transition-colors"
          >
            استعراض لوحة مؤشرات الـ MVP
          </button>
        </div>
      </div>

    </div>
  );
};

export default InvestorsView;
