# Core Prompting Principles & Structured Input Formats: Markdown & JSON in LLM Contexts

> **Live Application**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/)
>
> **AOU Certified AI Associate — Module 1.1 Workshop & Interactive Reference**

This repository establishes the foundation for effective interaction with AI Agents and Large Language Models (such as Claude, Gemini, and GPT). In this module and interactive application, we cover the fundamental **"3 Cs" of prompting—Context, Clarity, and Constraints**, and demonstrate how structuring inputs and outputs using **Markdown**, **XML delimiters**, and **JSON Schemas** dramatically improves model attention, eliminates hallucinations, and enables deterministic software integration.

---

## 🎯 Key Concepts: Markdown & JSON in LLM Contexts

### 1. Markdown in LLMs (`###`, `-`, `|`)
- **As Input (Prompt Architecture)**: Breaks complex system prompts into distinct semantic regions (`### ROLE`, `### TASK`, `### CONSTRAINTS`). Consumes minimal tokens while leveraging LLMs' strong pre-training familiarity with Markdown.
- **As Output (Human Interfaces)**: Powers rich UI rendering, formatted tables, code blocks with syntax highlighting, and checklists.

### 2. JSON in LLMs (`{}`, `[]`)
- **As Input (Few-Shot & Data Payloads)**: Ingests API payloads, structured objects, and few-shot input/output demonstration pairs.
- **As Output (Structured Outputs & Tool Calling)**: Enforces strict type schemas (strings, booleans, enums, arrays, nulls) for machine-to-machine integrations and function calling with constrained decoding.

### 3. XML Delimiters (`<tag>...</tag>`)
- **Boundary Isolation**: Encapsulates dynamic, untrusted customer data (e.g. emails, notes, transcripts) to protect against prompt injection and prevent instruction-data confusion.

### 4. The Production Hybrid Prompt Formula
```markdown
### ROLE & PERSONA
Senior Customer Intelligence Lead.

### INSTRUCTIONS
Extract sentiment, key issues, and churn risk from customer feedback.

### INPUT DATA
<customer_feedback>
I have been waiting 3 weeks for my shipment. Your support team ignored my last 2 emails.
</customer_feedback>

### OUTPUT FORMAT & CONSTRAINTS
Return ONLY a valid JSON object matching this schema:
{
  "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "urgency": "LOW" | "MEDIUM" | "HIGH",
  "key_issues": string[],
  "churn_risk": boolean,
  "recommended_action": string
}
```

---

## 🌐 Multi-Page Interactive Architecture

The platform separates **Student-Facing Training Modules** from **Instructor/Production Sub-Pages** via a clean top navigation bar with an **Admin & Production** dropdown:

### 🎓 Student Training Modules
1. **🏛️ Module 1.1 Workshop & Context Guide ([`index.html`](index.html))**:
   - **LLM Context Architecture**: Visual pipeline for prompt ingestion, attention mechanisms, and structured parsing.
   - **Markdown & JSON Deep Dives**: How Markdown and JSON are utilized as inputs and outputs.
   - **Interactive Prompt Sandbox**: Live simulator with realistic LLM responses and token latency metrics.
   - **Hands-On Workshop (DO & APPLY)**: Real-time prompt assembly workbench and certification refactor challenge.

2. **⚖️ Good vs Bad Prompts: Side-by-Side Showcase ([`comparison.html`](comparison.html))**:
   - **Unstructured vs Structured Split View**: Direct side-by-side contrast of chaotic prompts vs production-grade structured prompts.
   - **Real Model Outputs**: Displays flawed conversational text vs deterministic typed JSON.
   - **5 Interactive Scenarios**: Competitive Analysis, Meeting Action Items, Security Code Vulnerability, Candidate Resume Screening, and Financial Earnings Parsing.

3. **🔒 Input & Output Constraints Showcase ([`constraints.html`](constraints.html))**:
   - **Constraints Set vs. Unset Comparison**: Side-by-side contrast of prompts and outputs with input and output constraints activated vs. unconstrained.
   - **4 Production Domains**: E-Commerce Order Parsing, Medical Health Metric Parser, PII & GDPR Masking Filter, and SQL Safe Query Generator.

4. **🧩 Prompt Refactor Game & Puzzle ([`exercise.html`](exercise.html))**:
   - **Role, Context, Task & Constraint (RCTC) Framework**: Visual LEGO-style block puzzle following the 5-layer framework (`### ROLE`, `### CONTEXT`, `### TASK`, `<xml_boundary>`, `### CONSTRAINTS`).
   - **XML Boundary Isolation**: Isolates dynamic inputs inside `<customer_review>`, `<meeting_notes>`, `<code_snippet>` tags.
   - **3 Progressive Levels**: Real-time validation, score tracking, and confetti completion celebration.

---

### ⚙️ Admin & Production Sub-Pages (Instructor Menu)
5. **📹 Video Recording Guide ([`recording-guide.html`](recording-guide.html))**:
   - **6-Pillar SOP**: Standard operating procedures for screen capture, audio engineering, cursor movements, OBS settings, scene flow, and post-production.

6. **🎬 Video 1.1 Production Shot List ([`shotlist.html`](shotlist.html))**:
   - **Scene-by-Scene Timetable**: 4 recording shots with synchronized voiceover script and screen cursor directives.
   - **Teleprompter Mode**: Oversized, high-contrast presenter mode for recording.

7. **🎙️ Video 1.1 Shotlist Recording Studio ([`recording-studio.html`](recording-studio.html))**:
   - **In-Browser Screen & Audio Video Recorder**: WebRTC `MediaRecorder` suite supporting 1080p/4K 60FPS recording.
   - **Live Audio VU Meter**: Real-time microphone levels with dB visualizer.
   - **Synchronized Karaoke Teleprompter**: Auto-scrolling voiceover script with sentence highlighter sync'd to shot durations.
   - **Take Manager & Production Vault**: Track takes, mark favorite/best take (⭐), review instant replays, and download `.webm` / export `takes-manifest.json`.

---

## 🛠️ CLI Automation & Production Helper

A Python automation assistant [`record_shotlist.py`](record_shotlist.py) is included for recording orchestration:
```bash
# Start local studio server and open in Google Chrome
python3 record_shotlist.py --serve

# Open a specific shot page (1-4) in Google Chrome
python3 record_shotlist.py --shot 1

# Print continuous voiceover teleprompter script to terminal
python3 record_shotlist.py --teleprompter

# Check and validate all project files
python3 record_shotlist.py --check
```

---

## 🚀 Getting Started & Verification

### Open Locally in Google Chrome
```bash
open -a "Google Chrome" index.html
open -a "Google Chrome" comparison.html
open -a "Google Chrome" constraints.html
open -a "Google Chrome" exercise.html
open -a "Google Chrome" recording-guide.html
open -a "Google Chrome" shotlist.html
open -a "Google Chrome" recording-studio.html
```

### Live GitHub Pages Deployments
- **Main Workbench**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/)
- **Good vs Bad Comparison**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/comparison.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/comparison.html)
- **Input & Output Constraints**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/constraints.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/constraints.html)
- **Prompt Refactor Game**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/exercise.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/exercise.html)
- **Recording Guide (Admin)**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/recording-guide.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/recording-guide.html)
- **Video 1.1 Shot List (Admin)**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/shotlist.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/shotlist.html)
- **Recording Studio (Admin)**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/recording-studio.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/recording-studio.html)





