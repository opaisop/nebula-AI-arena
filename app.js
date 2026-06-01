/**
 * app.js
 * 
 * Core logic for the NEBULA AI Model Comparison Dashboard.
 * Handles client-side actions: tab switching, theme toggles, search & filter,
 * comparison arena calculations, interactive token pricing logic, 
 * capability charts, specs modal, and the beginner-friendly Developer Tour.
 */

// Global State
const state = {
  theme: 'dark', // 'dark' or 'light'
  activeTab: 'overview',
  searchQuery: '',
  filterProvider: 'all',
  filterTier: 'all',
  sortBy: 'default',
  compareBasket: [], // Holds ids of models selected for compare (max 2)
  calculator: {
    inputTokens: 10,  // Millions
    outputTokens: 5,  // Millions
    cacheHitRate: 40  // Percentage
  },
  radarMetric: 'coding', // Current leaderboard metric
  tourOpen: false,
  activePreset: null // Active recommendation preset filter
};

// ==========================================
// DOM Elements Selection
// ==========================================
const DOM = {
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  tourToggleBtn: document.getElementById('tour-toggle-btn'),
  closeTourBtn: document.getElementById('close-tour-btn'),
  developerTour: document.getElementById('developer-tour'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  
  // Overview DOM elements
  searchInput: document.getElementById('search-input'),
  filterProvider: document.getElementById('filter-provider'),
  filterTier: document.getElementById('filter-tier'),
  sortBy: document.getElementById('sort-by'),
  modelsGrid: document.getElementById('models-grid'),
  compareBasket: document.getElementById('compare-basket'),
  basketCountText: document.getElementById('basket-count-text'),
  clearBasketBtn: document.getElementById('clear-basket-btn'),
  triggerCompareBtn: document.getElementById('trigger-compare-btn'),
  compareCountBadge: document.getElementById('compare-count-badge'),

  // Compare Tab DOM elements
  compareSelectA: document.getElementById('compare-select-a'),
  compareSelectB: document.getElementById('compare-select-b'),
  compareResultsContainer: document.getElementById('compare-results-container'),
  navCompareBtn: document.getElementById('nav-compare-btn'),
  copyCompareBtn: document.getElementById('copy-compare-btn'),

  // Calculator DOM elements
  sliderInputTokens: document.getElementById('slider-input-tokens'),
  sliderOutputTokens: document.getElementById('slider-output-tokens'),
  sliderCacheRate: document.getElementById('slider-cache-rate'),
  labelInputTokens: document.getElementById('label-input-tokens'),
  labelOutputTokens: document.getElementById('label-output-tokens'),
  labelCacheRate: document.getElementById('label-cache-rate'),
  costEstimatesTbody: document.getElementById('cost-estimates-tbody'),
  copyCostsBtn: document.getElementById('copy-costs-btn'),

  // Radar/Leaderboard DOM elements
  radarMetricPills: document.getElementById('radar-metric-pills'),
  radarLeaderboardBars: document.getElementById('radar-leaderboard-bars'),
  specsTableTbody: document.getElementById('specs-table-tbody'),

  // Modal DOM elements
  detailsModal: document.getElementById('details-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalBodyContent: document.getElementById('modal-body-content')
};

// ==========================================
// Initialization & Entry Point
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  populateCompareDropdowns();
  
  // Initial renders
  filterAndRenderModels();
  calculateAndRenderCosts();
  renderLeaderboard();
  renderSpecsTable();
});

