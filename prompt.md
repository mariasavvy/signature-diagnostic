
Read the files in this folder: questions.md contains the 11 questions, system-prompt.md contains the system prompt for the AI evaluation.

Build a Next.js app — a prototype for a diagnostic tool called "The Signature Diagnostic" by The SAVVY Foundation.

What it does: A guided questionnaire with 11 questions shown one at a time. The user types long-form answers (minimum 80 characters per answer). After all 11 questions, the answers are sent to the Claude API and the AI evaluation is displayed directly in the browser.

Flow:

1. Intro screen: Title "The Signature Diagnostic", subtitle "The SAVVY Foundation", a short intro paragraph, and a "Begin" button. The intro text should say: "Your signature can't be self-diagnosed. It gets uncovered in relationship — layer by layer, through questions you don't ask yourself. What this tool can do is something different — create the moment where you sense that something is there. Not find your signature, but surface the productive unrest that makes you want to look closer. 11 questions. About 15–20 minutes. No scores, no types, no quick fixes — just a mirror that's sharper than the one you usually look into."
    
2. Question screens: One question per screen. Show progress (01/11, 02/11 etc.) with a thin progress bar. Show the block name (Context, Expertise, Judgement, Conviction) when entering a new block. Each question has a large textarea. The "Continue" button is disabled until the answer has at least 80 characters. Show a subtle hint like "Take your time — at least X more characters". Back button to go to previous question.
    
3. Processing screen: After the last question, show "Analyzing your answers..." with a subtle animation. Send all answers to the Claude API using the system prompt from system-prompt.md. The API call happens client-side for this prototype.
    
4. Result screen: Display the AI response — a greeting, three hypotheses (each with a title and body), and a closing statement. At the bottom, a CTA box with two options: "Download the Whitepaper: Building a Signature Business in 2026" and "Book a free Working Session with Maria".
    

API Integration: Call the Claude API directly from the browser (client-side). The API key is stored in a .env.local file as NEXT_PUBLIC_ANTHROPIC_API_KEY. Use this fetch call:

const response = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, system: systemPrompt, messages: [{ role: "user", content: formattedAnswers }] }) });

Format the answers before sending them like this:

QUESTION 1 — CONTEXT: [question text] ANSWER: [user's answer]

QUESTION 2 — CONTEXT: [question text] ANSWER: [user's answer]

And so on for all 11 questions.

The system prompt instructs the AI to respond with a JSON object. Parse it and display the result.

Design: Dark theme, editorial feel. Use these fonts from Google Fonts: Playfair Display (serif) for headings, questions, greeting. DM Sans for body text, UI elements, buttons.

Colors: Background #0a0a0a. Card/input background #141414. Primary text #e8e4df. Secondary text #9a948c. Muted text #5a5650. Accent #c4a882 (warm gold, used sparingly for block labels and hypothesis numbers). Border #1e1e1e.

Style: Minimal, lots of negative space. No rounded corners (border-radius 2px max). Buttons with solid background, uppercase text, letter-spacing. Progress bar thin (1-2px), subtle. Transitions smooth, 0.3-0.5s ease. No emojis, no icons, no decorative elements.

Important: Create a .env.local.example file with NEXT_PUBLIC_ANTHROPIC_API_KEY=your-key-here. The app must work locally with npm run dev. Keep it simple — single page, no routing needed. No email integration for now. Handle API errors gracefully — show a message if the evaluation fails.