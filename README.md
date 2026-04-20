# NexAssist

**NexAssist** is a SaaS platform that lets you deploy a fully trained AI support agent on any website in minutes. You configure it through a dashboard, paste one script tag into your site, and your AI agent starts handling customer queries automatically — 24/7, no coding required on the client side.

---

## Features

- 🤖 **AI-Powered Replies** — Uses Google Gemini to generate accurate, on-brand responses based solely on your business knowledge
- 🧠 **Knowledge Base Training** — Add your FAQs, return policies, delivery timelines, and product details directly in the dashboard
- 📋 **One-Line Embed** — Copy a single `<script>` tag and paste it into any website to activate the widget
- 🔐 **Secure Auth** — Login powered by [Scalekit](https://scalekit.com) — enterprise-ready authentication out of the box
- 🗄️ **Persistent Settings** — Business configuration saved to MongoDB per user account
- ⚡ **Fast & Lightweight** — The chat widget is a pure JavaScript IIFE — no frameworks, no dependencies loaded on the client

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| AI | [Google Gemini](https://ai.google.dev) via `@google/genai` |
| Auth | [Scalekit](https://scalekit.com) |
| Database | [MongoDB](https://mongodb.com) via Mongoose |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Login / logout / callback routes
│   │   ├── chat/          # AI chat endpoint
│   │   ├── settings/      # Save & retrieve agent config
│   │   └── widget-config/ # Public config endpoint for the widget
│   ├── dashboard/         # Protected settings page
│   ├── embed/             # Embed instructions & preview
│   └── page.tsx           # Landing page
├── components/
│   ├── Home.tsx           # Landing page UI
│   ├── Dashboard.tsx      # Agent configuration form
│   ├── EmbedClient.tsx    # Embed snippet & live preview
│   ├── Features.tsx       # Features section
│   └── Footer.tsx         # Footer
├── lib/
│   ├── db.ts              # MongoDB connection helper
│   ├── getSession.ts      # Scalekit session validation
│   └── scalekit.ts        # Scalekit client
├── model/
│   └── settings-model.ts  # Mongoose settings schema
├── middleware.ts           # Route protection for /dashboard
└── types.ts               # Global TypeScript declarations

public/
└── chatbot.js             # Self-contained embeddable chat widget
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [Google AI Studio](https://aistudio.google.com) API key
- A [Scalekit](https://scalekit.com) account and environment

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nexassist.git
cd nexassist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
SCALEKIT_ENVIRONMENT_URL=https://your-env.scalekit.dev
SCALEKIT_CLIENT_ID=your_client_id
SCALEKIT_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/nexassist
GEMINI_API_KEY=your_gemini_api_key
```

> **Note:** For production (Vercel), set `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL and add all variables in the Vercel dashboard under **Settings → Environment Variables**.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

1. **Sign up / log in** using your email via Scalekit
2. **Configure your agent** in the Dashboard — enter your business name, support email, and knowledge base content
3. Go to **Install Agent** — copy the provided `<script>` tag
4. **Paste the snippet** before `</body>` on any website
5. The chat widget appears automatically — visitors can ask questions and receive AI-generated answers based on your knowledge base

---

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from your `.env` in the Vercel project settings
4. Deploy — Vercel will build and host the app automatically
5. Update `NEXT_PUBLIC_APP_URL` to your live Vercel URL (`https://your-app.vercel.app`)
6. Also update the **Redirect URI** in your Scalekit dashboard to point to your Vercel domain

---

## License

MIT License — free to use, modify, and deploy.