// Initialize Theme based on saved preference or system theme
function initTheme() {
  const savedTheme = localStorage.getItem('nebula-theme');
  if (savedTheme) {
    state.theme = savedTheme;
  } else {
    // Detect OS preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.theme = prefersDark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', state.theme);
}

// Populate the Compare dropdowns with options from models-data.js
function populateCompareDropdowns() {
  if (!window.AI_MODELS_DATA) return;

  // Clear existing options
  DOM.compareSelectA.innerHTML = '';
  DOM.compareSelectB.innerHTML = '';

  window.AI_MODELS_DATA.forEach((model, index) => {
    const optionA = document.createElement('option');
    optionA.value = model.id;
    optionA.textContent = `${model.name} (${model.provider})`;
    if (index === 0) optionA.selected = true; // Select first model by default

    const optionB = document.createElement('option');
    optionB.value = model.id;
    optionB.textContent = `${model.name} (${model.provider})`;
    // Select second model or third if available by default
    if (index === Math.min(1, window.AI_MODELS_DATA.length - 1)) optionB.selected = true;

    DOM.compareSelectA.appendChild(optionA);
    DOM.compareSelectB.appendChild(optionB);
  });

  renderComparisonTable();
}

// ==========================================
// Event Listeners Registration
// ==========================================
function setupEventListeners() {
  // Theme Toggle Button
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);

  // Tour Drawer controls
  DOM.tourToggleBtn.addEventListener('click', toggleTourDrawer);
  DOM.closeTourBtn.addEventListener('click', toggleTourDrawer);

  // Accordion inside Tour Drawer
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const panel = header.nextElementSibling;
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Tab switching logic
  DOM.tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetPanel = btn.getAttribute('data-target');
      switchTab(targetPanel);
    });
  });

  // Filters & Search logic (Overview)
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    state.activePreset = null;
    document.querySelectorAll('.recommendation-card').forEach(c => c.classList.remove('active'));
    filterAndRenderModels();
  });

  DOM.filterProvider.addEventListener('change', (e) => {
    state.filterProvider = e.target.value;
    state.activePreset = null;
    document.querySelectorAll('.recommendation-card').forEach(c => c.classList.remove('active'));
    filterAndRenderModels();
  });

  DOM.filterTier.addEventListener('change', (e) => {
    state.filterTier = e.target.value;
    state.activePreset = null;
    document.querySelectorAll('.recommendation-card').forEach(c => c.classList.remove('active'));
    filterAndRenderModels();
  });

  DOM.sortBy.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    state.activePreset = null;
    document.querySelectorAll('.recommendation-card').forEach(c => c.classList.remove('active'));
    filterAndRenderModels();
  });

  // Floating Basket Actions
  DOM.clearBasketBtn.addEventListener('click', clearCompareBasket);
  DOM.triggerCompareBtn.addEventListener('click', () => {
    if (state.compareBasket.length === 2) {
      // Sync dropdowns to the basket contents
      DOM.compareSelectA.value = state.compareBasket[0];
      DOM.compareSelectB.value = state.compareBasket[1];
      renderComparisonTable();
      switchTab('compare');
      clearCompareBasket();
    }
  });

  // Compare Selector changes
  DOM.compareSelectA.addEventListener('change', renderComparisonTable);
  DOM.compareSelectB.addEventListener('change', renderComparisonTable);

  // Sliders for Pricing Calculator
  DOM.sliderInputTokens.addEventListener('input', (e) => {
    state.calculator.inputTokens = parseFloat(e.target.value);
    DOM.labelInputTokens.textContent = `${state.calculator.inputTokens}M`;
    calculateAndRenderCosts();
  });

  DOM.sliderOutputTokens.addEventListener('input', (e) => {
    state.calculator.outputTokens = parseFloat(e.target.value);
    DOM.labelOutputTokens.textContent = `${state.calculator.outputTokens}M`;
    calculateAndRenderCosts();
  });

  DOM.sliderCacheRate.addEventListener('input', (e) => {
    state.calculator.cacheHitRate = parseInt(e.target.value);
    DOM.labelCacheRate.textContent = `${state.calculator.cacheHitRate}%`;
    calculateAndRenderCosts();
  });

  // Pills for Radar Metric
  DOM.radarMetricPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    
    // Remove active state from all pills
    DOM.radarMetricPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    
    state.radarMetric = pill.getAttribute('data-metric');
    renderLeaderboard();
  });

  // Modal dialog close events
  DOM.modalCloseBtn.addEventListener('click', closeModal);
  DOM.detailsModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailsModal) closeModal();
  });
  
  // Close drawer if clicking outside on desktop
  document.addEventListener('click', (e) => {
    if (state.tourOpen && !DOM.developerTour.contains(e.target) && !DOM.tourToggleBtn.contains(e.target)) {
      toggleTourDrawer();
    }
  });

  // Copy comparisons & costs listeners
  DOM.copyCompareBtn.addEventListener('click', copyComparisonToClipboard);
  DOM.copyCostsBtn.addEventListener('click', copyCostsToClipboard);

  // Preset scenario buttons inside calculator
  const presetButtons = document.querySelectorAll('.btn-preset');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all preset buttons
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const inputVal = parseFloat(btn.getAttribute('data-input'));
      const outputVal = parseFloat(btn.getAttribute('data-output'));
      const cacheVal = parseInt(btn.getAttribute('data-cache'));

      // Update state
      state.calculator.inputTokens = inputVal;
      state.calculator.outputTokens = outputVal;
      state.calculator.cacheHitRate = cacheVal;

      // Update UI elements
      DOM.sliderInputTokens.value = inputVal;
      DOM.labelInputTokens.textContent = `${inputVal}M`;

      DOM.sliderOutputTokens.value = outputVal;
      DOM.labelOutputTokens.textContent = `${outputVal}M`;

      DOM.sliderCacheRate.value = cacheVal;
      DOM.labelCacheRate.textContent = `${cacheVal}%`;

      // Recalculate
      calculateAndRenderCosts();
    });
  });

  // Recommendation shortcuts inside overview
  const recommendationCards = document.querySelectorAll('.recommendation-card');
  recommendationCards.forEach(card => {
    card.addEventListener('click', () => {
      const presetId = card.getAttribute('data-preset');
      
      // If clicking already active preset, clear it
      if (state.activePreset === presetId) {
        state.activePreset = null;
        card.classList.remove('active');
      } else {
        recommendationCards.forEach(c => c.classList.remove('active'));
        state.activePreset = presetId;
        card.classList.add('active');
      }

      // Reset dropdown filters to "all" to avoid conflicting filters
      DOM.filterProvider.value = 'all';
      DOM.filterTier.value = 'all';
      state.filterProvider = 'all';
      state.filterTier = 'all';
      
      filterAndRenderModels();
    });
  });
}

// ==========================================
// Theme & Tour Controls
// ==========================================
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('nebula-theme', state.theme);
}

function toggleTourDrawer() {
  state.tourOpen = !state.tourOpen;
  DOM.developerTour.classList.toggle('active', state.tourOpen);
  DOM.developerTour.classList.toggle('hidden', !state.tourOpen);
}

