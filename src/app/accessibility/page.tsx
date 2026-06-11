import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: `הצהרת נגישות של ${SITE_NAME} - אתר השוואת מחירים`,
};

export default function AccessibilityPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">הצהרת נגישות</h1>
      <p className="text-sm text-slate-500">עדכון אחרון: 9 ביוני 2026</p>

      <p className="text-slate-700 leading-relaxed mt-6">
        אתר Hashveli שואף לאפשר גישה נוחה ושוויונית לכל הגולשים, לרבות אנשים עם
        מוגבלות. אנו פועלים להנגיש את האתר ברוח חוק שוויון זכויות לאנשים עם
        מוגבלות, תשנ&quot;ח-1998 ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות
        נגישות לשירות), תשע&quot;ג-2013.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">רמת הנגישות באתר</h2>
      <p className="text-slate-700 leading-relaxed">
        האתר עומד ברמת תאימות AA לפי הנחיות הנגישות הבינלאומיות
        <strong> WCAG 2.1</strong> של ארגון W3C, ככל שניתן במסגרת הטכנולוגיה
        הנוכחית. אנו פועלים לשיפור הנגישות באופן מתמיד.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">תכונות הנגישות באתר</h2>
      <p className="text-slate-700 leading-relaxed">
        ניתן לפתוח את תפריט הנגישות באמצעות לחיצה על הסמל ♿ הנמצא בפינה
        השמאלית-תחתונה של המסך. דרכו ניתן:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-1 mt-2">
        <li>להגדיל את גודל הגופן באתר עד 160 אחוז</li>
        <li>להפעיל מצב ניגודיות גבוהה לעיוורי צבעים ולקויי ראייה</li>
        <li>להפחית או להפסיק אנימציות לסובלים מתחושות סחרחורת</li>
        <li>להבליט קישורים בקו תחתון להתמצאות קלה</li>
        <li>להחליף את הגופן לגופן ידידותי לדיסלקסיה</li>
        <li>לאפס את ההגדרות לברירת המחדל</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">התאמות נוספות באתר</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-1">
        <li>ניווט באמצעות מקלדת בלבד (Tab, Shift+Tab, Enter, Esc)</li>
        <li>תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)</li>
        <li>טקסט חלופי לכל התמונות באתר</li>
        <li>סדר ניווט הגיוני לאורך כל העמודים</li>
        <li>כותרות היררכיות במבנה נכון (H1, H2, H3)</li>
        <li>תוויות (labels) לכל שדות הטפסים</li>
        <li>תמיכה מלאה בעברית וב-RTL</li>
        <li>ניגודיות צבעים תקנית לפי WCAG AA</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">מגבלות נגישות</h2>
      <p className="text-slate-700 leading-relaxed">
        על אף מאמצינו, ייתכן ויימצאו באתר חלקים שטרם הונגשו במלואם. אנו ממשיכים
        לפעול לשיפור הנגישות ונשמח לקבל ממך משוב בנושא.
      </p>
      <p className="text-slate-700 leading-relaxed">
        בנוסף, האתר מציג תוכן ומחירים מאתרים חיצוניים (KSP, Amazon, AliExpress
        ועוד). הנגישות של אותם אתרים אינה באחריותנו.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">פניות בנושאי נגישות</h2>
      <p className="text-slate-700 leading-relaxed">
        אם נתקלת בבעיית נגישות באתר או יש לך הצעה לשיפור, נשמח אם תפנו אלינו.
        נעשה את מירב המאמצים לטפל בבעיה בהקדם.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 not-prose">
        <p className="font-bold text-slate-900 mb-2">רכזת נגישות:</p>
        <p className="text-slate-700">ליאת כהן</p>
        <p className="text-slate-700">
          📧 אימייל:{" "}
          <a
            href="mailto:accessibility@hashveli.co.il"
            className="text-blue-600 hover:underline"
          >
            accessibility@hashveli.co.il
          </a>
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">פרטי ההצהרה</h2>
      <p className="text-slate-700 leading-relaxed">
        הצהרת נגישות זו עודכנה בתאריך 9 ביוני 2026. ההצהרה תיבדק ותעודכן מעת לעת
        בהתאם לשינויים באתר ולעדכוני התקנות.
      </p>
    </article>
  );
}
