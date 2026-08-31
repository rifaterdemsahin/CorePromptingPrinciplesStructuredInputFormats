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

## 🌐 Interactive Application (`index.html`)

The interactive web application includes:
1. **🏛️ LLM Context Architecture**: Visual flow diagram illustrating how tokens traverse system prompts, data enclosures, attention mechanisms, and structured outputs.
2. **📝 Markdown Inputs & Outputs**: Deep dive into Markdown prompt structuring and live rendered output previews.
3. **📦 JSON & Structured Schemas**: Real-time JSON schema validator and constrained decoding explanations.
4. **⚖️ Decision Matrix**: Comparative evaluation across Token Overhead, Machine Parseability, Prompt Injection Defense, and UI UX.
5. **🧪 Live Context Sandbox**: Interactive playground with preset scenarios (Customer Sentiment, Meeting Action Items, Code Refactoring) and live token metrics.
6. **🎯 Hands-On Workshop**: Guided Interactive Builder (**DO**) & Certification Refactor Challenge (**APPLY**).

---

## 🚀 Getting Started & Verification

### Open Locally in Google Chrome
```bash
open -a "Google Chrome" index.html
```

### Live GitHub Pages Deployment
The repository is automatically deployed to GitHub Pages via GitHub Actions:
- **Live URL**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/)

