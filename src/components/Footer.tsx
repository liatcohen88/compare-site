import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/config";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo.svg"
              alt={SITE_NAME}
              width={200}
              height={60}
              className="h-12 w-auto mb-3"
            />
            <p className="text-sm text-slate-600">
              משווה המחירים המוביל בישראל - השוואה בין KSP, אמזון, אליאקספרס ושיין.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">המוצר</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-blue-600">דף הבית</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">אודות</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">צור קשר</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">משפטי</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:text-blue-600">מדיניות פרטיות</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">תנאי שימוש</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-blue-600">גילוי שותפים</Link></li>
              <li><Link href="/accessibility" className="hover:text-blue-600">♿ הצהרת נגישות</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">חנויות</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>🇮🇱 KSP</li>
              <li>🇺🇸 Amazon</li>
              <li>🇨🇳 AliExpress</li>
              <li>🇨🇳 Shein</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {year} {SITE_NAME}. כל הזכויות שמורות.</p>
          <p className="text-xs">
            כאתר שותפים, אנו עשויים להרוויח עמלה מרכישות זכאיות.
          </p>
        </div>
      </div>
    </footer>
  );
}
