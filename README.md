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

## 🌐 Multi-Page Interactive Suite

This repository features two interconnected interactive web applications with a shared top navigation bar:

1. **🏛️ Module 1.1 Workshop & Context Guide ([`index.html`](index.html))**:
   - **LLM Context Architecture**: Visual pipeline for prompt ingestion, attention mechanisms, and structured parsing.
   - **Markdown & JSON Deep Dives**: How Markdown and JSON are utilized as inputs and outputs.
   - **Interactive Prompt Sandbox**: Live simulator with realistic LLM responses and token latency metrics.
   - **Hands-On Workshop (DO & APPLY)**: Real-time prompt assembly workbench and certification refactor challenge.

2. **⚖️ Good vs Bad Prompts: Side-by-Side Showcase ([`comparison.html`](comparison.html))**:
   - **Unstructured vs Structured Split View**: Direct side-by-side contrast of chaotic prompts vs production-grade structured prompts.
   - **Real Model Outputs**: Displays the flawed conversational output on the left versus deterministic typed JSON output on the right.
   - **5 Interactive Scenarios**: Customer Feedback Triage, Meeting Action Items, Security Code Vulnerability, Candidate Resume Screening, and Financial Earnings Parsing.
   - **Failure & Success Root-Cause Analysis**: Identifies exact failure reasons (conversational fluff, hallucinated missing dates, injection risk) and success factors (explicit XML boundaries, strict JSON schemas).

---

## 🚀 Getting Started & Verification

### Open Locally in Google Chrome
```bash
open -a "Google Chrome" index.html
open -a "Google Chrome" comparison.html
```

### Live GitHub Pages Deployments
- **Main Workbench**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/)
- **Good vs Bad Comparison**: [https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/comparison.html](https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/comparison.html)


