# منصة بَث | BATH
### نموذج أولي تجريبي (MVP) لمنصة بث وترفيه رقمية سعودية للمحتوى الأصلي والقصص المحلية

> **الشعار اللفظي:** «قصص تستحق المشاهدة»  
> **الهوية البصرية:** مصممة بالكامل وفق دليل الهوية البصرية الرسمي لـ بَث (تصميم: ريان بن عبدالله جابر الفيفي)  

---

## 1. نبذة عن المشروع والرؤية
تُعد «بَث | BATH» نموذج عمل إعلامي وترفيهي هجين يجمع بين ثلاثة عناصر متكاملة:
1. **استوديو لصناعة الملكية الفكرية (IP Studio):** كتابة وتطوير قصص سعودية أصلية قابلة للتحول إلى أصول طويلة الأمد.
2. **علامة إعلامية حية (Media Brand):** بناء مجتمع رقمي وثيق عبر برامج حوارية غير مكررة مثل «خارج النص» واسكتشات سريعة.
3. **منصة رقمية مرنة (Streaming Platform):** توزيع رقمي يبدأ بنموذج الـ MVP لاختبار طلب الجمهور، ويتوسع تدريجياً إلى الاشتراكات المدفوعة (SVOD) والبث الرقمي المباشر (FAST Channels).

---

## 2. الهوية البصرية المعتمدة (Design System)
تم استخراج وتطبيق كافة عناصر الهوية بدقة متناهية من دليل الهوية البصرية المرفق:
- **الشعار الرسمي (Logo):** كتلة هندسية تجريدية تختزل أحرف الكلمة العربية «بث» (العارضة المستقيمة كخط أساس، والقوس المنحني `^` يمثل نقاط الثاء، والنقطة الدائرية `•` تمثل نقطة الباء).
- **الألوان الأساسية والثانوية المعتمدة:**
  - الأخضر الداكن الأساسي: `#234536`
  - الكحلي البترولي الأساسي: `#283D48`
  - عمق الفضاء الليلي (الخلفية الداكنة): `#052329`
  - الزيتوني الذهبي المميز (Accent): `#7F903E`
  - العنابي الخريفي (Accent): `#4C353F`
- **الخطوط المعتمدة:**
  - الخط الأساسي: **Tajawal** (عناوين، نصوص، تفاصيل)
  - الخط الثانوي: **El Messiri** (العناوين السينمائية وشعارات الأعمال)

---

## 3. الوظائف المنفذة في هذا النموذج (MVP Feature Matrix)

| الوظيفة | الحالة في النموذج الأولي (MVP) | الملاحظات التقنية |
|---|---|---|
| **الهوية والتصميم البصري** | ✅ منفذة بالكامل | شعار SVG مخصص بدقة، وألوان الهوية ونظام RTL كامل |
| **الصفحة الرئيسية (Home)** | ✅ منفذة بالكامل | قسم Hero سينمائي، شرائح مختارات، صفوف محتوى حسب التصنيف |
| **استكشاف المحتوى (Explore)** | ✅ منفذة بالكامل | بحث لحظي بالعنوان والكلمات، فلترة بالتصنيف والنوع، وترتيب بالأكثر مشاهدة |
| **تفاصيل العمل (Details)** | ✅ منفذة بالكامل | غلاف العمل، القصة، البطاقة الإنتاجية، قائمة الحلقات القابلة للتشغيل |
| **مشغل الفيديو (Video Player)** | ✅ منفذة بالكامل | مشغل HTML5 متكامل، تحكم بالصوت، شريط تقدم، قائمة حلقات جانبية، تراجع وتقديم |
| **قائمة المشاهدة (Watchlist)** | ✅ منفذة بالكامل | حفظ فوري للأعمال محلياً في `localStorage` مع عداد حي |
| **تسجيل الاهتمام (Waitlist)** | ✅ منفذة بالكامل | نموذج التحقق من الطلب، منع التكرار، فحص البريد/الجوال، وإحصائيات فورية |
| **باقات الاشتراك (Pricing)** | ✅ منفذة بالكامل | عرض فرضيات التسعير (مجاني، شهري 19.99 ر.س، سنوي 199 ر.س) واختبار استعداد الدفع |
| **لوحة الإدارة (Admin CMS)** | ✅ منفذة بالكامل | مؤشرات KPI، إدارة الأعمال (إضافة، تعديل، حذف، تبديل النشر)، وجدول المهتمين |
| **ملف المستثمرين (Pitch Deck)** | ✅ منفذة بالكامل | المشكلة والفرصة، نموذج الإيرادات الستة، وخريطة الطريق للمراحل الأربع |

