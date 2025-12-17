# Google Indexing API Guide

## Overview
The **Indexing API** allows us to notify Google when pages are added or removed. This allows for *extremely fast* indexing (often within minutes).

## Authentication
*   **Method**: Service Account (Must be "Owner" in GSC)
*   **Scopes**: `https://www.googleapis.com/auth/indexing`

## Usage (Node.js)

### 1. Publish / Update URL
```javascript
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/indexing']
});
const service = google.indexing({ version: 'v3', auth });

await service.urlNotifications.publish({
  requestBody: {
    url: 'https://gaymensfieldguide.com/blog/new-post',
    type: 'URL_UPDATED' // or URL_DELETED
  }
});
```

## Batching
The API supports batching up to 100 calls in a single HTTP request using `multipart/mixed`. This is critical for the "Bulk Indexing" pipeline.

## Rate Limits
*   Default: 200 requests per day (Publish)
*   We can request more via Cloud Console.
