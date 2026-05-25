# 🌌 NEBULA // AI Model Arena & Comparison Hub

NEBULA is a clean, modern, and highly interactive dashboard designed to compare major AI models (such as OpenAI's GPT-5.5, Anthropic's Claude Sonnet/Opus, Google's Gemini 3.5 Flash, xAI's Grok 4.3, DeepSeek's V4-Pro, and Meta's Muse Spark).

It is built with **pure frontend technologies (Vanilla HTML, CSS, and JS)**, meaning it is extremely lightweight, requires zero dependencies or build setups, and can be run by simply opening a file or hosted for free on GitHub Pages!

---

## ✨ Features

- **Dynamic Model Overview**: View, search, and filter models by creator (OpenAI, Google, DeepSeek, xAI, Anthropic, Meta), performance tier, or features. Sort them by release date, cost, coding proficiency, reasoning capability, or latency.
- **Head-to-Head Arena**: Select any two models side-by-side to view their metrics. The application highlights comparison categories automatically and shows a **🏆 WINNER** badge for the superior model.
- **Interactive Cost Calculator**: Estimate monthly API costs using input/output volume sliders. The tool takes prompt caching discounts into account (e.g., DeepSeek's 98% discount, Anthropic's 90% discount) and lists models sorted by lowest monthly expenses.
- **Capabilities Leaderboard**: Toggle pillars (Coding, Reasoning, Creative Writing, Latency, Multimodal) to view leaderboard charts updated with smooth CSS width transitions.
- **Beginner Code Guide**: Includes a slide-out drawer showing how files connect and how data flows.
- **Sharing Tools**: Click buttons in the Arena and Calculator to instantly copy formatted text results to your clipboard to share with team members.

---

## 📁 File Structure

The project has a modular, beginner-friendly structure:

```text
├── index.html       # The webpage structure, layout grid, and tabs
├── style.css        # Visual styles, dual dark/light themes, and animations
├── models-data.js   # The structured "database" array storing all model specs
└── app.js           # Operational logic (filtering, calculations, theme switches)
```

### How the Data Flows:
1. `models-data.js` stores specs (prices, context sizes, ratings) in a clean array of objects.
2. `app.js` performs computations (calculates costs, compares ratings, filters search queries) and updates DOM elements.
3. `index.html` renders the results inside containers (like `<div id="models-grid">`).

