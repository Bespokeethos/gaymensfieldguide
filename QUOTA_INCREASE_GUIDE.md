# Quota Increase Request Guide

## Quick Access Link
**Go directly here:** https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas?project=bespokeethos-analytics-475007

---

## How to Request Higher Quotas

### Step 1: View Current Quotas
On the quotas page, you'll see a table with:
- **Quota Name** (e.g., "Generate content requests per minute")
- **Limit** (current limit)
- **Usage** (how much you're using)

### Step 2: Select Quotas to Increase
1. Check the boxes next to the quotas you want to increase
2. Look for quotas like:
   - `Generate content requests per minute per project`
   - `Generate content requests per minute per user`
   - `Tokens per minute`

### Step 3: Click "Edit Quotas"
- Click the **"Edit Quotas"** button at the top of the table
- Or click the pencil icon next to each quota

### Step 4: Request Increase
- Enter your desired new limit (suggest 2x-10x current)
- Add justification: "Production application with paying customers"
- Submit the request

---

## Recommended Quota Increases

| Quota | Current | Request |
|-------|---------|---------|
| Requests per minute | 60 | 300+ |
| Tokens per minute | 1000 | 10000+ |
| Requests per day | 1500 | 10000+ |

---

## Alternative: Use Vertex AI API
Vertex AI often has higher default limits. Enable it:
```powershell
gcloud services enable aiplatform.googleapis.com --project=bespokeethos-analytics-475007
```
Already enabled for your project!

## Current Model Configuration
Your `antigravity.config.js` is now set to:
- **Nano Banana 3** → `gemini-2.5-pro` (best reasoning)
- **Fast** → `gemini-2.0-flash` (higher speed)
