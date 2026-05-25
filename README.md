# 🌌 NEBULA // AI Model Arena & Comparison Hub

NEBULA is a clean, modern, and highly interactive dashboard designed to compare major AI models (such as OpenAI's GPT-4o/o3-mini, Anthropic's Claude Sonnet/Opus, Google's Gemini 3.5 Flash, xAI's Grok 4.3, DeepSeek's V4-Pro, and Meta's Muse Spark).

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

---

## 🚀 How to Run Locally

Since this project has no build step, you can run it in two ways:

### Option A: Double-Click (Simplest)
Just double-click on `index.html` to open it directly in Google Chrome, Firefox, Safari, or Microsoft Edge.

### Option B: Local Dev Server (Recommended)
Running a local server is a great habit for developers. If you have VS Code, install the **Live Server** extension, open the project folder, and click **Go Live** at the bottom right.
Alternatively, if you have Node.js installed, run:
```bash
npx serve .
```

---

## 📦 How to Publish to GitHub & Host for Free

Follow this step-by-step guide to upload your project to GitHub and publish it using **GitHub Pages** (which hosts your static site completely for free).

### Step 1: Initialize Git locally
If you haven't initialized Git in your folder yet, open your terminal (or Command Prompt) inside this project directory and run:
```bash
git init
git add .
git commit -m "Initial commit: Nebula AI Model Arena"
```

### Step 2: Create a new Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click the green **New** button (or **Create repository**).
3. Name your repository (e.g., `ai-model-comparison-arena`).
4. Keep the repository **Public** (required for free GitHub Pages hosting).
5. Do **NOT** initialize the repository with a README, `.gitignore`, or License (as you already have them in this folder).
6. Click **Create repository**.

### Step 3: Link and Push your local files
GitHub will show you a page with setup commands. Copy and run the following commands in your local terminal:
```bash
# Rename the default branch to 'main'
git branch -M main

# Link your local Git repository to GitHub (replace URL with your repository link)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code up to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab (gear icon at the top).
3. In the left-hand sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, change the Source dropdown to **Deploy from a branch**.
5. Under **Branch**, select `main` from the dropdown, choose `/ (root)`, and click **Save**.
6. Wait 1–2 minutes. Refresh the settings page, and GitHub will provide a link at the top:
   *👉 "Your site is live at: `https://your-username.github.io/your-repo-name/`"*

---

## 🔧 Updating the Model Data
To update model specs or add a new model (e.g. if new models launch):
1. Open `models-data.js`.
2. Duplicate one of the existing objects in the array.
3. Edit its specs, ratings, and pricing.
4. Save the file. The dashboard, dropdown comparison matrix, and calculator will update automatically!
