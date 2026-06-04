# Voice-Agent (Prepwise fork)

This repository contains the Voice-Agent web application — a voice-first AI assistant and mock interview platform built with Next.js, Vapi, and Firebase.

If you want a short description: the app runs voice-based interviews and assistant conversations using Vapi (voice orchestration), Deepgram (STT), ElevenLabs (TTS) and large language models for dialogue and feedback.

---

## Quick overview

- Purpose: practice interviews with an AI interviewer and get AI-generated feedback.
- Main features: voice calls, real-time transcription, question generation, feedback scoring, conversation history.
- Tech: Next.js, Firebase (Auth + Firestore), Vapi, Deepgram, ElevenLabs, Google Gemini / LLMs.

---

## Run locally

1. Install dependencies:

```powershell
npm install
```

2. Create an `.env.local` file at the project root with the required environment variables (see next section).

3. Run development server:

```powershell
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Required environment variables

Set the following in `.env.local` (placeholders shown):

```
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
GOOGLE_GENERATIVE_AI_API_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Keep secrets out of the repo (use env vars or a secret manager).

---

## Notes & tips

- The project expects Vapi credentials to orchestrate voice sessions. Configure your Vapi workflow or inline assistant in `constants/index.ts`.
- Question generation and feedback use a generative AI (Gemini / similar) — ensure the API key is set and has quota.
- Firebase Admin credentials (service account) must be provided for server-side operations.

---

