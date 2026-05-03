"use client";

import { useState } from "react";
import styles from "./page.module.css";

// ─── Data ────────────────────────────────────────────────────────────────────

const questions = [
  {
    block: "Value",
    question: "Your clients keep coming back because...",
    options: [
      { text: "You deliver reliably — on time, on brief, at a fair price.", score: 0 },
      { text: "You bring depth and expertise that's hard to find elsewhere.", score: 1 },
      { text: "You change how they think about the problem — not just how they solve it.", score: 2 },
    ],
  },
  {
    block: "Value",
    question: "Your pricing reflects...",
    options: [
      { text: "Your time — hours, days, or retainers tied to availability.", score: 0 },
      { text: "The scope of what you deliver, regardless of how long it takes.", score: 1 },
      { text: "The weight of your judgement — what the decision is worth, not the hours behind it.", score: 2 },
    ],
  },
  {
    block: "Replaceability",
    question: "If you stepped away tomorrow, your clients would...",
    options: [
      { text: "Find someone comparable within a week.", score: 0 },
      { text: "Notice the quality gap — but eventually adjust.", score: 1 },
      { text: "Struggle to describe what they'd even be looking for.", score: 2 },
    ],
  },
  {
    block: "Replaceability",
    question: "As AI reshapes how work gets done, your business...",
    options: [
      { text: "Is already feeling the pressure — AI handles most of it.", score: 0 },
      { text: "Loses some of the execution layer, but the thinking stays protected.", score: 1 },
      { text: "Becomes more valuable — AI eliminates the commodity, not what makes you distinct.", score: 2 },
    ],
  },
  {
    block: "Conviction",
    question: "When you look at how most people in your space operate...",
    options: [
      { text: "The approach is mostly sound — the challenge is doing it well.", score: 0 },
      { text: "It's competent but predictable — better approaches exist.", score: 1 },
      { text: "Something is fundamentally wrong — and most people don't see it.", score: 2 },
    ],
  },
  {
    block: "Conviction",
    question: "People hire you because...",
    options: [
      { text: "You're available and reliable when they need capacity.", score: 0 },
      { text: "You have a strong track record of delivering results.", score: 1 },
      { text: "You see things they can't see on their own.", score: 2 },
    ],
  },
  {
    block: "Economics",
    question: "The biggest constraint on your growth is...",
    options: [
      { text: "The number of hours in your day.", score: 0 },
      { text: "The number of engagements you can run in parallel.", score: 1 },
      { text: "That your most valuable thinking hasn't been turned into a scalable offer yet.", score: 2 },
    ],
  },
  {
    block: "Economics",
    question: "When it comes to disagreeing publicly with the most established voice in your space...",
    options: [
      { text: "You'd rather not — they've earned their reputation.", score: 0 },
      { text: "You disagree on specific points, not on the fundamentals.", score: 1 },
      { text: "You already do — and the disagreement is precise, not performative.", score: 2 },
    ],
  },
  {
    block: "Compound",
    question: "At the end of each year, your business...",
    options: [
      { text: "Resets — new clients, new pitches, same cycle.", score: 0 },
      { text: "Carries some momentum, but growth is mostly linear.", score: 1 },
      { text: "Compounds — reputation, IP, and positioning make each year stronger than the last.", score: 2 },
    ],
  },
  {
    block: "Compound",
    question: "If you could put one sentence in front of your entire industry...",
    options: [
      { text: '"Good work speaks for itself."', score: 0 },
      { text: '"There\'s a smarter way to do this."', score: 1 },
      { text: "Something precise enough to split the room in half.", score: 2 },
    ],
  },
];

