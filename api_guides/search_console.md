# Google Search Console API Guide

## Overview
We use the **Google Search Console API** to:
1.  Submit sitemaps (`sitemaps.submit`)
2.  Inspect URLs (`urlInspection.index.inspect`)
3.  Monitor 404/500 errors

## Authentication
*   **Method**: Service Account or OAuth 2.0 (ADC)
*   **Scopes**: `https://www.googleapis.com/auth/webmasters`
*   **Library**: `googleapis` (Node.js) or `google-api-python-client` (Python)

## Key Endpoints

### 1. Submit Sitemap
**Target**: `https://gaymensfieldguide.com/sitemap.xml`
```javascript
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/webmasters']
});
const service = google.searchconsole('v1');

await service.sitemaps.submit({
  auth,
  siteUrl: 'https://gaymensfieldguide.com/',
  feedpath: 'https://gaymensfieldguide.com/sitemap.xml'
});
```

### 2. URL Inspection (Index Status)
Used to check if a specific page is on Google.
```javascript
const res = await service.urlInspection.index.inspect({
  auth,
  requestBody: {
    inspectionUrl: 'https://gaymensfieldguide.com/some-post',
    siteUrl: 'https://gaymensfieldguide.com/',
    languageCode: 'en-US'
  }
});
const isIndexed = res.data.inspectionResult.indexStatusResult.coverageState === 'INDEXED';
```

## Error Monitoring
We should poll `sites.urlCrawlErrorsSamples` (Legacy) or inspect URLs to find 404s.