function switchTab(targetTab) {
  state.activeTab = targetTab;

  // Update tabs active state
  DOM.tabButtons.forEach(btn => {
    const matches = btn.getAttribute('data-target') === targetTab;
    btn.classList.toggle('active', matches);
  });

  // Update panels active state
  DOM.tabPanels.forEach(panel => {
    const matches = panel.getAttribute('id') === `panel-${targetTab}`;
    panel.classList.toggle('active', matches);
  });

  // Trigger animations for current panel
  if (targetTab === 'radar') {
    renderLeaderboard();
  }
}

// ==========================================
// Overview Dashboard Section Logic
// ==========================================
function filterAndRenderModels() {
  if (!window.AI_MODELS_DATA) return;

  let filtered = [...window.AI_MODELS_DATA];

  // 0. Active recommendation preset filter
  if (state.activePreset) {
    const presetMappings = {
      student: ['gemini-31-flash-lite'],
      startup: ['deepseek-v4-flash', 'gpt-55-instant'],
      coding: ['claude-sonnet-46', 'claude-opus-48'],
      budget: ['deepseek-v4-pro'],
      longcontext: ['gemini-35-flash', 'gemini-31-pro'],
      agentic: ['claude-sonnet-46']
    };
    const allowedIds = presetMappings[state.activePreset] || [];
    filtered = filtered.filter(model => allowedIds.includes(model.id));
  }

  // 1. Search Query filter
  if (state.searchQuery) {
    filtered = filtered.filter(model => 
      model.name.toLowerCase().includes(state.searchQuery) ||
      model.provider.toLowerCase().includes(state.searchQuery) ||
      model.tier.toLowerCase().includes(state.searchQuery) ||
      model.bestUseCases.some(uc => uc.toLowerCase().includes(state.searchQuery)) ||
      model.strengths.some(st => st.toLowerCase().includes(state.searchQuery))
    );
  }

  // 2. Provider dropdown filter
  if (state.filterProvider !== 'all') {
    filtered = filtered.filter(model => model.provider === state.filterProvider);
  }

  // 3. Tier dropdown filter
  if (state.filterTier !== 'all') {
    filtered = filtered.filter(model => model.tier === state.filterTier);
  }

  // 4. Sorting logic
  if (state.sortBy === 'coding') {
    filtered.sort((a, b) => b.ratings.coding.score - a.ratings.coding.score);
  } else if (state.sortBy === 'reasoning') {
    filtered.sort((a, b) => b.ratings.reasoning.score - a.ratings.reasoning.score);
  } else if (state.sortBy === 'speed') {
    filtered.sort((a, b) => b.ratings.speed.score - a.ratings.speed.score);
  } else if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => {
      // Sort by combined 1M token input/output standard price
      return (a.pricing.input + a.pricing.output) - (b.pricing.input + b.pricing.output);
    });
  } else {
    // Default sorting: sort by simulated index/release date placeholder
    // No special custom sorting
  }

  renderModelCards(filtered);
}

// Helper to construct tooltip HTML for confidence/subjectivity markers
function createTooltipHTML(ratingObj, title) {
  const isDebatable = ratingObj.isSubjective || ratingObj.confidence === 'Medium' || ratingObj.confidence === 'Low';
  const icon = isDebatable ? '⚠️' : 'ⓘ';
  const label = ratingObj.isSubjective ? 'Estimated/Subjective' : 'Ecosystem consensus';
  const classes = isDebatable ? 'tooltip-icon debatable-indicator' : 'tooltip-icon';
  return `
    <span class="tooltip-container">
      <span class="${classes}">${icon}</span>
      <span class="tooltip-text">
        <strong>${title} (${ratingObj.confidence} Confidence)</strong>
        <span style="display: block; font-size: 9px; color: var(--text-muted); margin-bottom: 4px; font-style: italic;">
          ${label}
        </span>
        ${ratingObj.note}
      </span>
    </span>
  `;
}

