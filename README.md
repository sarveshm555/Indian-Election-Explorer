# 🗳️ Indian Election Explorer

> An AI-powered interactive web app to learn about the world's largest democratic exercise.

[![Build Status](https://img.shields.io/github/actions/workflow/status/sarveshm555/Indian-Election-Explorer/main.yml?branch=main)](https://github.com/sarveshm555/Indian-Election-Explorer/actions)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **Live App:** [https://indian-election-assistant-843157378295.asia-south1.run.app](https://indian-election-assistant-843157378295.asia-south1.run.app)

Built for **PromptWars** using Google Antigravity + Gemini 2.5 Flash AI
Deployed on **Google Cloud Run** (asia-south1 - Mumbai)

---

## ✨ Features

- 🗓️ **Election Process Timeline** — Interactive vertical journey with keyboard support and ARIA expansion.
- 🃏 **Key Terms Flashcards** — Flip cards with screen-reader friendly content.
- 📊 **Process Data Charts** — Accessible Recharts visualization with tooltips.
- 🧠 **Knowledge Quiz** — Gamified testing with streaks, confetti, and immediate feedback.
- 🤖 **Election AI Assistant** — Context-aware chatbot with rate limiting and input sanitization.

---

## 🏗️ Architecture

The app is built with a focus on **AI-Native Development** and **Maintainability**:

- **Custom Hooks**: logic for Gemini API (`useChatbot`) and data management (`useElectionData`) is decoupled from UI.
- **Code Splitting**: Used `React.lazy` and `Suspense` for optimized initial load times.
- **Error Boundaries**: Graceful handling of component crashes.
- **State Management**: React Context/Hooks for lightweight state.

---

## 🔒 Security & Quality

- **Input Sanitization**: All chatbot inputs are stripped of HTML and length-limited (500 chars).
- **Rate Limiting**: Throttling implemented for Gemini API calls to prevent abuse.
- **Content Security Policy (CSP)**: Strict headers to prevent XSS and data injection.
- **JSDoc & PropTypes**: Comprehensive documentation and type checking across all components.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Semantic HTML**: Proper use of `<main>`, `<nav>`, `<header>`, `<article>`, etc.
- **ARIA Labels**: Descriptive labels for all interactive elements.
- **Keyboard Navigation**: Full support for Tab/Enter/Space navigation.
- **Skip Link**: "Skip to Content" for keyboard and screen reader users.

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for high confidence.

```bash
npm test
```

- `App.test.jsx`: Routing and navigation verification.
- `Quiz.test.jsx`: Scoring, streak, and feedback logic.
- `Chatbot.test.jsx`: Interaction and API hook integration.
- `Flashcards.test.jsx`: Visual state toggles.
- `Timeline.test.jsx`: Expansion and accessibility states.

---

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/sarveshm555/Indian-Election-Explorer.git
cd Indian-Election-Explorer
npm install
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
npm run dev
```

---

## 🏆 Built For
PromptWars Challenge 2 — Build with AI 2026
Developer: @sarveshm555

#BuildwithVibe #BuildwithAI #PromptWars #GoogleAntigravity #IndianElections
