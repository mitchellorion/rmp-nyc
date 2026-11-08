import { twMerge } from "tailwind-merge";
import { useI18n } from "@/i18n/index.jsx";
import { jumpTo } from "@/lib/in-page.js";
import { Logo, focusRing } from "./ui.jsx";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[90rem] items-center gap-4 px-4 sm:px-6">
        <a
          href="#top"
          onClick={jumpTo}
          aria-label={t("header.home", { brand: t("brand.name") })}
          className={twMerge("group flex min-w-0 items-center gap-2.5 rounded-lg py-2", focusRing)}
        >
          <Logo className="size-10 shrink-0 transition-transform group-hover:-rotate-6 motion-reduce:transition-none" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-xl font-extrabold tracking-tight text-ink">{t("brand.name")}</span>
            <span className="hidden text-xs font-semibold text-ink sm:block">{t("brand.tagline")}</span>
          </span>
        </a>
        <a
          href="#about"
          onClick={jumpTo}
          className={twMerge(
            "ml-auto inline-flex min-h-11 shrink-0 items-center rounded-xl border-2 border-ink bg-white px-4 font-display text-sm font-bold text-ink shadow-block-sm transition-transform hover:-translate-y-px motion-reduce:transition-none",
            focusRing,
          )}
        >
          {t("header.about")}
        </a>
      </div>
    </header>
  );
}