---

## 4. مخطط قاعدة البيانات المقترح للإنتاج (Database Schema)
عند ربط قاعدة بيانات سحابية (Supabase / PostgreSQL أو Cloud SQL)، تم تجهيز البنية كالتالي:

```sql
-- 1. جدول الأعمال (media_items)
CREATE TABLE media_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    english_title VARCHAR(255),
    type VARCHAR(50) NOT NULL, -- series, show, movie, short
    category VARCHAR(50) NOT NULL, -- comedy, talkshow, drama, documentary, culture, shorts
    synopsis TEXT NOT NULL,
    detailed_description TEXT,
    backdrop_url TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    rating VARCHAR(20) DEFAULT 'عام',
    release_year INT NOT NULL,
    duration_or_episodes VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_exclusive BOOLEAN DEFAULT TRUE,
    tags TEXT[],
    creator VARCHAR(255),
    sample_video_url TEXT,
    published BOOLEAN DEFAULT TRUE,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. جدول الحلقات (episodes)
CREATE TABLE episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    episode_number INT NOT NULL,
    season_number INT DEFAULT 1,
    duration VARCHAR(50) NOT NULL,
    synopsis TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. جدول المهتمين بالإطلاق (waitlist_leads)
CREATE TABLE waitlist_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255),
    contact VARCHAR(255) UNIQUE NOT NULL,
    contact_type VARCHAR(20) NOT NULL, -- email or phone
    preferred_categories TEXT[],
    expectations TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    source_plan VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. جدول قوائم المشاهدة للمستخدمين (user_watchlists)
CREATE TABLE user_watchlists (
    user_id UUID NOT NULL,
    media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, media_id)
);
```

---

## 5. التشغيل المحلي (Getting Started)

### المتطلبات المسبقة:
- Node.js (v18+)
- npm أو pnpm

### خطوات التثبيت والتشغيل:
```bash
# تثبيت الاعتماديات
npm install

# تشغيل بيئة التطوير
npm run dev

# تشغيل اختبارات المنطق والحسابات
npx --yes tsx --test src/utils/logic.test.ts

# بناء نسخة الإنتاج
npm run build
```

---

## 6. المتغيرات البيئية (.env.example)
```env
# رابط التطبيق
APP_URL="http://localhost:3000"

# مفتاح واجهة الذكاء الاصطناعي (عند تفعيل التوصيات الذكية)
GEMINI_API_KEY=""

# إعدادات قاعدة البيانات المستقبلية (Supabase / Cloud SQL)
# DATABASE_URL=""
# SUPABASE_ANON_KEY=""
```

---

## 7. إرشادات تقديم العرض أمام لجان الحاضنات والمستثمرين
1. **الافتتاح بالهوية والرؤية:** ابدأ بشرح أن «بَث» ليست تطبيق تقني فحسب، بل استوديو ملكية فكرية سعودي يستثمر في القصة أولاً.
2. **استعراض تجربة الاستكشاف:** أظهر سهولة تصفح الحلقات ومشاهدة الفيديو في المشغل التفاعلي.
3. **التركيز على إثبات الطلب:** افتح قسم «كن من أوائل المنضمين إلى بَث» واشرح كيف تضمن المنصة وجود جمهور منتظر قبل بدء إنتاج المواسم الكاملة.
4. **شرح مؤشرات لوحة الإدارة:** استعرض صفحة الإدارة لإبراز تحليل رغبات الجمهور (التصنيفات المفضلة ومعدل التحويل).
5. **الختام بملف المستثمرين (Pitch):** استعرض صفحة «بَث للمستثمرين» لتوضيح تنوع مصادر الإيرادات الستة وخريطة الطريق حتى جولة التمويل (Series A).
