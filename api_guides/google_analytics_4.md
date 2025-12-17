# Google Analytics 4 (GA4) Data API Guide

## Overview
We use the **Google Analytics Data API (v1beta)** to fetch reporting data.
*   **Scopes**: `https://www.googleapis.com/auth/analytics.readonly`
*   **Library**: `@google-analytics/data`

## Usage

### 1. Authenticate & Create Client
```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient(); // Uses ADC
```

### 2. Run Report (Daily Digest)
Fetch active users and top pages for the last 24 hours.

```javascript
const [response] = await analyticsDataClient.runReport({
  property: `properties/${process.env.GA4_PROPERTY_ID}`,
  dateRanges: [
    {
      startDate: 'yesterday',
      endDate: 'today',
    },
  ],
  dimensions: [
    { name: 'pagePath' },
  ],
  metrics: [
    { name: 'activeUsers' },
    { name: 'screenPageViews' },
  ],
  limit: 10,
});

response.rows.forEach(row => {
  console.log(row.dimensionValues[0].value, row.metricValues[0].value);
});
```

## Key Metrics to Track
1.  `activeUsers`: Total unique visitors.
2.  `screenPageViews`: Total hits.
3.  `engagementRate`: Quality of traffic.
