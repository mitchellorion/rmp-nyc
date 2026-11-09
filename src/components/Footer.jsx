import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n/index.jsx";
import { jumpTo } from "@/lib/in-page.js";
import { Logo, focusRing } from "./ui.jsx";
import { twMerge } from "tailwind-merge";

// Real pages in public/, so these are plain links with relative paths (the site is served
// from more than one base path, and there is no router).
const LEGAL_PAGES = ["terms", "privacy", "sponsorship", "accessibility", "partners"];

function CtrlAltOrionMark() {
  return (
    <svg
      viewBox="0 0 580 180"
      aria-label="CtrlAltOrion"
      className="h-16 w-auto md:h-20"
      role="img"
    >
      <defs>
        <linearGradient id="keycap-top" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a6a29c" />
          <stop offset="100%" stopColor="#7c7772" />
        </linearGradient>
        <linearGradient id="keycap-side" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8b8782" />
          <stop offset="100%" stopColor="#5f5a56" />
        </linearGradient>
      </defs>

      <g transform="translate(20 18)">
        <g transform="translate(0 0)">
          <rect x="0" y="0" width="140" height="120" rx="18" fill="url(#keycap-top)" stroke="#5d5b58" strokeWidth="2" />
          <rect x="8" y="8" width="124" height="14" rx="8" fill="rgba(255,255,255,0.14)" />
          <text x="70" y="80" textAnchor="middle" fontSize="56" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fill="#f3efe8" letterSpacing="-4">ctrl</text>
        </g>

        <g transform="translate(160 0)">
          <rect x="0" y="0" width="140" height="120" rx="18" fill="url(#keycap-top)" stroke="#5d5b58" strokeWidth="2" />
          <rect x="8" y="8" width="124" height="14" rx="8" fill="rgba(255,255,255,0.14)" />
          <text x="70" y="80" textAnchor="middle" fontSize="56" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fill="#f3efe8" letterSpacing="-4">alt</text>
        </g>

        <g transform="translate(320 0)">
          <rect x="0" y="0" width="180" height="120" rx="18" fill="url(#keycap-top)" stroke="#5d5b58" strokeWidth="2" />
          <rect x="8" y="8" width="164" height="14" rx="8" fill="rgba(255,255,255,0.14)" />
          <text x="90" y="82" textAnchor="middle" fontSize="60" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fill="#f3efe8" letterSpacing="-4">orion</text>
        </g>
      </g>
    </svg>
  );
}

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
            className={twMerge("mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-paper px-4 font-display text-sm font-bold text-paper hover:bg-paper hover:text-ink", focusRing)}
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            {t("footer.top")}
          </a>
        </div>
        <div className="space-y-3 text-base leading-relaxed text-paper">
          <p>{t("footer.note")}</p>
          <p>{t("footer.privacy")}</p>
          <p className="text-sm">{t("footer.credits")}</p>
          <div className="pt-1">
            <div className="mb-2 text-xs font-display uppercase tracking-[0.2em] text-paper/70">Built by</div>
            <a
              href="https://ctrlaltorion.com"
              target="_blank"
              rel="noopener noreferrer"
              className={twMerge("inline-block rounded-lg focus-visible:outline-none", focusRing)}
            >
              <CtrlAltOrionMark />
            </a>
          </div>
        </div>
      </div>
      <nav aria-label={t("footer.legalLabel")} className="mx-auto max-w-[90rem] px-4 pb-10 sm:px-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-paper/25 pt-6 font-display text-sm font-bold">
          {LEGAL_PAGES.map((page) => (
            <li key={page}>
              <a
                href={`${page}.html`}
                className={twMerge(
                  "inline-flex min-h-11 items-center rounded-lg underline-offset-4 decoration-2 hover:underline",
                  focusRing,
                  "focus-visible:ring-offset-ink",
                )}
              >
                {t(`footer.legal.${page}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
