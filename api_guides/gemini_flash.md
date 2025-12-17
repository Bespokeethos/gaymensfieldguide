# Gemini API Guide (Content Generation)

## Overview
We use **Gemini 2.0 Flash (Experimental)** for high-speed, low-cost content generation. 
*   **Model**: `models/gemini-2.0-flash-exp`
*   **Key**: `GOOGLE_GEMINI_API` (Env Var)
*   **Library**: `googleapis` or direct REST/`fetch` (Preferred for simple generation)

## Usage

### 1. Generate Content (Text)
```javascript
const apiKey = process.env.GOOGLE_GEMINI_API;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: "Write a blog post about..." }]
    }]
  })
});
const data = await response.json();
const text = data.candidates[0].content.parts[0].text;
```

### 2. System Instructions
You can pass a system instruction to define the persona (e.g., "You are an expert editor for GMFG...").

### 3. JSON Mode (Structured Output)
For pipelines like "Trends Analysis" where we need JSON back:
```javascript
  // ... inside body ...
  generationConfig: {
    responseMimeType: "application/json"
  }
```
