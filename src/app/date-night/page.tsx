"use client";

import { useMemo, useState } from "react";

type Mood = "happy" | "hungry" | "excited" | "tipsy" | "sweet" | "groovy" | "wish" | "love";

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  multi?: boolean;
  mood: Mood;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "vibe",
    title: "the vibe tonight?",
    subtitle: "saturday. the house is ours.",
    mood: "happy",
    options: [
      "cozy & snuggly",
      "silly & playful",
      "home cinema, pajamas on",
    ],
  },
  {
    id: "food",
    title: "chef me is cooking — what are you craving?",
    mood: "hungry",
    options: [
      "pasta night",
      "something asian-ish",
      "comfort food classics",
      "chef's surprise",
    ],
  },
  {
    id: "activity",
    title: "after dinner, we…",
    subtitle: "pick as many as you like",
    multi: true,
    mood: "excited",
    options: [
      "play games",
      "watch a movie",
      "dance in the living room",
      "home spa",
      "make something crafty",
    ],
  },
  {
    id: "drinks",
    title: "in our glasses…",
    mood: "tipsy",
    options: [
      "fancy mocktails by the house barman",
      "tea or hot cocoa",
      "fresh lemonade",
      "something bubbly",
    ],
  },
  {
    id: "dessert",
    title: "and for dessert?",
    mood: "sweet",
    options: ["chocolate", "we bake something", "ice cream", "surprise me"],
  },
  {
    id: "music",
    title: "the soundtrack?",
    mood: "groovy",
    options: ["chill & dreamy", "latino", "smooth jazz"],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1;

/* ---------------- palette ----------------
   paper  #FFF9F2   ink  #4A3B36
   rose   #F27998   rose-dark #D95D80
   rose-soft #FFE4EC   butter #FFE9C7
------------------------------------------- */

const INK = "#4A3B36";
const ROSE = "#F27998";
const ROSE_SOFT = "#FFE4EC";

/* ---------------- the kitty ---------------- */

function Kitty({ mood }: { mood: Mood }) {
  const S = 3; // outline weight, constant everywhere

  const eyes = (() => {
    switch (mood) {
      case "love":
        return (
          <>
            <path d="M40 44 c-3 -4 -9 -2 -9 3 c0 4 5 7 9 10 c4 -3 9 -6 9 -10 c0 -5 -6 -7 -9 -3 Z" fill={ROSE} />
            <path d="M80 44 c-3 -4 -9 -2 -9 3 c0 4 5 7 9 10 c4 -3 9 -6 9 -10 c0 -5 -6 -7 -9 -3 Z" fill={ROSE} />
          </>
        );
      case "excited":
        return (
          <>
            <path d="M40 40 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 Z" fill={INK} />
            <path d="M80 40 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 Z" fill={INK} />
          </>
        );
      case "sweet":
        return (
          <>
            <path d="M33 48 q7 -8 14 0" stroke={INK} strokeWidth={S} fill="none" strokeLinecap="round" />
            <path d="M73 48 q7 -8 14 0" stroke={INK} strokeWidth={S} fill="none" strokeLinecap="round" />
          </>
        );
      case "tipsy":
        return (
          <>
            <g className="k-blink">
              <ellipse cx="40" cy="47" rx="5" ry="6" fill={INK} />
              <circle cx="42" cy="45" r="1.8" fill="#fff" />
            </g>
            <g className="k-blink">
              <ellipse cx="80" cy="47" rx="5" ry="6" fill={INK} />
              <circle cx="82" cy="45" r="1.8" fill="#fff" />
            </g>
            <path d="M28 36 q6 -4 12 -2" stroke={INK} strokeWidth={S * 0.8} fill="none" strokeLinecap="round" />
            <path d="M92 36 q-6 -4 -12 -2" stroke={INK} strokeWidth={S * 0.8} fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <g className="k-blink">
              <ellipse cx="40" cy="47" rx="5" ry="6" fill={INK} />
              <circle cx="42" cy="45" r="1.8" fill="#fff" />
            </g>
            <g className="k-blink">
              <ellipse cx="80" cy="47" rx="5" ry="6" fill={INK} />
              <circle cx="82" cy="45" r="1.8" fill="#fff" />
            </g>
          </>
        );
    }
  })();

  return (
    <svg viewBox="0 0 120 112" className="k-bob w-36 h-32" aria-hidden>
      {/* tail */}
      <path
        d="M96 92 q18 2 16 -14 q-1 -9 -9 -10"
        fill="none"
        stroke={INK}
        strokeWidth={S}
        strokeLinecap="round"
        className="k-tail"
      />
      {/* ears */}
      <path d="M26 34 Q22 10 38 16 L48 24 Z" fill="#fff" stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M94 34 Q98 10 82 16 L72 24 Z" fill="#fff" stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M30 30 Q28 18 37 21 L42 25 Z" fill={ROSE_SOFT} />
      <path d="M90 30 Q92 18 83 21 L78 25 Z" fill={ROSE_SOFT} />
      {/* head */}
      <ellipse cx="60" cy="54" rx="42" ry="36" fill="#fff" stroke={INK} strokeWidth={S} />
      {/* cheeks */}
      <ellipse cx="30" cy="60" rx="7" ry="4.5" fill={ROSE_SOFT} />
      <ellipse cx="90" cy="60" rx="7" ry="4.5" fill={ROSE_SOFT} />
      {eyes}
      {/* nose + mouth */}
      <path d="M57 57 h6 l-3 4 Z" fill={ROSE} />
      <path d="M60 61 v3 M60 64 q-4 4 -8 1 M60 64 q4 4 8 1" stroke={INK} strokeWidth={S * 0.8} fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M12 52 h9 M13 60 h8 M99 52 h9 M99 60 h8" stroke={INK} strokeWidth={S * 0.7} strokeLinecap="round" />
      {/* body + paws */}
      <path d="M38 88 q0 16 22 16 q22 0 22 -16" fill="#fff" stroke={INK} strokeWidth={S} />
      <ellipse cx="48" cy="102" rx="8" ry="5" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />
      <ellipse cx="72" cy="102" rx="8" ry="5" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />

      {/* ------- costume props per mood ------- */}
      {mood === "hungry" && (
        <g transform="rotate(-8 60 18)">
          {/* chef toque: three puffs + band */}
          <circle cx="45" cy="15" r="10" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />
          <circle cx="75" cy="15" r="10" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />
          <circle cx="60" cy="9" r="12" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />
          <rect x="42" y="19" width="36" height="13" rx="5" fill="#fff" stroke={INK} strokeWidth={S * 0.9} />
        </g>
      )}
      {mood === "groovy" && (
        <g>
          <path d="M22 44 q-2 -34 38 -34 q40 0 38 34" fill="none" stroke={INK} strokeWidth={S} strokeLinecap="round" />
          <rect x="14" y="40" width="12" height="18" rx="6" fill={ROSE} stroke={INK} strokeWidth={S * 0.9} />
          <rect x="94" y="40" width="12" height="18" rx="6" fill={ROSE} stroke={INK} strokeWidth={S * 0.9} />
        </g>
      )}
      {mood === "tipsy" && (
        <g>
          {/* tiny wine glass in paw */}
          <path d="M96 78 q10 8 2 16 l-6 6" fill="none" stroke={INK} strokeWidth={S * 0.8} strokeLinecap="round" />
          <path d="M104 68 q0 10 -8 10 q-8 0 -8 -10 Z" fill={ROSE_SOFT} stroke={INK} strokeWidth={S * 0.8} strokeLinejoin="round" />
          <path d="M96 78 v8 M90 88 h12" stroke={INK} strokeWidth={S * 0.8} strokeLinecap="round" />
        </g>
      )}
      {mood === "sweet" && (
        /* little tongue */
        <path d="M56 66 q4 6 8 0 q0 6 -4 6 q-4 0 -4 -6 Z" fill={ROSE} stroke={INK} strokeWidth={S * 0.6} />
      )}
      {mood === "wish" && (
        <g>
          {/* pencil in paw */}
          <path d="M92 76 l16 -14 4 5 -16 14 -6 1 Z" fill="#FFE9C7" stroke={INK} strokeWidth={S * 0.8} strokeLinejoin="round" />
          <path d="M108 62 l4 5" stroke={INK} strokeWidth={S * 0.8} />
        </g>
      )}
      {mood === "love" && (
        <g className="k-float-heart">
          <path d="M104 26 c-2.5 -3.5 -8 -2 -8 2.5 c0 3.5 4.5 6 8 8.5 c3.5 -2.5 8 -5 8 -8.5 c0 -4.5 -5.5 -6 -8 -2.5 Z" fill={ROSE} stroke={INK} strokeWidth={S * 0.6} />
        </g>
      )}
      {(mood === "happy" || mood === "excited") && (
        /* bow on the ear */
        <g>
          <path d="M84 12 q6 -6 8 0 q6 -2 4 4 q6 2 0 6 q0 6 -6 3 q-4 4 -6 -2 q-6 1 -4 -5 q-4 -4 4 -6 Z" fill={ROSE} stroke={INK} strokeWidth={S * 0.7} strokeLinejoin="round" />
          <circle cx="88" cy="17" r="2" fill="#fff" />
        </g>
      )}
    </svg>
  );
}

/* ---------------- small drawn bits ---------------- */

function Heart({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={`w-4 h-4 ${className}`} aria-hidden>
      <path
        d="M12 6 C9 1 2 2.5 2 8 c0 5 6 8.5 10 12 c4 -3.5 10 -7 10 -12 c0 -5.5 -7 -7 -10 -2 Z"
        fill={filled ? ROSE : "none"}
        stroke={filled ? ROSE : "#E8C8D2"}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute w-5 h-5 twinkle ${className}`} style={style} aria-hidden>
      <path d="M12 2 l2.2 7.8 L22 12 l-7.8 2.2 L12 22 l-2.2 -7.8 L2 12 l7.8 -2.2 Z" fill="#F2B8C9" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
      <path d="M4 13 l5 5 L20 6" fill="none" stroke={ROSE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- page ---------------- */

export default function DateNight() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [otherOpen, setOtherOpen] = useState<Record<string, boolean>>({});
  const [wish, setWish] = useState("");
  const [copied, setCopied] = useState(false);

  const done = step >= TOTAL_STEPS;
  const question = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;
  const mood: Mood = done ? "love" : question ? question.mood : step === QUESTIONS.length ? "wish" : "happy";

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
    if (!q.multi) setTimeout(() => setStep((s) => s + 1), 300);
  };

  const summary = useMemo(() => {
    const lines = QUESTIONS.map((q) => {
      const picked = [...(answers[q.id] ?? [])];
      const own = (others[q.id] ?? "").trim();
      if (own) picked.push(own);
      return `${q.title} ${picked.join(", ") || "—"}`;
    });
    if (wish.trim()) lines.push(`my little wish: ${wish.trim()}`);
    return `date night — my answers ♡\n\n${lines.join("\n")}`;
  }, [answers, others, wish]);

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
    <main className="dn min-h-dvh flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden">
      <style>{css}</style>

      {/* a few deliberate sparkles, not a rain */}
      <Sparkle style={{ top: "12%", left: "12%", animationDelay: "0s" }} />
      <Sparkle style={{ top: "22%", right: "10%", animationDelay: "1.1s" }} className="w-3.5 h-3.5" />
      <Sparkle style={{ bottom: "18%", left: "8%", animationDelay: "2s" }} className="w-3.5 h-3.5" />
      <Sparkle style={{ bottom: "10%", right: "14%", animationDelay: "0.6s" }} />

      <div className="w-full max-w-md relative">
        {step >= 0 && !done && (
          <div className="flex justify-center gap-1.5 mb-5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <Heart key={i} filled={i <= step} />
            ))}
          </div>
        )}

        <div className="flex justify-center -mb-3 relative z-10">
          <Kitty mood={mood} />
        </div>

        <div key={step} className="card-in">
          {step === -1 && (
            <div className="paper text-center space-y-5">
              <h1 className="text-3xl font-semibold ink">hi, you.</h1>
              <p className="text-[17px] leading-relaxed ink-soft">
                Saturday night is booked — by me, for us.
                <br />
                This little cat has a few questions first.
                <br />
                One minute, pinky promise.
              </p>
              <button onClick={() => setStep(0)} className="btn-main">
                let&apos;s begin
              </button>
            </div>
          )}

          {question && (
            <div className="paper space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-semibold ink">{question.title}</h2>
                {question.subtitle && <p className="ink-faint mt-1 text-[15px]">{question.subtitle}</p>}
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {question.options.map((label) => {
                  const selected = (answers[question.id] ?? []).includes(label);
                  return (
                    <button key={label} onClick={() => toggle(question, label)} className={`opt ${selected ? "opt-on" : ""}`}>
                      <span>{label}</span>
                      {selected && (
                        <span className="ml-auto check-in">
                          <Check />
                        </span>
                      )}
                    </button>
                  );
                })}
                {otherOpen[question.id] ? (
                  <input
                    autoFocus
                    value={others[question.id] ?? ""}
                    onChange={(e) => setOthers((p) => ({ ...p, [question.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (others[question.id] ?? "").trim()) setStep((s) => s + 1);
                    }}
                    placeholder="your own idea…"
                    className="wish-box !py-3"
                  />
                ) : (
                  <button
                    onClick={() => setOtherOpen((p) => ({ ...p, [question.id]: true }))}
                    className="opt opt-dashed ink-faint"
                  >
                    <span>or something of your own…</span>
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center pt-1">
                <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                  back
                </button>
                {(question.multi || otherOpen[question.id]) && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={
                      (answers[question.id] ?? []).length === 0 &&
                      !(others[question.id] ?? "").trim()
                    }
                    className="btn-main btn-sm"
                  >
                    done
                  </button>
                )}
              </div>
            </div>
          )}

          {step === QUESTIONS.length && !done && (
            <div className="paper space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-semibold ink">one last thing — a tiny wish?</h2>
                <p className="ink-faint mt-1 text-[15px]">anything at all</p>
              </div>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                rows={4}
                placeholder="write it here… or leave it blank and I'll improvise"
                className="wish-box"
              />
              <div className="flex justify-between items-center">
                <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                  back
                </button>
                <button onClick={() => setStep((s) => s + 1)} className="btn-main btn-sm">
                  all done
                </button>
              </div>
            </div>
          )}

          {done && (
            <div className="paper text-center space-y-5">
              <h2 className="text-3xl font-semibold ink">thank you, love.</h2>
              <p className="text-[17px] ink-soft">
                Send this over and I&apos;ll take care of the rest.
                <br />
                See you Saturday.
              </p>
              <div className="letter text-left text-[14px] whitespace-pre-wrap">{summary}</div>
              <div className="flex flex-col gap-3 items-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-main">
                  send it to me
                </a>
                <button onClick={copy} className="btn-ghost">
                  {copied ? "copied ✓" : "or copy the text"}
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
  background-color: #FFF9F2;
  background-image: radial-gradient(#F5DDE5 1.5px, transparent 1.5px);
  background-size: 26px 26px;
}
.ink { color: ${INK}; }
.ink-soft { color: #7A6660; }
.ink-faint { color: #B39A94; }

.paper {
  background: #fff;
  border: 3px solid ${INK};
  border-radius: 1.5rem;
  padding: 2rem 1.6rem 1.75rem;
  box-shadow: 6px 6px 0 #F2B8C9;
}

.btn-main {
  display: inline-block;
  background: ${ROSE};
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  border: 3px solid ${INK};
  border-radius: 9999px;
  padding: 0.65rem 2rem;
  box-shadow: 3px 3px 0 ${INK};
  transition: transform 0.12s, box-shadow 0.12s;
}
.btn-main:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 ${INK}; }
.btn-main:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 ${INK}; }
.btn-main:disabled { opacity: 0.35; transform: none; box-shadow: 3px 3px 0 ${INK}; }
.btn-sm { font-size: 0.95rem; padding: 0.5rem 1.5rem; }
.btn-ghost { color: #B39A94; font-weight: 600; font-size: 0.95rem; transition: color 0.15s; }
.btn-ghost:hover { color: ${ROSE}; }

.opt {
  display: flex; align-items: center; gap: 0.75rem; text-align: left;
  font-size: 1.05rem; font-weight: 500; color: ${INK};
  background: #fff;
  border: 2.5px solid #EBD5DC;
  border-radius: 1rem;
  padding: 0.8rem 1.1rem;
  transition: border-color 0.12s, transform 0.12s, background 0.12s, box-shadow 0.12s;
}
.opt:hover { border-color: ${ROSE}; transform: translateY(-1px); box-shadow: 0 3px 0 #F5DDE5; }
.opt:active { transform: scale(0.98); }
.opt-dashed { border-style: dashed; font-weight: 400; }
.opt-on {
  border-color: ${INK};
  background: ${ROSE_SOFT};
  box-shadow: 3px 3px 0 #F2B8C9;
}
.check-in { animation: checkIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes checkIn { from { transform: scale(0) rotate(-20deg); } }

.wish-box {
  width: 100%;
  border: 2.5px solid #EBD5DC;
  border-radius: 1rem;
  background: #fff;
  padding: 1rem 1.1rem;
  font-size: 1.05rem;
  color: ${INK};
  outline: none;
  resize: none;
}
.wish-box:focus { border-color: ${ROSE}; }
.wish-box::placeholder { color: #CBB3AE; }

.letter {
  background: #FFF9F2;
  border: 2.5px dashed #E8C8D2;
  border-radius: 1rem;
  padding: 1.1rem 1.2rem;
  color: #7A6660;
  line-height: 1.7;
}

.card-in { animation: cardIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes cardIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } }

.k-bob { animation: bob 3s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(-5px); } }

.k-blink { transform-origin: center 47px; animation: blink 4.6s infinite; }
@keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 96%, 98% { transform: scaleY(0.08); } }

.k-tail { transform-origin: 96px 92px; animation: tail 3.4s ease-in-out infinite; }
@keyframes tail { 50% { transform: rotate(8deg); } }

.k-float-heart { animation: floatHeart 1.8s ease-in-out infinite; }
@keyframes floatHeart { 50% { transform: translateY(-4px); } }

.twinkle { animation: twinkle 3.2s ease-in-out infinite; }
@keyframes twinkle { 0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); } 50% { opacity: 1; transform: scale(1.25) rotate(12deg); } }
`;
