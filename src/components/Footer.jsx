import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n/index.jsx";
import { jumpTo } from "@/lib/in-page.js";
import { Logo, focusRing } from "./ui.jsx";
import { twMerge } from "tailwind-merge";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-20 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="size-9" />
            <span className="font-display text-xl font-extrabold">{t("brand.name")}</span>
          </div>
          <a
            href="#top"
            onClick={jumpTo}
            className={twMerge("mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-paper px-4 font-display text-sm font-bold text-paper hover:bg-paper hover:text-ink", focusRing, "focus-visible:ring-offset-ink")}
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            {t("footer.top")}
          </a>
        </div>
        <div className="space-y-3 text-base leading-relaxed text-paper">
          <p>{t("footer.note")}</p>
          <p>{t("footer.privacy")}</p>
          <p className="text-sm">{t("footer.credits")}</p>
        </div>
      </div>
    </footer>
  );
}
