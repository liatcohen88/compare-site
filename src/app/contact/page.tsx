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
          <h2 className="font-bold text-slate-900 mb-1">📧 אימייל לכל פניה</h2>
          <a
            href="mailto:motiva8891@gmail.com"
            className="text-blue-600 hover:underline text-lg"
          >
            motiva8891@gmail.com
          </a>
          <p className="text-sm text-slate-600 mt-2">
            לפניות כלליות, דיווח על תקלות, מחירים שגויים, שותפויות ופרסום
          </p>
        </div>

        <div className="border-t border-blue-200 pt-4">
          <h2 className="font-bold text-slate-900 mb-1">👤 בעלת האתר</h2>
          <p className="text-slate-700">ליאת כהן</p>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-6">
        אנחנו עונים בדרך כלל תוך 48 שעות בימי עסקים. {SITE_NAME} פועל מישראל.
      </p>
    </article>
  );
}
