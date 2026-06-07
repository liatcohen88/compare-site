import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: `תנאי השימוש של ${SITE_NAME}`,
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">תנאי שימוש</h1>
      <p className="text-sm text-slate-500">עדכון אחרון: 7 ביוני 2026</p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">1. הסכמה לתנאים</h2>
      <p className="text-slate-700 leading-relaxed">
        השימוש באתר {SITE_NAME} (להלן "האתר") מהווה הסכמה לתנאי שימוש אלה.
        אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באתר.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">2. אופי השירות</h2>
      <p className="text-slate-700 leading-relaxed">
        האתר מספק שירות השוואת מחירים בין חנויות מקוונות שונות.
        אנחנו <strong>לא</strong> מוכרים מוצרים, ואיננו צד בעסקה בין הלקוח לחנות.
        כל רכישה מתבצעת ישירות בחנות שאליה תועברו, וכפופה לתנאי השימוש ולמדיניות של אותה חנות.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">3. דיוק המחירים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו עושים מאמצים סבירים לעדכן את המחירים מדי יום ולשמור על דיוקם.
        עם זאת:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>מחירים יכולים להשתנות בכל רגע ללא הודעה מוקדמת מצד החנויות</li>
        <li>זמינות מוצרים, מבצעים והנחות עלולים להשתנות</li>
        <li>תוספות כמו מכס, מע"מ, דמי טיפול ועמלות עסקה לא תמיד נכללות בחישוב המוצג</li>
        <li>המחיר הסופי הוא המחיר המוצג בעמוד התשלום בחנות עצמה</li>
      </ul>
      <p className="text-slate-700 leading-relaxed mt-2">
        מומלץ לוודא את המחיר הסופי באתר החנות לפני ביצוע הרכישה.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">4. אחריות</h2>
      <p className="text-slate-700 leading-relaxed">
        השירות ניתן "כפי שהוא" (AS-IS). אנחנו לא אחראים על:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>איכות המוצר, עמידותו או התאמתו לצרכים שלכם</li>
        <li>זמני אספקה, נזקים בהובלה או בעיות במשלוח</li>
        <li>החזרת מוצרים, ביטולים או החלפות</li>
        <li>תקלות באתרי החנויות אליהן אנו מפנים</li>
        <li>נזקים עקיפים או תוצאתיים מהשימוש בשירות</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">5. קישורי שותפים</h2>
      <p className="text-slate-700 leading-relaxed">
        רוב הקישורים החיצוניים באתר הם קישורי שותפים (affiliate links).
        ראו <a href="/affiliate-disclosure" className="text-blue-600 hover:underline">גילוי שותפים</a> לפרטים.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">6. שימוש מותר</h2>
      <p className="text-slate-700 leading-relaxed">
        מותר להשתמש באתר לשימוש אישי בלבד. אסור:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>לסקרייפ את הנתונים באופן אוטומטי</li>
        <li>להעתיק או להפיץ את התוכן ללא רשות</li>
        <li>לפגוע בפעולת האתר או באבטחתו</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">7. שינויים בתנאים</h2>
      <p className="text-slate-700 leading-relaxed">
        אנו רשאים לעדכן את תנאי השימוש מעת לעת. המשך השימוש באתר לאחר עדכון מהווה הסכמה לתנאים החדשים.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">8. דין ושיפוט</h2>
      <p className="text-slate-700 leading-relaxed">
        על תנאי שימוש אלה יחול הדין הישראלי בלבד, וסמכות השיפוט הבלעדית נתונה לבתי המשפט בתל אביב-יפו.
      </p>
    </article>
  );
}
