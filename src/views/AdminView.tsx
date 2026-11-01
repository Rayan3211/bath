import React, { useState } from 'react';
import { MediaItem, WaitlistEntry, CategoryKey, MediaType } from '../types';
import { StorageService } from '../utils/storage';
import { calculateKPIs } from '../utils/logic';
import { 
  BarChart3, 
  Users, 
  Film, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  RotateCcw, 
  Download, 
  ShieldAlert, 
  CheckCircle, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AdminViewProps {
  mediaItems: MediaItem[];
  onUpdateMediaItems: (items: MediaItem[]) => void;
  onResetData: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  mediaItems,
  onUpdateMediaItems,
  onResetData,
}) => {
  const [leads, setLeads] = useState<WaitlistEntry[]>(() => StorageService.getWaitlistLeads());
  const [maskContacts, setMaskContacts] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'leads'>('analytics');
  
  // New title modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  // Form states for adding/editing media
  const [formTitle, setFormTitle] = useState('');
  const [formEnTitle, setFormEnTitle] = useState('');
  const [formType, setFormType] = useState<MediaType>('series');
  const [formCategory, setFormCategory] = useState<CategoryKey>('comedy');
  const [formSynopsis, setFormSynopsis] = useState('');
  const [formYear, setFormYear] = useState(2026);
  const [formDuration, setFormDuration] = useState('8 حلقات');
  const [formRating, setFormRating] = useState('عام');
  const [formPoster, setFormPoster] = useState('');
  const [formBackdrop, setFormBackdrop] = useState('');
  const [formTags, setFormTags] = useState('سعودي, أصلي');

  const kpis = calculateKPIs(mediaItems, leads);

  // Category Arabic names mapping
  const categoryLabels: Record<string, string> = {
    comedy: 'كوميديا اجتماعية',
    talkshow: 'برامج وحوارات',
    drama: 'دراما وتشويق',
    documentary: 'وثائقيات',
    culture: 'ثقافة ومجتمع',
    shorts: 'محتوى قصير',
  };

  const handleTogglePublish = (id: string) => {
    const updated = mediaItems.map((item) =>
      item.id === id ? { ...item, published: !item.published } : item
    );
    onUpdateMediaItems(updated);
    StorageService.saveMediaItems(updated);
  };

  const handleDeleteItem = (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من حذف عمل «${title}» من المنصة؟`)) {
      const updated = mediaItems.filter((i) => i.id !== id);
      onUpdateMediaItems(updated);
      StorageService.saveMediaItems(updated);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormEnTitle('');
    setFormType('series');
    setFormCategory('comedy');
    setFormSynopsis('');
    setFormYear(2026);
    setFormDuration('8 حلقات');
    setFormRating('عام');
    setFormPoster('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80');
    setFormBackdrop('https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1920&q=80');
    setFormTags('سعودي, جديد');
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormEnTitle(item.englishTitle || '');
    setFormType(item.type);
    setFormCategory(item.category);
    setFormSynopsis(item.synopsis);
    setFormYear(item.releaseYear);
    setFormDuration(item.durationOrEpisodes);
    setFormRating(item.rating);
    setFormPoster(item.posterUrl);
    setFormBackdrop(item.backdropUrl);
    setFormTags(item.tags.join(', '));
    setIsAddModalOpen(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingItem) {
      const updated = mediaItems.map((i) =>
        i.id === editingItem.id
          ? {
              ...i,
              title: formTitle.trim(),
              englishTitle: formEnTitle.trim() || undefined,
              type: formType,
              category: formCategory,
              categoryLabel: categoryLabels[formCategory] || 'منوع',
              synopsis: formSynopsis.trim(),
              releaseYear: formYear,
              durationOrEpisodes: formDuration.trim(),
              rating: formRating,
              posterUrl: formPoster,
              backdropUrl: formBackdrop,
              tags: tagsArray,
            }
          : i
      );
      onUpdateMediaItems(updated);
      StorageService.saveMediaItems(updated);
    } else {
      const newItem: MediaItem = {
        id: `bath-${Date.now()}`,
        title: formTitle.trim(),
        englishTitle: formEnTitle.trim() || undefined,
        type: formType,
        category: formCategory,
        categoryLabel: categoryLabels[formCategory] || 'منوع',
        synopsis: formSynopsis.trim(),
        detailedDescription: formSynopsis.trim(),
        backdropUrl: formBackdrop || 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1920&q=80',
        posterUrl: formPoster || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
        rating: formRating,
        releaseYear: formYear,
        durationOrEpisodes: formDuration.trim(),
        isFeatured: false,
        isTrending: true,
        isExclusive: true,
        tags: tagsArray,
        episodes: [],
        sampleVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        published: true,
        viewsCount: 100,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...mediaItems];
      onUpdateMediaItems(updated);
      StorageService.saveMediaItems(updated);
    }

    setIsAddModalOpen(false);
  };

  const maskContactString = (str: string) => {
    if (!maskContacts) return str;
    if (str.includes('@')) {
      const [user, domain] = str.split('@');
      return `${user.substring(0, 2)}***@${domain}`;
    }
    // Phone
    return str.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
  };

  const exportLeadsData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bath_waitlist_leads_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#234536]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#283D48] text-[#7F903E] flex items-center justify-center border border-[#7F903E]/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              لوحة الإدارة والمؤشرات التحليلية
            </h1>
            <p className="text-xs sm:text-sm text-[#A3BDBC]">
              متابعة نمو الـ MVP، إدارة محتوى بَث، وبيانات المسجلين في قائمة الاهتمام
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#0B2D33] p-1 rounded-2xl border border-[#234536]">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#234536] text-white shadow-sm'
                : 'text-[#A3BDBC] hover:text-white'
            }`}
          >
            المؤشرات والتحليلات
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'content'
                ? 'bg-[#234536] text-white shadow-sm'
                : 'text-[#A3BDBC] hover:text-white'
            }`}
          >
            إدارة المحتوى ({mediaItems.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'leads'
                ? 'bg-[#234536] text-white shadow-sm'
                : 'text-[#A3BDBC] hover:text-white'
            }`}
          >
            المسجلون بالاهتمام ({leads.length})
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0B2D33] border border-[#234536] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#A3BDBC] mb-2">
            <span>المسجلون في الاهتمام</span>
            <Users className="w-4 h-4 text-[#7F903E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {kpis.totalLeads}
          </div>
          <p className="text-[11px] text-[#7F903E] mt-1 font-semibold">
            قاعدة مستخدمين متحمسين للإطلاق
          </p>
        </div>

        <div className="bg-[#0B2D33] border border-[#234536] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#A3BDBC] mb-2">
            <span>معدل التحويل التقديري</span>
            <TrendingUp className="w-4 h-4 text-[#7F903E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {kpis.conversionRate}
          </div>
          <p className="text-[11px] text-[#A3BDBC] mt-1">
            بين زوار النسخة والمسجلين
          </p>
        </div>

        <div className="bg-[#0B2D33] border border-[#234536] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#A3BDBC] mb-2">
            <span>إجمالي الأعمال المنشورة</span>
            <Film className="w-4 h-4 text-[#7F903E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {kpis.publishedCount} <span className="text-xs font-normal text-[#A3BDBC]">/ {kpis.totalItems}</span>
          </div>
          <p className="text-[11px] text-[#A3BDBC] mt-1">
            أعمال مصنفة وجاهزة للتجربة
          </p>
        </div>

        <div className="bg-[#0B2D33] border border-[#234536] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#A3BDBC] mb-2">
            <span>إجمالي المشاهدات</span>
            <BarChart3 className="w-4 h-4 text-[#7F903E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {kpis.totalViews.toLocaleString('ar-SA')}
          </div>
          <p className="text-[11px] text-[#A3BDBC] mt-1">
            مشاهدات تراكمية للأعمال
          </p>
        </div>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Preferences Chart */}
            <div className="bg-[#0B2D33] border border-[#234536] p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white font-heading">
                أكثر التصنيفات طلباً حسب رغبات المسجلين
              </h3>
              <div className="space-y-3">
                {Object.entries(kpis.categoryTally).map(([key, count]) => {
                  const percentage = kpis.totalLeads > 0 ? Math.round((count / kpis.totalLeads) * 100) : 0;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#E8F0EA] font-semibold">{categoryLabels[key] || key}</span>
                        <span className="text-[#7F903E] font-bold">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#052329] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#7F903E] rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, percentage)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan Willingness Chart */}
            <div className="bg-[#0B2D33] border border-[#234536] p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white font-heading">
                توزيع الرغبة في الاشتراك والدفع (Willingness to Pay)
              </h3>
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#052329] border border-[#234536] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white font-bold block">باقة بَث بلس الشهرية (19.99 ر.س)</span>
                    <span className="text-[11px] text-[#A3BDBC]">الأكثر اختياراً بين المستطلعين</span>
                  </div>
                  <span className="text-base font-black text-[#7F903E]">{kpis.planTally.monthly} طلب</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#052329] border border-[#234536] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white font-bold block">باقة بَث السنوية (199 ر.س)</span>
                    <span className="text-[11px] text-[#A3BDBC]">المشتركون المؤسسون والأعلى ولاءً</span>
                  </div>
                  <span className="text-base font-black text-[#7F903E]">{kpis.planTally.annual} طلب</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#052329] border border-[#234536] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white font-bold block">الباقة المجانية والاهتمام العام</span>
                    <span className="text-[11px] text-[#A3BDBC]">الجمهور المهتم بالمشاهدة المبدئية</span>
                  </div>
                  <span className="text-base font-black text-[#A3BDBC]">{kpis.planTally.free + kpis.planTally.general} طلب</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: CONTENT CMS */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading">
              قائمة الأعمال والمسلسلات في المنصة
            </h3>
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عمل جديد</span>
            </button>
          </div>

          <div className="bg-[#0B2D33] border border-[#234536] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#052329] border-b border-[#234536] text-[#A3BDBC]">
                    <th className="py-3 px-4">العمل</th>
                    <th className="py-3 px-4">النوع / التصنيف</th>
                    <th className="py-3 px-4">المدة / الحلقات</th>
                    <th className="py-3 px-4">المشاهدات</th>
                    <th className="py-3 px-4">حالة النشر</th>
                    <th className="py-3 px-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#234536]/40 text-[#E8F0EA]">
                  {mediaItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#123940]/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            className="w-10 h-14 object-cover rounded-lg shrink-0 bg-black"
                          />
                          <div>
                            <span className="font-bold text-white block">{item.title}</span>
                            <span className="text-[11px] text-[#A3BDBC]">{item.englishTitle || item.releaseYear}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-[#052329] px-2.5 py-1 rounded-md border border-[#234536]">
                          {item.categoryLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#A3BDBC]">{item.durationOrEpisodes}</td>
                      <td className="py-3 px-4 font-mono">{item.viewsCount?.toLocaleString('ar-SA')}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePublish(item.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                            item.published
                              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800'
                              : 'bg-red-950/50 text-red-300 border-red-800'
                          }`}
                        >
                          {item.published ? 'منشور' : 'مسودة'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-[#A3BDBC] hover:text-white rounded-lg hover:bg-white/5"
                            title="تعديل العمل"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id, item.title)}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/40"
                            title="حذف العمل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WAITLIST LEADS */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                قائمة المهتمين بالإطلاق التجريبي ({leads.length})
              </h3>
              <p className="text-xs text-[#A3BDBC]">
                بيانات حقيقية مسجلة في النموذج الأولي لاختبار الطلب
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMaskContacts(!maskContacts)}
                className="px-3 py-1.5 rounded-lg border border-[#234536] text-xs text-[#E8F0EA] hover:bg-[#234536]/40 flex items-center gap-1.5 transition-colors"
              >
                {maskContacts ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{maskContacts ? 'إظهار بيانات التواصل' : 'إخفاء بيانات التواصل'}</span>
              </button>

              <button
                onClick={exportLeadsData}
                className="px-3 py-1.5 rounded-lg bg-[#283D48] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#283D48]/80 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير البيانات (JSON)</span>
              </button>
            </div>
          </div>

          <div className="bg-[#0B2D33] border border-[#234536] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#052329] border-b border-[#234536] text-[#A3BDBC]">
                    <th className="py-3 px-4">الاسم</th>
                    <th className="py-3 px-4">وسيلة التواصل</th>
                    <th className="py-3 px-4">التصنيفات المفضلة</th>
                    <th className="py-3 px-4">الخطة المفضلة</th>
                    <th className="py-3 px-4">الملاحظات والتطلعات</th>
                    <th className="py-3 px-4">تاريخ التسجيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#234536]/40 text-[#E8F0EA]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#123940]/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">
                        {lead.fullName || 'فاعل خير (بدون اسم)'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#7F903E]">
                        {maskContactString(lead.contact)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {lead.preferredCategories.map((c) => (
                            <span
                              key={c}
                              className="text-[10px] bg-[#052329] px-2 py-0.5 rounded border border-[#234536]"
                            >
                              {categoryLabels[c] || c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#A3BDBC]">
                        {lead.sourcePlan || 'عام'}
                      </td>
                      <td className="py-3 px-4 text-[#A3BDBC] max-w-xs truncate" title={lead.expectations}>
                        {lead.expectations || '—'}
                      </td>
                      <td className="py-3 px-4 text-[#A3BDBC]/70 text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('ar-SA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Demo Reset Button */}
      <div className="pt-6 border-t border-[#234536]/40 flex items-center justify-between text-xs text-[#A3BDBC]">
        <span>إعادة تعيين بيانات الـ MVP للوضع الافتراضي عند الحاجة:</span>
        <button
          onClick={() => {
            if (confirm('هل ترغب في إعادة تعيين كافة البيانات والأعمال إلى حالتها الأولية؟')) {
              onResetData();
              setLeads(StorageService.getWaitlistLeads());
            }
          }}
          className="px-4 py-2 rounded-xl bg-red-950/40 text-red-300 border border-red-900/60 hover:bg-red-900/40 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط البيانات التجريبية</span>
        </button>
      </div>

      {/* Add / Edit Title Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B2D33] border border-[#234536] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">
              {editingItem ? 'تعديل بيانات العمل' : 'إضافة عمل جديد إلى بَث'}
            </h3>

            <form onSubmit={handleSaveMedia} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#E8F0EA] mb-1 font-semibold">عنوان العمل (بالعربية)</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F903E]"
                />
              </div>

              <div>
                <label className="block text-[#E8F0EA] mb-1 font-semibold">العنوان بالإنجليزي (اختياري)</label>
                <input
                  type="text"
                  value={formEnTitle}
                  onChange={(e) => setFormEnTitle(e.target.value)}
                  className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F903E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#E8F0EA] mb-1 font-semibold">نوع العمل</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="series">مسلسل</option>
                    <option value="show">برنامج / حوار</option>
                    <option value="short">محتوى قصير</option>
                    <option value="movie">فيلم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#E8F0EA] mb-1 font-semibold">التصنيف</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="comedy">كوميديا اجتماعية</option>
                    <option value="talkshow">برامج وحوارات</option>
                    <option value="drama">دراما وتشويق</option>
                    <option value="documentary">وثائقيات</option>
                    <option value="culture">ثقافة ومجتمع</option>
                    <option value="shorts">محتوى قصير</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#E8F0EA] mb-1 font-semibold">الوصف المختصر (Synopsis)</label>
                <textarea
                  rows={2}
                  required
                  value={formSynopsis}
                  onChange={(e) => setFormSynopsis(e.target.value)}
                  className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7F903E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#E8F0EA] mb-1 font-semibold">سنة الإنتاج</label>
                  <input
                    type="number"
                    value={formYear}
                    onChange={(e) => setFormYear(Number(e.target.value))}
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#E8F0EA] mb-1 font-semibold">المدة / الحلقات</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#E8F0EA] mb-1 font-semibold">التصنيف العمري</label>
                  <input
                    type="text"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-[#052329] border border-[#234536] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 text-[#A3BDBC]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#7F903E] text-white font-bold"
                >
                  حفظ العمل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminView;
