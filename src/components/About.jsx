import { useI18n } from "@/i18n/index.jsx";

const TILTS = ["md:-rotate-1", "md:rotate-1", "md:-rotate-[0.5deg]"];
const FILLS = ["var(--manhattan)", "var(--queens)", "var(--brooklyn)"];

export function About() {
  const { t, messages } = useI18n();
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="mx-auto mt-20 max-w-[90rem] scroll-mt-24 px-4 outline-none sm:px-6">
      <h2 id="about-title" className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {t("about.title")}
      </h2>
      <p className="mt-2 text-lg text-ink">{t("about.intro")}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {messages.about.cards.map((card, i) => (
          <li
            key={card.title}
            className={`rounded-3xl border-2 border-ink p-6 shadow-block transition-transform duration-200 motion-reduce:transition-none motion-safe:hover:rotate-0 ${TILTS[i]}`}
            style={{ background: FILLS[i] }}
          >
            <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-white text-3xl">
              {card.emoji}
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">{card.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-ink">{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