function renderModelCards(models) {
  DOM.modelsGrid.innerHTML = '';

  if (models.length === 0) {
    DOM.modelsGrid.innerHTML = `
      <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 40px;">
        <p style="color: var(--text-muted);">No models match your search or filter configuration. Try clearing filters!</p>
      </div>
    `;
    return;
  }

  models.forEach(model => {
    const isComparing = state.compareBasket.includes(model.id);

    // Create the card element
    const card = document.createElement('article');
    card.className = `model-card ${isComparing ? 'comparing' : ''}`;
    card.style.setProperty('--model-accent', model.badgeColor);

    // Calculate a primary score average to show as a main radial indicator or rating text
    const averageScore = ((model.ratings.coding.score + model.ratings.reasoning.score + model.ratings.multimodal.score) / 3).toFixed(1);

    card.innerHTML = `
      <div>
        <div class="card-header-row">
          <div class="card-title-block">
            <h3>${model.name}</h3>
            <div class="model-creator">${model.provider}</div>
          </div>
          <span class="card-badge" style="background-color: ${model.badgeColor}22; color: ${model.badgeColor}; border: 1px solid ${model.badgeColor}44;">
            ${model.tier}
          </span>
        </div>

        <div class="card-specs-row">
          <div class="spec-item">
            <span class="spec-title">Context</span>
            <span class="spec-value">${model.contextWindow}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Pricing (In/Out)</span>
            <span class="spec-value">$${model.pricing.input.toFixed(2)} / $${model.pricing.output.toFixed(2)}</span>
          </div>
        </div>

        <!-- Capability bar ratings inside cards -->
        <div class="card-ratings-panel">
          <div class="rating-bar-group">
            <div class="rating-labels">
              <span>Coding / Systems ${createTooltipHTML(model.ratings.coding, 'Coding')}</span>
              <span>${model.ratings.coding.score}/10</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${model.ratings.coding.score * 10}%"></div>
            </div>
          </div>

          <div class="rating-bar-group">
            <div class="rating-labels">
              <span>Logical Reasoning ${createTooltipHTML(model.ratings.reasoning, 'Reasoning')}</span>
              <span>${model.ratings.reasoning.score}/10</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${model.ratings.reasoning.score * 10}%"></div>
            </div>
          </div>
        </div>

        <!-- Use Cases list -->
        <div class="card-use-cases-box">
          <div class="use-case-label">Ideal For</div>
          <div class="use-case-tags">
            ${model.bestUseCases.map(uc => `<span class="use-case-tag">${uc}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="card-actions-row">
        <button class="btn btn-secondary btn-specs-view" data-id="${model.id}">View Details</button>
        <button class="btn btn-secondary btn-compare-select ${isComparing ? 'active' : ''}" data-id="${model.id}">
          ${isComparing ? 'Selected' : 'Compare'}
        </button>
      </div>
    `;

    // Hook events up for view details
    card.querySelector('.btn-specs-view').addEventListener('click', () => openModal(model.id));
    
    // Hook events up for comparing selector
    card.querySelector('.btn-compare-select').addEventListener('click', (e) => {
      toggleModelInBasket(model.id);
    });

    DOM.modelsGrid.appendChild(card);
  });
}

// ==========================================
// Floating Basket Comparison Logic
// ==========================================
function toggleModelInBasket(modelId) {
  const index = state.compareBasket.indexOf(modelId);
  if (index > -1) {
    state.compareBasket.splice(index, 1);
  } else {
    if (state.compareBasket.length >= 2) {
      // Remove first item to keep max of 2
      state.compareBasket.shift();
    }
    state.compareBasket.push(modelId);
  }

  // Refresh current view cards to update highlights
  filterAndRenderModels();
  updateCompareBasketUI();
}

function clearCompareBasket() {
  state.compareBasket = [];
  filterAndRenderModels();
  updateCompareBasketUI();
}

function updateCompareBasketUI() {
  const count = state.compareBasket.length;
  DOM.basketCountText.textContent = `${count} selected`;
  DOM.compareCountBadge.textContent = count;

  if (count > 0) {
    DOM.compareBasket.classList.add('active');
    DOM.compareBasket.classList.remove('hidden');
    DOM.compareCountBadge.classList.remove('hidden');
  } else {
    DOM.compareBasket.classList.remove('active');
    DOM.compareBasket.classList.add('hidden');
    DOM.compareCountBadge.classList.add('hidden');
  }

  // Configure trigger comparison button
  if (count === 2) {
    DOM.triggerCompareBtn.disabled = false;
    DOM.triggerCompareBtn.textContent = 'Arena Compare';
  } else {
    DOM.triggerCompareBtn.disabled = true;
    DOM.triggerCompareBtn.textContent = 'Select 2 Models';
  }
}

// ==========================================
// Head-to-Head Compare Logic
// ==========================================
function generateTradeoffCommentary(modelA, modelB) {
  // Check for specific interesting comparisons
  const pairKey = [modelA.id, modelB.id].sort().join('__');
  
  const specializedCommentaries = {
    'claude-opus-48__gpt-55-thinking': 
      "<strong>Ecosystem Tradeoff:</strong> Claude Opus 4.8 is built for complex, long-running multi-file agentic engineering workflows with its Effort Control and Dynamic Workflows. OpenAI's GPT-5.5 Thinking is optimized for linear, deep chain-of-thought mathematical derivation and logic verification. Opus 4.8 is preferred for software developers using Claude Code, while GPT-5.5 Thinking is unmatched in standalone algorithmic problems.",
      
    'deepseek-v4-pro__gpt-55-thinking':
      "<strong>Ecosystem Tradeoff:</strong> DeepSeek-V4-Pro represents a disruptive cost alternative, offering near-parity coding and logical reasoning at a 3x pricing discount ($1.74/$3.48 vs $5.00/$30.00). However, GPT-5.5 Thinking features a more mature API ecosystem, lower latency on standard outputs, and superior enterprise compliance structures.",
      
    'claude-sonnet-46__gemini-35-flash':
      "<strong>Ecosystem Tradeoff:</strong> Gemini 3.5 Flash is designed for speed and large context retrieval, boasting a 1M token window with native video/audio ingestion. Claude Sonnet 4.6 has a smaller 200K window and slower response speed, but it produces higher-quality code files and UI-to-code translations, making it the choice for software engineering loops.",
      
    'claude-sonnet-46__deepseek-v4-pro':
      "<strong>Ecosystem Tradeoff:</strong> Claude Sonnet 4.6 offers superior tools integration, UI translation, and clean styling output. DeepSeek-V4-Pro offers deeper multi-step reasoning steps and math capability, and is significantly cheaper, but has higher input latency and less stable API endpoints under heavy global load.",
      
    'gemini-35-flash__gpt-55-instant':
      "<strong>Ecosystem Tradeoff:</strong> Both are elite fast-tier models. GPT-5.5 Instant is slightly faster and cheaper for general short-prompt customer routing. Gemini 3.5 Flash is slightly more expensive but offers a much larger 1M context window and natively ingests raw video/audio inputs, making it far more capable for multimodal analytics.",
      
    'claude-opus-48__deepseek-v4-pro':
      "<strong>Ecosystem Tradeoff:</strong> Claude Opus 4.8 features rich prose styling, effort scaling parameters, and advanced multi-agent planning. DeepSeek-V4-Pro matches Opus closely in standard programming syntax but is available at a fraction of the cost. However, DeepSeek lacks Opus's nuanced reading comprehension and long-context formatting reliability.",

    'muse-spark__claude-sonnet-46':
      "<strong>Ecosystem Tradeoff:</strong> Meta's Muse Spark is a closed-source consumer flagship featuring friendly social tone and free chat integration on Meta's social platforms. Claude Sonnet 4.6 is a strict developer model, lacking consumer integrations but featuring elite API documentation, system controls, and programming accuracy."
  };

  if (specializedCommentaries[pairKey]) {
    return specializedCommentaries[pairKey];
  }

  // Fallback dynamic comparison
  const priceA = modelA.pricing.input + modelA.pricing.output;
  const priceB = modelB.pricing.input + modelB.pricing.output;
  
  let priceNote = "";
  if (Math.abs(priceA - priceB) > 0.1) {
    const cheaper = priceA < priceB ? modelA : modelB;
    const expensive = priceA < priceB ? modelB : modelA;
    const ratio = (priceB === 0 || priceA === 0) ? "infinite" : (cheaper === modelA ? priceB / priceA : priceA / priceB).toFixed(1);
    priceNote = `<strong>Cost:</strong> ${cheaper.name} is highly value-efficient, priced up to ${ratio}x cheaper than ${expensive.name}. `;
  } else {
    priceNote = `<strong>Cost:</strong> Both models have similar pricing structures. `;
  }

  let capabilityNote = "";
  const codingDiff = modelA.ratings.coding.score - modelB.ratings.coding.score;
  const reasoningDiff = modelA.ratings.reasoning.score - modelB.ratings.reasoning.score;
  
  if (Math.abs(codingDiff) > 0.5) {
    const stronger = codingDiff > 0 ? modelA : modelB;
    capabilityNote += `<strong>Capabilities:</strong> ${stronger.name} holds a noticeable edge in coding tasks. `;
  } else if (Math.abs(reasoningDiff) > 0.5) {
    const stronger = reasoningDiff > 0 ? modelA : modelB;
    capabilityNote += `<strong>Capabilities:</strong> ${stronger.name} outperforms in complex reasoning. `;
  } else {
    capabilityNote += `<strong>Capabilities:</strong> These models show near parity in raw benchmarks, with differences lying mainly in provider API ecosystems. `;
  }

  return `<strong>Dynamic Tradeoff Analysis:</strong><br>${priceNote}<br>${capabilityNote}`;
}

function renderComparisonTable() {
  const idA = DOM.compareSelectA.value;
  const idB = DOM.compareSelectB.value;

  const modelA = window.AI_MODELS_DATA.find(m => m.id === idA);
  const modelB = window.AI_MODELS_DATA.find(m => m.id === idB);

  if (!modelA || !modelB) return;

  // Determine winners for highlighting
  const winnerCoding = modelA.ratings.coding.score > modelB.ratings.coding.score ? 'A' : (modelB.ratings.coding.score > modelA.ratings.coding.score ? 'B' : 'Draw');
  const winnerReasoning = modelA.ratings.reasoning.score > modelB.ratings.reasoning.score ? 'A' : (modelB.ratings.reasoning.score > modelA.ratings.reasoning.score ? 'B' : 'Draw');
  const winnerSpeed = modelA.ratings.speed.score > modelB.ratings.speed.score ? 'A' : (modelB.ratings.speed.score > modelA.ratings.speed.score ? 'B' : 'Draw');
  const winnerMultimodal = modelA.ratings.multimodal.score > modelB.ratings.multimodal.score ? 'A' : (modelB.ratings.multimodal.score > modelA.ratings.multimodal.score ? 'B' : 'Draw');
  
  // Lowest price is winner
  const avgPriceA = (modelA.pricing.input + modelA.pricing.output) / 2;
  const avgPriceB = (modelB.pricing.input + modelB.pricing.output) / 2;
  const winnerPrice = avgPriceA < avgPriceB ? 'A' : (avgPriceB < avgPriceA ? 'B' : 'Draw');

  // Parse context sizes to numbers for checking winner
  const contextValA = parseInt(modelA.contextWindow) || 128;
  const contextValB = parseInt(modelB.contextWindow) || 128;
  const winnerContext = contextValA > contextValB ? 'A' : (contextValB > contextValA ? 'B' : 'Draw');

  DOM.compareResultsContainer.innerHTML = `
    <table class="h2h-table">
      <thead>
        <tr>
          <th style="width: 30%">Evaluation Vector</th>
          <th style="width: 35%; border-bottom: 2px solid ${modelA.badgeColor};" class="h2h-model-col-header">
            ${modelA.name} <span class="cost-creator">by ${modelA.provider}</span>
          </th>
          <th style="width: 35%; border-bottom: 2px solid ${modelB.badgeColor};" class="h2h-model-col-header">
            ${modelB.name} <span class="cost-creator">by ${modelB.provider}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="spec-title">Coding Score</td>
          <td class="${winnerCoding === 'A' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelA.ratings.coding.score} / 10</strong>
              ${createTooltipHTML(modelA.ratings.coding, modelA.name + ' Coding')}
            </div>
          </td>
          <td class="${winnerCoding === 'B' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelB.ratings.coding.score} / 10</strong>
              ${createTooltipHTML(modelB.ratings.coding, modelB.name + ' Coding')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Reasoning Score</td>
          <td class="${winnerReasoning === 'A' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelA.ratings.reasoning.score} / 10</strong>
              ${createTooltipHTML(modelA.ratings.reasoning, modelA.name + ' Reasoning')}
            </div>
          </td>
          <td class="${winnerReasoning === 'B' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelB.ratings.reasoning.score} / 10</strong>
              ${createTooltipHTML(modelB.ratings.reasoning, modelB.name + ' Reasoning')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Creative / Dialogue</td>
          <td class="${modelA.ratings.creative.score > modelB.ratings.creative.score ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelA.ratings.creative.score} / 10</strong>
              ${createTooltipHTML(modelA.ratings.creative, modelA.name + ' Creative')}
            </div>
          </td>
          <td class="${modelB.ratings.creative.score > modelA.ratings.creative.score ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelB.ratings.creative.score} / 10</strong>
              ${createTooltipHTML(modelB.ratings.creative, modelB.name + ' Creative')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Modality & Vision</td>
          <td class="${winnerMultimodal === 'A' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelA.ratings.multimodal.score} / 10</strong>
              ${createTooltipHTML(modelA.ratings.multimodal, modelA.name + ' Vision')}
            </div>
          </td>
          <td class="${winnerMultimodal === 'B' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelB.ratings.multimodal.score} / 10</strong>
              ${createTooltipHTML(modelB.ratings.multimodal, modelB.name + ' Vision')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Generation Speed</td>
          <td class="${winnerSpeed === 'A' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelA.ratings.speed.score} / 10</strong>
              ${createTooltipHTML(modelA.ratings.speed, modelA.name + ' Speed')}
            </div>
          </td>
          <td class="${winnerSpeed === 'B' ? 'winner-cell' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>${modelB.ratings.speed.score} / 10</strong>
              ${createTooltipHTML(modelB.ratings.speed, modelB.name + ' Speed')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Context Window</td>
          <td class="${winnerContext === 'A' ? 'winner-cell' : ''}">${modelA.contextWindow}</td>
          <td class="${winnerContext === 'B' ? 'winner-cell' : ''}">${modelB.contextWindow}</td>
        </tr>
        <tr>
          <td class="spec-title">Token API Pricing (1M)</td>
          <td class="${winnerPrice === 'A' ? 'winner-cell' : ''}">
            Input: $${modelA.pricing.input.toFixed(2)}<br>
            Output: $${modelA.pricing.output.toFixed(2)}
          </td>
          <td class="${winnerPrice === 'B' ? 'winner-cell' : ''}">
            Input: $${modelB.pricing.input.toFixed(2)}<br>
            Output: $${modelB.pricing.output.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td class="spec-title">Key Strengths</td>
          <td>
            <ul style="padding-left: 16px; font-size: 13px; line-height: 1.4;">
              ${modelA.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul style="padding-left: 16px; font-size: 13px; line-height: 1.4;">
              ${modelB.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <td class="spec-title">Key Weaknesses</td>
          <td>
            <ul style="padding-left: 16px; font-size: 13px; line-height: 1.4; color: var(--text-secondary);">
              ${modelA.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul style="padding-left: 16px; font-size: 13px; line-height: 1.4; color: var(--text-secondary);">
              ${modelB.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="h2h-commentary-box glass-panel" style="margin-top: 24px; padding: 20px; border-left: 4px solid var(--accent); background: var(--bg-secondary);">
      <h4 style="font-family: var(--font-heading); margin-bottom: 8px; font-size: 15px; display: flex; align-items: center; gap: 8px; color: var(--text-primary);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Ecosystem Tradeoff Commentary
      </h4>
      <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-secondary);">
        ${generateTradeoffCommentary(modelA, modelB)}
      </p>
    </div>
  `;
}

// ==========================================
// Cost Estimator Logic (Sliders Math)
// ==========================================
function calculateAndRenderCosts() {
  if (!window.AI_MODELS_DATA) return;

  const inputM = state.calculator.inputTokens;
  const outputM = state.calculator.outputTokens;
  const cacheHitPercentage = state.calculator.cacheHitRate;

  // Map and calculate monthly estimates for all models
  const calculatedList = window.AI_MODELS_DATA.map(model => {
    // Math: Cost per 1M cached vs standard input tokens
    const cacheHitRatio = cacheHitPercentage / 100;
    const cacheMissRatio = 1 - cacheHitRatio;

    const inputCost = inputM * (model.pricing.input * cacheMissRatio + model.pricing.cachedInput * cacheHitRatio);
    const outputCost = outputM * model.pricing.output;
    const totalCost = inputCost + outputCost;

    return {
      name: model.name,
      provider: model.provider,
      badgeColor: model.badgeColor,
      rawPrices: model.pricing,
      totalMonthlyCost: totalCost
    };
  });

  // Sort by lowest cost
  calculatedList.sort((a, b) => a.totalMonthlyCost - b.totalMonthlyCost);

  // Render Table
  DOM.costEstimatesTbody.innerHTML = '';

  calculatedList.forEach(item => {
    const tr = document.createElement('tr');
    
    // Highlight if cost is 0 (like Meta Muse Spark consumer free tier)
    const isFree = item.totalMonthlyCost === 0;
    const costText = isFree ? 'Free (Consumer Platform)' : `$${item.totalMonthlyCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    tr.innerHTML = `
      <td>
        <div class="cost-row-name" style="border-left: 3px solid ${item.badgeColor}; padding-left: 8px;">
          ${item.name}
        </div>
        <span class="cost-creator">by ${item.provider}</span>
      </td>
      <td>
        <span style="font-size: 11px; color: var(--text-secondary);">
          $${item.rawPrices.input.toFixed(2)} In / $${item.rawPrices.output.toFixed(2)} Out
        </span>
      </td>
      <td class="text-right">
        <span class="cost-calculated-val" style="color: ${isFree ? 'var(--success)' : 'inherit'};">
          ${costText}
        </span>
      </td>
    `;
    DOM.costEstimatesTbody.appendChild(tr);
  });
}

// ==========================================
// Capabilities Radar Leaderboard & Specs Logic
// ==========================================
function renderLeaderboard() {
  if (!window.AI_MODELS_DATA) return;

  const metric = state.radarMetric;
  
  // Copy data and sort descending by selected metric
  const sorted = [...window.AI_MODELS_DATA].sort((a, b) => b.ratings[metric].score - a.ratings[metric].score);

  DOM.radarLeaderboardBars.innerHTML = '';

  sorted.forEach(model => {
    const scoreVal = model.ratings[metric].score;
    const ratingObj = model.ratings[metric];
    
    const barRow = document.createElement('div');
    barRow.className = 'chart-bar-row';
    barRow.innerHTML = `
      <div class="chart-bar-labels">
        <div>
          <span>${model.name}</span>
          <span class="chart-bar-creator">&bull; ${model.provider}</span>
          ${createTooltipHTML(ratingObj, model.name + ' ' + metric.charAt(0).toUpperCase() + metric.slice(1))}
        </div>
        <span class="chart-bar-score" style="color: ${model.badgeColor}">${scoreVal}/10</span>
      </div>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="background: ${model.badgeColor}; width: 0%;"></div>
      </div>
    `;

    DOM.radarLeaderboardBars.appendChild(barRow);

    // Trigger animations for widths in timeout to allow transition rendering
    setTimeout(() => {
      const fill = barRow.querySelector('.chart-bar-fill');
      if (fill) fill.style.width = `${scoreVal * 10}%`;
    }, 50);
  });
}

function renderSpecsTable() {
  if (!window.AI_MODELS_DATA) return;

  DOM.specsTableTbody.innerHTML = '';

  window.AI_MODELS_DATA.forEach(model => {
    const tr = document.createElement('tr');
    
    // Determine access type
    let accessType = 'Public API';
    if (model.id === 'muse-spark') {
      accessType = 'Private API / Free Consumer';
    } else if (model.provider === 'DeepSeek' || model.provider === 'Meta') {
      accessType = 'Open Weights / Hosted API';
    }

    // Determine modality values
    let modality = 'Text & Vision';
    if (model.id === 'gemini-31-pro' || model.id === 'gemini-35-flash' || model.id === 'gpt-55-standard') {
      modality = 'Text, Vision, Audio & Video';
    } else if (model.id === 'gpt-55-thinking') {
      modality = 'Text & Vision (Input)';
    }

    tr.innerHTML = `
      <td class="specs-row-model" style="border-left: 3px solid ${model.badgeColor}; padding-left: 8px;">${model.name}</td>
      <td>${model.contextWindow}</td>
      <td>${modality}</td>
      <td><span class="card-badge" style="background-color: var(--bg-tertiary); color: var(--text-primary); font-size: 9px;">${accessType}</span></td>
    `;
    DOM.specsTableTbody.appendChild(tr);
  });
}

// ==========================================
// Modal Spec Details Logic
// ==========================================
function openModal(modelId) {
  const model = window.AI_MODELS_DATA.find(m => m.id === modelId);
  if (!model) return;

  DOM.modalBodyContent.innerHTML = `
    <div class="modal-body-wrapper">
      <h2 style="color: ${model.badgeColor};">${model.name}</h2>
      <div class="modal-meta">${model.provider} &bull; ${model.tier} Tier &bull; Released: ${model.releaseDate}</div>

      <div class="modal-info-grid">
        <div class="modal-info-item">
          <span class="spec-title">Context Size</span>
          <strong>${model.contextWindow}</strong>
        </div>
        <div class="modal-info-item">
          <span class="spec-title">Standard Input API</span>
          <strong>$${model.pricing.input.toFixed(2)} / 1M</strong>
        </div>
        <div class="modal-info-item">
          <span class="spec-title">Standard Output API</span>
          <strong>$${model.pricing.output.toFixed(2)} / 1M</strong>
        </div>
      </div>

      <div class="modal-detail-block">
        <h4>Model Core Strengths</h4>
        <ul class="modal-list strengths-list">
          ${model.strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-detail-block">
        <h4>Key Limitations</h4>
        <ul class="modal-list weaknesses-list">
          ${model.weaknesses.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-detail-block">
        <h4>Prime Use Cases</h4>
        <div class="use-case-tags" style="margin-top: 8px;">
          ${model.bestUseCases.map(uc => `<span class="use-case-tag" style="font-size: 12px; padding: 6px 12px;">${uc}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  DOM.detailsModal.classList.add('active');
  DOM.detailsModal.classList.remove('hidden');
}

function closeModal() {
  DOM.detailsModal.classList.remove('active');
  DOM.detailsModal.classList.add('hidden');
}

// Copy Head-to-Head Arena Comparison to Clipboard
function copyComparisonToClipboard() {
  const idA = DOM.compareSelectA.value;
  const idB = DOM.compareSelectB.value;

  const modelA = window.AI_MODELS_DATA.find(m => m.id === idA);
  const modelB = window.AI_MODELS_DATA.find(m => m.id === idB);

  if (!modelA || !modelB) return;

  const text = `=== NEBULA AI ARENA Head-to-Head Comparison ===
Date: ${new Date().toLocaleDateString()}
Primary Model: ${modelA.name} (${modelA.provider})
Challenger Model: ${modelB.name} (${modelB.provider})

--- Capabilities & Ratings ---
Coding Score: ${modelA.name}: ${modelA.ratings.coding.score}/10 | ${modelB.name}: ${modelB.ratings.coding.score}/10
Reasoning Score: ${modelA.name}: ${modelA.ratings.reasoning.score}/10 | ${modelB.name}: ${modelB.ratings.reasoning.score}/10
Creative Score: ${modelA.name}: ${modelA.ratings.creative.score}/10 | ${modelB.name}: ${modelB.ratings.creative.score}/10
Speed / Latency: ${modelA.name}: ${modelA.ratings.speed.score}/10 | ${modelB.name}: ${modelB.ratings.speed.score}/10
Multimodal: ${modelA.name}: ${modelA.ratings.multimodal.score}/10 | ${modelB.name}: ${modelB.ratings.multimodal.score}/10
Context Window: ${modelA.name}: ${modelA.contextWindow} | ${modelB.name}: ${modelB.contextWindow}

--- API Pricing per 1 Million Tokens ---
${modelA.name}: Input $${modelA.pricing.input.toFixed(2)} | Output $${modelA.pricing.output.toFixed(2)}
${modelB.name}: Input $${modelB.pricing.input.toFixed(2)} | Output $${modelB.pricing.output.toFixed(2)}

Generated using NEBULA comparison tool.
`;

  navigator.clipboard.writeText(text).then(() => {
    // Show a quick visual success state on the button
    const labelSpan = DOM.copyCompareBtn.querySelector('span');
    const originalText = labelSpan.textContent;
    labelSpan.textContent = 'Copied!';
    DOM.copyCompareBtn.style.backgroundColor = 'var(--success)';
    DOM.copyCompareBtn.style.borderColor = 'var(--success)';
    DOM.copyCompareBtn.style.color = '#fff';
    setTimeout(() => {
      labelSpan.textContent = originalText;
      DOM.copyCompareBtn.style.backgroundColor = '';
      DOM.copyCompareBtn.style.borderColor = '';
      DOM.copyCompareBtn.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy comparison data: ', err);
  });
}

// Copy Costs Breakdown estimates to Clipboard
function copyCostsToClipboard() {
  if (!window.AI_MODELS_DATA) return;

  const inputM = state.calculator.inputTokens;
  const outputM = state.calculator.outputTokens;
  const cacheHitPercentage = state.calculator.cacheHitRate;

  let text = `=== NEBULA AI Cost Calculator Breakdown ===
Simulated Monthly Volume:
- Input Volume: ${inputM} Million Tokens
- Output Volume: ${outputM} Million Tokens
- Cache Hit Ratio: ${cacheHitPercentage}%

Estimated Monthly Costs (sorted lowest to highest):
`;

  const calculatedList = window.AI_MODELS_DATA.map(model => {
    const cacheHitRatio = cacheHitPercentage / 100;
    const cacheMissRatio = 1 - cacheHitRatio;
    const inputCost = inputM * (model.pricing.input * cacheMissRatio + model.pricing.cachedInput * cacheHitRatio);
    const outputCost = outputM * model.pricing.output;
    const totalCost = inputCost + outputCost;

    return {
      name: model.name,
      provider: model.provider,
      totalMonthlyCost: totalCost
    };
  }).sort((a, b) => a.totalMonthlyCost - b.totalMonthlyCost);

  calculatedList.forEach((item, index) => {
    const costText = item.totalMonthlyCost === 0 ? 'Free' : `$${item.totalMonthlyCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    text += `${index + 1}. ${item.name} (${item.provider}): ${costText}/month\n`;
  });

  text += `\nGenerated using NEBULA AI Model Arena cost estimator.`;

  navigator.clipboard.writeText(text).then(() => {
    const labelSpan = DOM.copyCostsBtn.querySelector('span');
    const originalText = labelSpan.textContent;
    labelSpan.textContent = 'Copied!';
    DOM.copyCostsBtn.style.backgroundColor = 'var(--success)';
    DOM.copyCostsBtn.style.borderColor = 'var(--success)';
    DOM.copyCostsBtn.style.color = '#fff';
    setTimeout(() => {
      labelSpan.textContent = originalText;
      DOM.copyCostsBtn.style.backgroundColor = '';
      DOM.copyCostsBtn.style.borderColor = '';
      DOM.copyCostsBtn.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy cost calculations: ', err);
  });
}