const resultBuckets = [
  {
    min: 0,
    max: 0.25,
    title: "You're running a service — and you probably feel the ceiling.",
    body: "<p>Right now, your business is built on your capacity. Your time, your availability, your ability to deliver what's been briefed. There's nothing wrong with that — but it means your revenue has a hard limit, and AI is entering exactly this territory.</p><p>A Signature Business works differently. It's built on what you see that others don't — a perspective sharp enough to create its own demand. The shift starts with one question: do you have a conviction about your space that goes beyond doing good work? If that question pulls at something, it's worth sitting with.</p>",
  },
  {
    min: 0.25,
    max: 0.45,
    title: "There's expertise here — but the model still trades on time.",
    body: "<p>You're clearly more than a pair of hands. Clients value what you bring — the quality, the thinking, the reliability. But the business model underneath still looks like a service: revenue is tied to your hours, growth means more projects, and each year largely starts from scratch.</p><p>The gap between what you know and what your business captures is real. Closing that gap doesn't start with a new offer or a higher price — it starts with identifying what you see differently than everyone else in your space, and whether that's sharp enough to build around.</p>",
  },
  {
    min: 0.45,
    max: 0.65,
    title: "The expertise is strong. The conviction is forming.",
    body: "<p>Clients don't just buy your execution — they buy how you think. You see things others miss, and you have opinions about your space that go beyond conventional wisdom. That's rare, and it's the raw material for a Signature Business.</p><p>But raw material isn't a business yet. The question is whether your model reflects the distinction you actually bring — whether your pricing carries the weight of your judgement, whether your positioning makes your perspective visible, and whether what you've built compounds over time or resets every year. That's where the interesting work starts.</p>",
  },
  {
    min: 0.65,
    max: 0.85,
    title: "The signature is emerging — the business model may be lagging behind.",
    body: "<p>Something is already there. You hold convictions that create friction. You see your space in ways that most of your peers don't, and clients come to you for how you think, not just what you deliver. Those are signature elements — and they're not easy to develop.</p><p>The harder question is whether your business carries the weight of that distinction. Pricing that reflects judgement, not hours. Offers that compound rather than reset. Positioning that makes your perspective the reason people seek you out. If there's a gap between what you see and what your business captures — that's not a problem. That's the leverage point.</p>",
  },
  {
    min: 0.85,
    max: 1.01,
    title: "You're close — or already there.",
    body: "<p>Your answers describe a business that's built on distinction, not capacity. Pricing tied to judgement, convictions that create friction, a compound effect where each year makes the next one stronger. That's the architecture of a Signature Business.</p><p>The question at this stage isn't whether the signature exists — it's whether the model is fully built around it. Whether every part of the business — the offers, the positioning, the way demand is generated — reflects how you actually think. Most founders at this point sense there's another level. They're usually right.</p>",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ResultData {
  title: string;
  body: string;
  percentage: number;
}

type Screen = "intro" | "question" | "email" | "result";

// ─── Shared footer ───────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://savvy-foundation.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        savvy-foundation.com
      </a>
      {" · "}Strategic advisory · Building businesses from the Signature
    </footer>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);

  function computeResult(): ResultData {
    let totalScore = 0;
    answers.forEach((answerIndex, qIndex) => {
      if (answerIndex !== null) {
        totalScore += questions[qIndex].options[answerIndex].score;
      }
    });
    const maxScore = questions.length * 2;
    const percentage = totalScore / maxScore;
    let bucket = resultBuckets[resultBuckets.length - 1];
    for (const r of resultBuckets) {
      if (percentage >= r.min && percentage < r.max) {
        bucket = r;
        break;
      }
    }
    return { title: bucket.title, body: bucket.body, percentage };
  }

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = optionIndex;
      return updated;
    });
  }

  function goBack() {
    if (currentQuestion === 0) {
      setScreen("intro");
    } else {
      setCurrentQuestion((i) => i - 1);
    }
  }

  function goNext() {
    if (answers[currentQuestion] === null) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((i) => i + 1);
    } else {
      setScreen("email");
    }
  }

  async function submitEmail() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSending(true);

    const computed = computeResult();
    setResult(computed);

    try {
      await fetch("/api/send-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          resultTitle: computed.title,
          resultBody: computed.body,
          percentage: computed.percentage,
        }),
      });
    } catch {
      // Email failure doesn't block the result — show it anyway
    }

    setSending(false);
    setScreen("result");
  }

  function startQuiz() {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setEmail("");
    setEmailError("");
    setResult(null);
    setScreen("question");
  }

  // ─── Intro ──────────────────────────────────────────────────────────────────

  if (screen === "intro") {
    return (
      <main className={`${styles.page} ${styles.centeredPage}`}>
        <div className={styles.container}>
          <img src="/savvy-logo.png" alt="The SAVVY Foundation" className={styles.logo} />
          <div className={styles.label}>The Signature Diagnostic</div>
          <h1 className={styles.heroTitle}>
            Where does your
            <br />
            business stand?
          </h1>
          <div className={styles.introText}>
            <p>
              Every founder's business sits somewhere on a spectrum. On one end: a service —
              selling time, capacity, execution. On the other: a Signature Business — selling a
              perspective so distinct it's economically irreplaceable.
            </p>
            <p>
              Most businesses are somewhere in between. The interesting question isn't which end —
              it's how far along the shift has already happened, and where it stalls.
            </p>
            <p>10 questions. 3 minutes. An honest read of where you stand.</p>
          </div>
          <button className={styles.btn} onClick={startQuiz}>
            Begin
          </button>
          <Footer />
        </div>
      </main>
    );
  }

  // ─── Question ───────────────────────────────────────────────────────────────

  if (screen === "question") {
    const q = questions[currentQuestion];
    const prevBlock = currentQuestion > 0 ? questions[currentQuestion - 1].block : null;
    const showBlockLabel = q.block !== prevBlock;
    const isLast = currentQuestion === questions.length - 1;
    const progressPct = ((currentQuestion + 1) / questions.length) * 100;
    const selected = answers[currentQuestion];

    return (
      <main className={`${styles.page} ${styles.centeredPage}`} key={currentQuestion}>
        <div className={styles.container}>
          <div className={styles.progressBar}>
            <span className={styles.progressCount}>
              {String(currentQuestion + 1).padStart(2, "0")} /{" "}
              {String(questions.length).padStart(2, "0")}
            </span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {showBlockLabel && (
            <div className={`${styles.label} ${styles.labelAccent}`}>{q.block}</div>
          )}
          {!showBlockLabel && <div className={styles.labelSpacer} />}

          <h2 className={styles.questionText}>{q.question}</h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.option} ${selected === i ? styles.optionSelected : ""}`}
                onClick={() => selectOption(i)}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className={styles.nav}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={goBack}
              style={{ visibility: currentQuestion === 0 ? "hidden" : "visible" }}
            >
              ← Back
            </button>
            <button className={styles.btn} onClick={goNext} disabled={selected === null}>
              {isLast ? "See Result" : "Continue"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Email Capture ───────────────────────────────────────────────────────────

  if (screen === "email") {
    return (
      <main className={`${styles.page} ${styles.centeredPage}`}>
        <div className={styles.container}>
          <div className={styles.label}>Almost there</div>
          <h2 className={styles.emailTitle}>Enter your email to receive your result.</h2>
          <div className={styles.emailForm}>
            <input
              className={styles.emailInput}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitEmail();
              }}
              autoFocus
            />
            {emailError && <p className={styles.emailError}>{emailError}</p>}
            <button
              className={styles.btn}
              onClick={submitEmail}
              disabled={sending}
              style={{ width: "100%" }}
            >
              {sending ? "Sending…" : "Send my result"}
            </button>
            <p className={styles.privacyNote}>
              Your email is only used to send your personal result. No spam, no list.
            </p>
          </div>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => {
              const computed = computeResult();
              setResult(computed);
              setScreen("result");
            }}
            style={{ marginTop: "1.5rem" }}
          >
            Skip — just show me the result
          </button>
          <Footer />
        </div>
      </main>
    );
  }

  // ─── Result ─────────────────────────────────────────────────────────────────

  if (screen === "result" && result) {
    const markerLeft = `${result.percentage * 100}%`;

    return (
      <main className={`${styles.page} ${styles.centeredPage}`}>
        <div className={styles.container}>
          <img src="/savvy-logo.png" alt="The SAVVY Foundation" className={styles.logo} />
          <div className={styles.label}>Your result</div>

          <div className={styles.spectrumWrap}>
            <div className={styles.spectrumTrack}>
              <div className={styles.spectrumFill} style={{ width: `${result.percentage * 100}%` }} />
              <div className={styles.spectrumMarker} style={{ left: markerLeft }} />
            </div>
            <div className={styles.spectrumLabels}>
              <span
                className={`${styles.spectrumLabel} ${result.percentage < 0.4 ? styles.spectrumLabelActive : ""}`}
              >
                Service
              </span>
              <span
                className={`${styles.spectrumLabel} ${result.percentage >= 0.7 ? styles.spectrumLabelActive : ""}`}
              >
                Signature
              </span>
            </div>
          </div>

          <div className={styles.resultTitle}>{result.title}</div>
          <div
            className={styles.resultBody}
            dangerouslySetInnerHTML={{ __html: result.body }}
          />

          <div className={styles.resultCta}>
            <div className={styles.ctaLabel}>What&rsquo;s next</div>
            <div className={styles.resultCtaIntro}>Two ways to keep thinking.</div>
            <div className={styles.ctaLinks}>
              <a className={styles.ctaLink} href="#">
                The Whitepaper — Building a Signature Business in 2026
                <span>→</span>
              </a>
              <a className={styles.ctaLink} href="mailto:maria@savvy-foundation.com">
                A Working Session with Maria Meermeier
                <span>→</span>
              </a>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    );
  }

  return null;
}
