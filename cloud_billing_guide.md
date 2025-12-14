# Google Cloud Billing Setup Guide

## Why This Matters
Without proper billing, you'll hit **free-tier rate limits** constantly. With billing enabled on Google Cloud credits, you get:
- **Higher QPM (queries per minute)** for Gemini API
- **No "free user" flags** in Antigravity or Gemini CLI
- Access to premium models (Gemini Pro, Flash, etc.)

---

## Quick Setup Steps

### Step 1: Verify Your Account
Run in PowerShell:
```powershell
gcloud auth list
```
Ensure your account (**onew100110@gmail.com** or **contact@bespokeethos.com**) is active.

### Step 2: Link Billing to Project
```powershell
# Check current billing status
gcloud billing projects describe bespokeethos-analytics-475007

# List available billing accounts
gcloud billing accounts list
```

If no billing is linked, go to: https://console.cloud.google.com/billing/linkedaccount?project=bespokeethos-analytics-475007

### Step 3: Enable Vertex AI API
```powershell
gcloud services enable aiplatform.googleapis.com --project=bespokeethos-analytics-475007
```

### Step 4: Set Up Application Default Credentials
This is what makes your local apps use your credentials:
```powershell
gcloud auth application-default login
```
Follow the browser prompt and authorize.

### Step 5: Verify Everything
```powershell
gcloud config list
# Should show: project = bespokeethos-analytics-475007

node verify_vertex_auth.js
# Should show: ✅ SUCCESS
```

---

## Authorized Users
| Email | Role |
|-------|------|
| onew100110@gmail.com | Admin |
| contact@bespokeethos.com | Admin |

---

## Troubleshooting Rate Limits

### "Free user" or "Quota exceeded" errors?
1. **Check billing is linked**: 
   ```powershell
   gcloud billing projects describe bespokeethos-analytics-475007
   ```
   If `billingAccountName` is empty, billing isn't linked.

2. **Set ADC (Application Default Credentials)**:
   ```powershell
   gcloud auth application-default login
   gcloud auth application-default set-quota-project bespokeethos-analytics-475007
   ```

3. **Verify API key is from billed project**: 
   Check your `.env.local` has `GOOGLE_GEMINI_API` from the bespokeethos project.

---

## API Key (Already Configured)

Your `.env` file now includes the new API key from `bespokeethos-analytics-475007`:

```
GOOGLE_GEMINI_API=AIzaSyBqviAMBV6GXcDBTfyrOIJ-cdNobcwBZLU
GOOGLE_CLOUD_PROJECT=bespokeethos-analytics-475007
```

This key is linked to your billed project, so you should no longer hit free-tier rate limits.

---

## Google Cloud Console Links
- [Billing Dashboard](https://console.cloud.google.com/billing?project=bespokeethos-analytics-475007)
- [Enable APIs](https://console.cloud.google.com/apis/library?project=bespokeethos-analytics-475007)
- [Vertex AI](https://console.cloud.google.com/vertex-ai?project=bespokeethos-analytics-475007)
- [IAM Permissions](https://console.cloud.google.com/iam-admin/iam?project=bespokeethos-analytics-475007)
