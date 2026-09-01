"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  multi?: boolean;
  options: { emoji: string; label: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "vibe",
    title: "Ce vibe are seara noastră?",
    subtitle: "Sâmbătă. Casa e a noastră.",
    options: [
      { emoji: "🕯️", label: "Cozy și liniștit" },
      { emoji: "✨", label: "Elegant, ne aranjăm frumos" },
      { emoji: "😜", label: "Jucăuș și haios" },
      { emoji: "🎬", label: "Cinema acasă, pijamale" },
    ],
  },
  {
    id: "food",
    title: "Cu ce ne răsfățăm?",
    options: [
      { emoji: "🍳", label: "Gătim ceva împreună" },
      { emoji: "🧀", label: "Platou cu bunătăți" },
      { emoji: "🍕", label: "Comandăm ce poftim" },
      { emoji: "🍣", label: "Sushi!" },
    ],
  },
  {
    id: "activity",
    title: "Ce facem după?",
    subtitle: "Poți alege mai multe 😉",
    multi: true,
    options: [
      { emoji: "🎲", label: "Jocuri" },
      { emoji: "🎬", label: "Film" },
      { emoji: "💃", label: "Dans în sufragerie" },
      { emoji: "🧖", label: "Spa acasă" },
      { emoji: "🎨", label: "Ceva creativ" },
      { emoji: "🌙", label: "Povești pe canapea" },
    ],
  },
  {
    id: "drinks",
    title: "Și de băut?",
    options: [
      { emoji: "🍷", label: "Vin" },
      { emoji: "🍹", label: "Cocktailuri făcute de barman-ul casei" },
      { emoji: "🫖", label: "Ceai / cacao caldă" },
      { emoji: "🥤", label: "Ceva fără alcool" },
    ],
  },
  {
    id: "dessert",
    title: "Desertul?",
    options: [
      { emoji: "🍫", label: "Ciocolată" },
      { emoji: "🍰", label: "Ceva copt de noi" },
      { emoji: "🍦", label: "Înghețată" },
      { emoji: "😏", label: "Surprinde-mă" },
    ],
  },
  {
    id: "music",
    title: "Pe ce muzică?",
    options: [
      { emoji: "🌊", label: "Chill" },
      { emoji: "📼", label: "Melodiile noastre" },
      { emoji: "💃", label: "Latino" },
      { emoji: "🎷", label: "Jazz" },
    ],
  },
];

const WISH_ID = "wish";
const TOTAL_STEPS = QUESTIONS.length + 1; // + free-text wish

export default function DateNight() {
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [wish, setWish] = useState("");
  const [copied, setCopied] = useState(false);

  const done = step >= TOTAL_STEPS;
  const question = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;

  const toggle = (q: Question, label: string) => {
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      if (q.multi) {
        return {
          ...prev,
          [q.id]: current.includes(label)
            ? current.filter((l) => l !== label)
            : [...current, label],
        };
      }
      return { ...prev, [q.id]: [label] };
    });
    if (!q.multi) setTimeout(() => setStep((s) => s + 1), 250);
  };

  const summary = useMemo(() => {
    const lines = QUESTIONS.map((q) => {
      const picked = answers[q.id] ?? [];
      const withEmoji = picked.map((label) => {
        const opt = q.options.find((o) => o.label === label);
        return opt ? `${opt.emoji} ${opt.label}` : label;
      });
      return `${q.title} ${withEmoji.join(", ") || "—"}`;
    });
    if (wish.trim()) lines.push(`Îmi mai doresc: ${wish.trim()}`);
    return `💛 Date night — răspunsurile mele:\n\n${lines.join("\n")}`;
  }, [answers, wish]);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(summary)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the WhatsApp button still works */
    }
  };

  return (
    <main className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* progress hearts */}
        {step >= 0 && !done && (
          <div className="flex justify-center gap-1.5 mb-8" aria-hidden>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`text-sm transition-opacity ${i <= step ? "opacity-100" : "opacity-25"}`}
              >
                💛
              </span>
            ))}
          </div>
        )}

        {step === -1 && (
          <div className="text-center space-y-6">
            <div className="text-6xl">💌</div>
            <h1 className="text-3xl font-semibold text-mint-bright">
              Bună, frumoaso!
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Sâmbătă seara e a noastră și pregătesc ceva. Dar am nevoie de un
              singur lucru de la tine: câteva răspunsuri. Promit că durează un
              minut.
            </p>
            <button
              onClick={() => setStep(0)}
              className="bg-mint text-background font-semibold rounded-full px-8 py-3 text-lg hover:bg-mint-bright transition-colors"
            >
              Hai să jucăm →
            </button>
          </div>
        )}

        {question && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-peach-bright">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="opacity-60 mt-1">{question.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((opt) => {
                const selected = (answers[question.id] ?? []).includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    onClick={() => toggle(question, opt.label)}
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left text-lg transition-all active:scale-[0.98] ${
                      selected
                        ? "border-mint bg-surface-2 shadow-[0_0_0_1px_var(--color-mint)]"
                        : "border-border-soft bg-surface hover:border-mint/50"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {selected && <span className="ml-auto text-mint">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep((s) => s - 1)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                ← Înapoi
              </button>
              {question.multi && (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={(answers[question.id] ?? []).length === 0}
                  className="bg-mint text-background font-semibold rounded-full px-6 py-2 disabled:opacity-30 hover:bg-mint-bright transition-colors"
                >
                  Gata →
                </button>
              )}
            </div>
          </div>
        )}

        {step === QUESTIONS.length && !done && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-peach-bright">
                Ultima: ceva ce îți dorești neapărat?
              </h2>
              <p className="opacity-60 mt-1">Orice. Chiar orice. 💭</p>
            </div>
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={4}
              placeholder="Scrie aici… sau lasă gol și improvizez eu"
              className="w-full rounded-2xl border border-border-soft bg-surface px-5 py-4 text-lg outline-none focus:border-mint resize-none placeholder:opacity-40"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep((s) => s - 1)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                ← Înapoi
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-mint text-background font-semibold rounded-full px-6 py-2 hover:bg-mint-bright transition-colors"
              >
                Am terminat 💛
              </button>
            </div>
          </div>
        )}

        {done && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🥰</div>
            <h2 className="text-3xl font-semibold text-mint-bright">
              Mulțumesc!
            </h2>
            <p className="text-lg opacity-80">
              Acum trimite-mi răspunsurile și de restul mă ocup eu. Ne vedem
              sâmbătă. 😘
            </p>
            <div className="rounded-2xl border border-border-soft bg-surface p-5 text-left text-sm whitespace-pre-wrap opacity-80">
              {summary}
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint text-background font-semibold rounded-full px-8 py-3 text-lg hover:bg-mint-bright transition-colors"
              >
                Trimite pe WhatsApp 💌
              </a>
              <button
                onClick={copy}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                {copied ? "Copiat ✓" : "…sau copiază textul"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
