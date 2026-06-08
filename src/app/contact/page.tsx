import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `יצירת קשר עם ${SITE_NAME}`,
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">צור קשר</h1>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        יש לכם שאלה, הצעה לשיפור, או מצאתם אי-דיוק במחיר? נשמח לשמוע מכם.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-slate-900 mb-1">📧 אימייל כללי</h2>
          <a href="mailto:info@hashveli.co.il" className="text-blue-600 hover:underline">
            info@hashveli.co.il
          </a>
        </div>

        <div>
          <h2 className="font-bold text-slate-900 mb-1">🐛 דיווח על תקלה / מחיר שגוי</h2>
          <a href="mailto:bugs@hashveli.co.il" className="text-blue-600 hover:underline">
            bugs@hashveli.co.il
          </a>
        </div>

        <div>
          <h2 className="font-bold text-slate-900 mb-1">🤝 שותפויות / פרסום</h2>
          <a href="mailto:partners@hashveli.co.il" className="text-blue-600 hover:underline">
            partners@hashveli.co.il
          </a>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-6">
        אנחנו עונים בדרך כלל תוך 48 שעות בימי עסקים. {SITE_NAME} פועל מישראל.
      </p>
    </article>
  );
}
