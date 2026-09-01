"use client";

import { useEffect, useMemo, useState } from "react";

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  multi?: boolean;
  mood: Mood;
  options: { emoji: string; label: string }[];
};

type Mood = "happy" | "hungry" | "excited" | "tipsy" | "sweet" | "groovy" | "love";

const QUESTIONS: Question[] = [
  {
    id: "vibe",
    title: "What's the vibe tonight?",
    subtitle: "Saturday. The house is ours ✨",
    mood: "happy",
    options: [
      { emoji: "🕯️", label: "Cozy & snuggly" },
      { emoji: "👗", label: "Fancy — we dress up" },
      { emoji: "😜", label: "Silly & playful" },
      { emoji: "🎬", label: "Home cinema, pajamas on" },
    ],
  },
  {
    id: "food",
    title: "What are we nomming?",
    mood: "hungry",
    options: [
      { emoji: "🍳", label: "We cook together" },
      { emoji: "🧀", label: "A yummy snack board" },
      { emoji: "🍕", label: "Order whatever we crave" },
      { emoji: "🍣", label: "Sushiii!" },
    ],
  },
  {
    id: "activity",
    title: "And after dinner?",
    subtitle: "Pick as many as you like 💕",
    multi: true,
    mood: "excited",
    options: [
      { emoji: "🎲", label: "Games!" },
      { emoji: "🎬", label: "A movie" },
      { emoji: "💃", label: "Living-room dancing" },
      { emoji: "🧖‍♀️", label: "Home spa" },
      { emoji: "🎨", label: "Something crafty" },
      { emoji: "🌙", label: "Couch talks till late" },
    ],
  },
  {
    id: "drinks",
    title: "What's in our glasses?",
    mood: "tipsy",
    options: [
      { emoji: "🍷", label: "Wine" },
      { emoji: "🍹", label: "Cocktails by the house barman" },
      { emoji: "🫖", label: "Tea / hot cocoa" },
      { emoji: "🧋", label: "Something cute, no alcohol" },
    ],
  },
  {
    id: "dessert",
    title: "Dessert time…?",
    mood: "sweet",
    options: [
      { emoji: "🍫", label: "Chocolate!" },
      { emoji: "🧁", label: "We bake something" },
      { emoji: "🍦", label: "Ice cream" },
      { emoji: "😏", label: "Surprise me" },
    ],
  },
  {
    id: "music",
    title: "Soundtrack of the night?",
    mood: "groovy",
    options: [
      { emoji: "🌊", label: "Chill & dreamy" },
      { emoji: "📼", label: "Our songs" },
      { emoji: "💃", label: "Latino heat" },
      { emoji: "🎷", label: "Smooth jazz" },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1; // + free-text wish

/* ---------- chibi mascot ---------- */

function Chibi({ mood }: { mood: Mood }) {
  const eyes = (() => {
    switch (mood) {
      case "love":
        return (
          <>
            <text x="38" y="47" fontSize="13" textAnchor="middle">💗</text>
            <text x="66" y="47" fontSize="13" textAnchor="middle">💗</text>
          </>
        );
      case "excited":
        return (
          <>
            <text x="38" y="47" fontSize="12" textAnchor="middle">✨</text>
            <text x="66" y="47" fontSize="12" textAnchor="middle">✨</text>
          </>
        );
      case "sweet":
        return (
          <>
            <path d="M33 42 q5 -6 10 0" stroke="#5a3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M61 42 q5 -6 10 0" stroke="#5a3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <circle cx="38" cy="43" r="4.2" fill="#5a3d3d" />
            <circle cx="66" cy="43" r="4.2" fill="#5a3d3d" />
            <circle cx="39.5" cy="41.5" r="1.4" fill="#fff" />
            <circle cx="67.5" cy="41.5" r="1.4" fill="#fff" />
          </>
        );
    }
  })();

  const mouth = (() => {
    switch (mood) {
      case "hungry":
        return <ellipse cx="52" cy="56" rx="5" ry="6" fill="#5a3d3d" />;
      case "tipsy":
        return <path d="M46 56 q6 5 12 0" stroke="#5a3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
      case "love":
      case "excited":
        return <path d="M44 54 q8 8 16 0" stroke="#5a3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
      default:
        return <path d="M47 55 q5 4 10 0" stroke="#5a3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
    }
  })();

  return (
    <svg viewBox="0 0 104 96" className="w-32 h-28 chibi-bob" aria-hidden>
      {/* ears */}
      <path d="M22 26 L14 6 L38 16 Z" fill="#ffd9e8" stroke="#f5a8c6" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M82 26 L90 6 L66 16 Z" fill="#ffd9e8" stroke="#f5a8c6" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 22 L19 11 L33 17 Z" fill="#ff9ec4" />
      <path d="M80 22 L85 11 L71 17 Z" fill="#ff9ec4" />
      {/* head */}
      <ellipse cx="52" cy="50" rx="40" ry="36" fill="#ffd9e8" stroke="#f5a8c6" strokeWidth="2.5" />
      {/* blush */}
      <ellipse cx="26" cy="52" rx="6.5" ry="4" fill="#ffb0cd" opacity="0.85" />
      <ellipse cx="78" cy="52" rx="6.5" ry="4" fill="#ffb0cd" opacity="0.85" />
      {eyes}
      {mouth}
      {/* whiskers */}
      <path d="M8 46 h10 M8 54 h10 M86 46 h10 M86 54 h10" stroke="#f5a8c6" strokeWidth="2" strokeLinecap="round" />
      {/* paws */}
      <ellipse cx="34" cy="86" rx="10" ry="7" fill="#ffd9e8" stroke="#f5a8c6" strokeWidth="2.5" />
      <ellipse cx="70" cy="86" rx="10" ry="7" fill="#ffd9e8" stroke="#f5a8c6" strokeWidth="2.5" />
    </svg>
  );
}

/* ---------- floating background bits ---------- */

const FLOATIES = ["💖", "🌸", "✨", "💕", "🎀", "⭐", "💗", "🌷", "✨", "💘", "🌸", "💝"];

function Floaties() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {FLOATIES.map((f, i) => (
        <span
          key={i}
          className="floaty absolute text-2xl opacity-40"
          style={{
            left: `${(i * 83) % 100}%`,
            animationDelay: `${(i * 1.7) % 12}s`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            fontSize: `${16 + (i % 3) * 8}px`,
          }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

/* ---------- confetti burst on the final screen ---------- */

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="confetto absolute text-xl"
          style={{
            left: `${(i * 41) % 100}%`,
            animationDelay: `${(i % 8) * 0.15}s`,
          }}
        >
          {["💖", "🎉", "✨", "🌸", "💛", "🎀"][i % 6]}
        </span>
      ))}
    </div>
  );
}

/* ---------- page ---------- */

export default function DateNight() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [wish, setWish] = useState("");
  const [copied, setCopied] = useState(false);
  const [popKey, setPopKey] = useState(0);

  const done = step >= TOTAL_STEPS;
  const question = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;
  const mood: Mood = done ? "love" : question ? question.mood : step === QUESTIONS.length ? "love" : "happy";

  useEffect(() => setPopKey((k) => k + 1), [step]);

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
    if (!q.multi) setTimeout(() => setStep((s) => s + 1), 280);
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
    if (wish.trim()) lines.push(`My little wish: ${wish.trim()}`);
    return `💖 Date night — my answers:\n\n${lines.join("\n")}`;
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
    <main className="dn min-h-dvh flex flex-col items-center justify-center px-5 py-10 relative">
      <style>{css}</style>
      <Floaties />
      {done && <Confetti />}

      <div className="w-full max-w-md relative">
        {/* progress hearts */}
        {step >= 0 && !done && (
          <div className="flex justify-center gap-1.5 mb-5" aria-hidden>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`text-lg transition-all duration-300 ${
                  i <= step ? "scale-110" : "grayscale opacity-30 scale-90"
                }`}
              >
                💖
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-center mb-2">
          <Chibi mood={mood} />
        </div>

        <div key={popKey} className="card-pop">
          {step === -1 && (
            <div className="bubble text-center space-y-5">
              <h1 className="text-4xl font-bold text-[#e0568c]">
                Hiii cutie! 💌
              </h1>
              <p className="text-lg text-[#8a6a75] leading-relaxed">
                Saturday night is ours and I&apos;m planning something for us.
                But first, this little kitty has a few questions for you.
                Pinky promise it takes one minute!
              </p>
              <button onClick={() => setStep(0)} className="btn-main wiggle">
                Let&apos;s play! 🎀
              </button>
            </div>
          )}

          {question && (
            <div className="bubble space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#e0568c]">{question.title}</h2>
                {question.subtitle && (
                  <p className="text-[#b08a99] mt-1">{question.subtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {question.options.map((opt) => {
                  const selected = (answers[question.id] ?? []).includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggle(question, opt.label)}
                      className={`opt ${selected ? "opt-on" : ""}`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span>{opt.label}</span>
                      {selected && <span className="ml-auto">💖</span>}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-1">
                <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                  ← back
                </button>
                {question.multi && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={(answers[question.id] ?? []).length === 0}
                    className="btn-main"
                  >
                    Done! →
                  </button>
                )}
              </div>
            </div>
          )}

          {step === QUESTIONS.length && !done && (
            <div className="bubble space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#e0568c]">
                  Last one: any special little wish?
                </h2>
                <p className="text-[#b08a99] mt-1">Anything. Really anything 💭</p>
              </div>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                rows={4}
                placeholder="Type here… or leave it empty and I'll improvise ✨"
                className="w-full rounded-3xl border-[3px] border-[#ffd0e2] bg-white px-5 py-4 text-lg text-[#7a5a66] outline-none focus:border-[#ff9ec4] resize-none placeholder:text-[#d4b3c0]"
              />
              <div className="flex justify-between items-center">
                <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                  ← back
                </button>
                <button onClick={() => setStep((s) => s + 1)} className="btn-main">
                  All done! 💖
                </button>
              </div>
            </div>
          )}

          {done && (
            <div className="bubble text-center space-y-5">
              <h2 className="text-3xl font-bold text-[#e0568c]">
                Yaaay, thank you! 🥰
              </h2>
              <p className="text-lg text-[#8a6a75]">
                Now send me your answers and I&apos;ll take care of everything
                else. See you Saturday 😘
              </p>
              <div className="rounded-3xl border-[3px] border-[#ffd0e2] bg-[#fff6fa] p-5 text-left text-sm whitespace-pre-wrap text-[#8a6a75]">
                {summary}
              </div>
              <div className="flex flex-col gap-3 items-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-main wiggle"
                >
                  Send on WhatsApp 💌
                </a>
                <button onClick={copy} className="btn-ghost">
                  {copied ? "Copied! ✓" : "…or copy the text"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const css = `
.dn {
  background: linear-gradient(160deg, #ffe3ef 0%, #fff2e3 45%, #efe6ff 100%);
}
.bubble {
  background: rgba(255, 255, 255, 0.88);
  border: 3px solid #ffd0e2;
  border-radius: 2rem;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 10px 30px rgba(224, 86, 140, 0.15), 0 3px 0 #ffd0e2;
  backdrop-filter: blur(4px);
}
.btn-main {
  display: inline-block;
  background: linear-gradient(180deg, #ff9ec4, #ff7bac);
  color: #fff;
  font-weight: 700;
  font-size: 1.15rem;
  border-radius: 9999px;
  padding: 0.8rem 2.2rem;
  box-shadow: 0 4px 0 #e0568c;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-main:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #e0568c; }
.btn-main:active { transform: translateY(2px); box-shadow: 0 2px 0 #e0568c; }
.btn-main:disabled { opacity: 0.4; box-shadow: 0 4px 0 #e0568c; transform: none; }
.btn-ghost { color: #c290a3; font-weight: 600; transition: color 0.15s; }
.btn-ghost:hover { color: #e0568c; }
.opt {
  display: flex; align-items: center; gap: 1rem; text-align: left;
  font-size: 1.1rem; font-weight: 600; color: #7a5a66;
  background: #fff; border: 3px solid #ffd0e2; border-radius: 1.5rem;
  padding: 0.9rem 1.25rem;
  box-shadow: 0 3px 0 #ffd0e2;
  transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.opt:hover { transform: translateY(-2px) rotate(-0.5deg); border-color: #ff9ec4; box-shadow: 0 5px 0 #ffc3da; }
.opt:active { transform: scale(0.97); }
.opt-on {
  border-color: #ff7bac; background: #fff0f6;
  box-shadow: 0 3px 0 #ff9ec4;
  animation: pop 0.25s ease;
}
@keyframes pop { 50% { transform: scale(1.04); } }
.card-pop { animation: cardIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px) scale(0.96); } }
.chibi-bob { animation: bob 2.6s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(-7px) rotate(2deg); } }
.wiggle { animation: wiggle 2.2s ease-in-out infinite; }
@keyframes wiggle { 0%, 100% { rotate: -2deg; } 50% { rotate: 2deg; } }
.floaty { bottom: -3rem; animation-name: floatUp; animation-timing-function: linear; animation-iteration-count: infinite; }
@keyframes floatUp {
  from { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.45; }
  90% { opacity: 0.3; }
  to { transform: translateY(-110vh) rotate(30deg); opacity: 0; }
}
.confetto { top: -2rem; animation: fall 2.8s ease-in forwards; }
@keyframes fall {
  to { transform: translateY(110vh) rotate(220deg); opacity: 0.2; }
}
`;
