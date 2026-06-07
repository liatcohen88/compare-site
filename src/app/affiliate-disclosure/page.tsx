import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "גילוי שותפים",
  description: `גילוי קישורי שותפים ב-${SITE_NAME}`,
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">גילוי שותפים</h1>

      <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-6 rounded-lg">
        <p className="text-slate-800 font-semibold mb-1">בקצרה:</p>
        <p className="text-slate-700">
          האתר הזה משתתף בתכניות שותפים. כשאתם רוכשים דרכנו - אנחנו מקבלים עמלה קטנה מהחנות, ללא תוספת עלות עבורכם.
          זה מאפשר לנו להמשיך לעדכן את האתר בחינם.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">מה זה Affiliate?</h2>
      <p className="text-slate-700 leading-relaxed">
        אפיליאט (שיווק שותפים) הוא מודל עסקי שבו אתר מפנה תנועה לחנות מקוונת, ומקבל אחוז קטן מכל מכירה שמגיעה דרכו.
        זהו מודל סטנדרטי שמשמש את רוב אתרי הסקירות וההשוואות בעולם.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">החנויות שאיתן אנחנו עובדים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנחנו משתתפים בתכניות השותפים הרשמיות של:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li><strong>KSP Express Promotion</strong> - תכנית האפיליאט הרשמית של KSP</li>
        <li><strong>Amazon Associates</strong> - תכנית האפיליאט של אמזון</li>
        <li><strong>AliExpress Affiliate</strong> - תכנית האפיליאט של אליאקספרס</li>
        <li><strong>Shein Affiliate</strong> - תכנית האפיליאט של שיין</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">איך זה עובד?</h2>
      <ol className="list-decimal list-inside text-slate-700 space-y-2 mt-2">
        <li>אתם נכנסים לאתר ומחפשים מוצר</li>
        <li>אנחנו מציגים השוואת מחירים בין כל החנויות</li>
        <li>כשאתם לוחצים "לחנות", אתם מועברים לחנות עם מזהה ייחודי שלנו (cookie)</li>
        <li>אם תרכשו בתוך 24-30 ימים, החנות נותנת לנו עמלה של 1-9% מהקנייה</li>
        <li>אתם משלמים בדיוק את אותו מחיר כמו שתשלמו בלי הקישור שלנו</li>
      </ol>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">אובייקטיביות</h2>
      <p className="text-slate-700 leading-relaxed">
        אנחנו מתחייבים:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>להציג תמיד את החנות הזולה ביותר בראש הרשימה</li>
        <li>לא להעדיף חנות אחת על פני אחרת על בסיס גובה העמלה</li>
        <li>לא להסתיר חנויות שלא נותנות לנו עמלה</li>
        <li>לסמן בבירור את כל הקישורים שמובילים לחנויות אפיליאט (תג <code>rel="nofollow sponsored"</code>)</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">חשוב לדעת</h2>
      <p className="text-slate-700 leading-relaxed">
        אנחנו לא חלק מהחנויות הללו. כל בקשה, בעיה, החזרה או תלונה לגבי מוצר שרכשתם - יש לפנות ישירות לחנות שבה רכשתם.
      </p>

      <p className="text-slate-700 leading-relaxed mt-3">
        גילוי זה ניתן בהתאם להנחיות ה-FTC (האיחוד הפדרלי האמריקאי לסחר) ולחקיקה הישראלית בתחום פרסום וצרכנות.
      </p>
    </article>
  );
}
