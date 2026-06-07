import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "אודות",
  description: `${SITE_NAME} - משווה המחירים המוביל בישראל. עוזרים לכם לחסוך כסף על אלקטרוניקה, גאדג'טים ומוצרי בית.`,
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">אודות {SITE_NAME}</h1>

      <p className="text-lg text-slate-700 leading-relaxed">
        אנחנו אתר השוואת מחירים עצמאי, שמטרתו היחידה לחסוך לכם כסף.
        בכל קנייה אונליין, אתם יכולים לבחור בין עשרות חנויות בעולם - וההפרש במחיר יכול להגיע למאות שקלים.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">המשימה שלנו</h2>
      <p className="text-slate-700 leading-relaxed">
        עד היום, להשוות מחיר בין KSP, אמזון, אליאקספרס ושיין דרש פתיחה של 4 חלונות, חיפושים שונים, חישובי משלוח ומכס.
        בנינו את האתר הזה כדי שתוכלו לראות את כל המידע בעמוד אחד, בעברית, ובלחיצה אחת תגיעו לחנות הזולה ביותר.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">איך אנחנו מרוויחים?</h2>
      <p className="text-slate-700 leading-relaxed">
        האתר חינמי לחלוטין למשתמשים. אנחנו עובדים כאתר שותפים (Affiliate) של החנויות -
        אם תקנו דרך הקישורים שלנו, אנו מקבלים עמלה קטנה מהחנות, ללא תוספת עלות עבורכם.
        זה מאפשר לנו לשמור את האתר חינמי ולהמשיך לעדכן מחירים מדי יום.
      </p>
      <p className="text-slate-700 leading-relaxed mt-3">
        חשוב לדעת: התעריפים של האפיליאט הם זהים אצל כל החנויות, כך שאין לנו תמריץ לכוון אתכם לחנות אחת על פני אחרת.
        תמיד נציג לכם את המחיר הזול ביותר באובייקטיביות.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">מה אנחנו משווים</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-1">
        <li><strong>KSP</strong> - רשת אלקטרוניקה מובילה בישראל. משלוח מהיר, אחריות מקומית.</li>
        <li><strong>Amazon</strong> - הענקית האמריקאית. מבחר עצום, איכות, משלוח 7-14 ימים.</li>
        <li><strong>AliExpress</strong> - מחירים זולים מאוד מסין. משלוח 14-30 ימים.</li>
        <li><strong>Shein</strong> - אופנה ואקססוריז במחירים נוחים.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">מסירות לאיכות</h2>
      <p className="text-slate-700 leading-relaxed">
        אנחנו מעדכנים את המחירים מדי יום, בודקים זמינות במלאי, ומסירים מוצרים שכבר לא רלוונטיים.
        אם מצאתם אי-דיוק - <a href="/contact" className="text-blue-600 hover:underline">צרו איתנו קשר</a> ונתקן מיד.
      </p>
    </article>
  );
}
