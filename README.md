# Arcana University

A campus help network for college students. Ask a question, get an answer grounded in real
student and professor replies, and reach the professor who can actually help — pseudonymously.

Built for a 24-hour hackathon.

## What it does

- **Pseudonymous accounts.** Every account gets an Adjective + Noun name (e.g. *Strong Octopus*).
  You can shuffle or rename it any time. Your real identity is never shown to other students.
- **Arcana AI.** Ask a question in plain language. It detects the class, retrieves the most
  relevant threads, and answers by quoting real replies with citations — it does not invent
  answers. Low-confidence questions trigger a clarifying prompt with class options.
- **Forums.** Post questions by class, reply in Reddit-style nested threads, heart answers
  (one heart per person), and collapse sub-threads.
- **Professor directory.** Filter faculty by class or department, see who is online and how many
  students they have helped, and start a direct message.
- **Messaging.** Anonymous conversations with professors (and students, on the faculty side).
  Closing a conversation clears it from your inbox. Mark a professor as helpful to raise their
  reputation.
- **Settings.** Change your pseudonym, institution, or password.

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4
- No backend: accounts, sessions, conversations, and reputation persist in `localStorage`

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build     # production build to dist/
npm run preview   # preview the build
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Intro — enter, or sign in / create account |
| `/auth` | Sign in / create account |
| `/home` | Role-aware home: conversations and shortcuts |
| `/student` | Arcana AI chat |
| `/forum` | Forums — post, search, filter by class |
| `/thread/:id` | Thread view |
| `/professors` | Professor directory |
| `/messages/:kind/:id` | Conversation |
| `/settings` | Account settings |

## Demo notes

- Accounts are local to the browser. Clearing site data removes them.
- The class catalog covers ~160 Ohio State courses across 28 departments; other institutions
  have smaller catalogs.
- Seed forum content is fabricated for the demo. Anything you post or reply uses real timestamps
  and your current pseudonym.
- "Arcana AI" is a retrieval and extractive-summarization engine: TF-IDF-style ranking with
  synonym expansion, scored class detection, and citation-backed answers. It runs entirely
  offline and never calls an external model.

## Project layout

```
src/
  components/   shared UI (backdrop, back button, class picker, style tokens)
  context/      auth provider (accounts, sessions)
  data/         class catalog, professors, threads, conversations, AI engine
  hooks/        helped reputation, conversations, typewriter
  pages/        screens
  utils/        time formatting, class color coding
```
