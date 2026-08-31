# Core Prompting Principles & Structured Input Formats

> https://rifaterdemsahin.github.io/CorePromptingPrinciplesStructuredInputFormats/

> **AOU Certified AI Associate — Module 1.1 Workshop**

This repository establishes the foundation for effective interaction with AI Agents (such as Claude, Gemini, and GPT). In this course module, we cover the fundamental **"3 Cs" of prompting—Context, Clarity, and Constraints**, and demonstrate how structuring inputs using specific formats (Markdown, XML tags, and JSON) significantly improves output predictability and eliminates hallucination.

---

## 🎯 Course & Module Overview

Effective AI interaction requires treating prompts as software specifications rather than casual conversations. This module provides a standard starting template for any business prompt and demonstrates how defining a clear **Persona** and **Target Audience** dramatically shapes the quality and relevance of the model's output.

### The 3 Cs of Prompting
1. **Context**: Giving the model background information, reference data, the persona/role to adopt, and the intended target audience.
2. **Clarity**: Unambiguous, step-by-step instructions describing exactly what task needs to be performed.
3. **Constraints**: Guardrails, formatting rules, schemas (e.g., JSON schema), and edge-case handling (e.g., handling missing data).

---

## 🛠️ Key Concepts & Techniques Covered

### 1. Persona & Target Audience Definition
- **Persona / System Role**: Assigns domain expertise and tone (e.g., `Senior Project Manager`, `Lead Security Auditor`).
- **Target Audience**: Defines the reading level and presentation style required for stakeholders.

### 2. Structured Delimiters & Formats
- **Markdown Headers (`###`)**: Segments instructions into distinct logical sections (`### ROLE`, `### TASK`, `### CONSTRAINTS`).
- **XML Tag Delimiters (`<data>...</data>`)**: Encapsulates untrusted or dynamic user data within explicit boundaries, preventing prompt injection and confusion between instructions and data.
- **Strict Output Schemas (JSON / Tables)**: Enforces deterministic, parseable output structures.

### 3. Standard Business Prompt Template
```markdown
### ROLE
[Define persona, role, and domain expertise]

### TASK
[Clear, actionable description of the objective]

### INPUT DATA
<raw_input>
[Reference text, raw notes, or customer data]
</raw_input>

### CONSTRAINTS & OUTPUT FORMAT
- Output valid JSON matching: [{"task": string, "owner": string, "due": string|null}]
- If any required field is missing from the input, set value to null.
- Do not include explanatory text or conversational preamble.
```

---

## 🌐 Interactive Workshop Application (`index.html`)

This repository includes a standalone interactive workshop page ([`index.html`](index.html)) designed for hands-on practice:

### 1. Part 1: DO — Guided Interactive Builder
- **Workbench**: Live input fields to define Role/System Context, Primary Task, Input Data, and Output Constraints.
- **Real-Time Live Preview**: Instant generation of structured prompts formatted with Markdown headers and XML data tags.

### 2. Part 2: APPLY — Hands-On Refactor Challenge
- **Scenario**: Takes a vague, unstructured business prompt (e.g., *"Look at these customer reviews and tell me which ones are bad..."*).
- **Interactive Workspace**: A dedicated editor where students refactor the prompt into production-grade structured format.
- **Built-in Validator**: Evaluates the submission in real-time for:
  - Markdown structural headers (`### ROLE`, `### TASK`, `### CONSTRAINTS`)
  - XML data delimiters (`<reviews>...</reviews>`)
  - Explicit output format constraints (e.g., JSON specification)

---

## 🚀 Getting Started & Visual Verification

### Open Locally in Google Chrome
You can directly open the interactive workshop in Google Chrome:

```bash
open -a "Google Chrome" index.html
```

### GitHub Pages Deployment
A GitHub Actions workflow is included at [`.github/workflows/static.yml`](.github/workflows/static.yml) for automatic static deployment to GitHub Pages.
