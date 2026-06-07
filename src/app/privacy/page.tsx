import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: `מדיניות הפרטיות של ${SITE_NAME}`,
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">מדיניות פרטיות</h1>
      <p className="text-sm text-slate-500">עדכון אחרון: 7 ביוני 2026</p>

      <p className="text-slate-700 leading-relaxed mt-6">
        אנו ב-{SITE_NAME} מכבדים את פרטיותכם. מסמך זה מסביר אילו נתונים אנו אוספים, מדוע, וכיצד אנו מגנים עליהם.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">1. מידע שאנו אוספים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו לא דורשים מהמשתמשים שלנו להירשם או למסור פרטים אישיים.
        עם זאת, כמו רוב האתרים, אנו אוספים נתונים סטטיסטיים בסיסיים על השימוש באתר באמצעות כלי אנליטיקס סטנדרטיים (כגון Google Analytics):
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>סוג הדפדפן ומערכת ההפעלה</li>
        <li>אזור גיאוגרפי כללי (מדינה/אזור)</li>
        <li>דפים בהם ביקרתם והקישורים בהם לחצתם</li>
        <li>זמן השהייה בכל עמוד</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">2. עוגיות (Cookies)</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו משתמשים בעוגיות לשני סוגי שימושים:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li><strong>אנליטיקס:</strong> כדי להבין כיצד משתמשים באתר ולשפר אותו.</li>
        <li><strong>אפיליאט tracking:</strong> כדי לזהות שביקרתם דרכנו ולקבל קרדיט על הפניות לחנויות שותפות.</li>
      </ul>
      <p className="text-slate-700 leading-relaxed mt-2">
        ניתן להשבית עוגיות דרך הגדרות הדפדפן. השבתה עלולה לפגוע בחוויית הגלישה.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">3. שיתוף עם צדדים שלישיים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו לא מוכרים ולא משכירים את הנתונים שלכם. השירותים שאיתם אנו עובדים:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>Google Analytics - אנליטיקה אנונימית</li>
        <li>Google AdSense - הצגת פרסומות רלוונטיות</li>
        <li>חנויות אפיליאט (KSP, Amazon, AliExpress, Shein) - מקבלים מידע על קליק להפניית הקנייה</li>
        <li>שירותי אירוח (Vercel) - שירת האתר</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">4. זכויותיכם</h2>
      <p className="text-slate-700 leading-relaxed">
        מאחר ואיננו אוספים פרטים מזהים, אין לנו מאגר נתונים אישיים שלכם לעדכן או למחוק.
        אם יש לכם שאלות לגבי השימוש בנתונים, צרו קשר דרך עמוד <a href="/contact" className="text-blue-600 hover:underline">צור קשר</a>.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">5. אבטחת מידע</h2>
      <p className="text-slate-700 leading-relaxed">
        האתר משתמש בהצפנת SSL (HTTPS) לכל התעבורה. אנו פועלים בהתאם לחקיקה הישראלית לרבות חוק הגנת הפרטיות.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">6. שינויים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו עשויים לעדכן מדיניות זו מעת לעת. עדכונים מהותיים יפורסמו בעמוד זה עם ציון תאריך העדכון.
      </p>
    </article>
  );
}
