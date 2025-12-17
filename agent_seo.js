const AntigravityAgent = require('./lib/AntigravityAgent');
require('dotenv').config({ path: '.env.local' });

class SEOSpecialist extends AntigravityAgent {
  constructor() {
    super('SEO Specialist', 'Search Console & Indexing');
  }

  async runPipeline_Sitemap() {
    this.setStatus('Submitting Sitemap');
    const guide = await this.readGuide('search_console.md');
    this.log('Reading API Guide for Sitemap...');
    
    try {
      const { google } = require('googleapis');
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/webmasters']
      });
      const service = google.searchconsole({ version: 'v1', auth });
      
      this.log(`Submitting sitemap to GSC: ${process.env.SITEMAP_URL}`);
      await service.sitemaps.submit({
        siteUrl: process.env.SITE_URL,
        feedpath: process.env.SITEMAP_URL
      });
      
      this.log('✅ Sitemap submitted successfully!');
    } catch (e) {
      this.log(`❌ Failed to submit sitemap: ${e.message}`, 'ERROR');
    }
    
    this.setStatus('Idle');
  }

  async runPipeline_Indexing() {
    this.setStatus('Bulk Indexing');
    const guide = await this.readGuide('google_indexing.md');
    this.log('Initiating Bulk Indexing Protocol...');
    
    try {
      const { google } = require('googleapis');
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/indexing']
      });
      const service = google.indexing({ version: 'v3', auth });

      // In a real scenario, we would parse the sitemap or a DB to get these URLs
      // For this scaffold, we will target the main pages
      const pagesToIndex = [
        process.env.SITE_URL,
        `${process.env.SITE_URL}blog`,
        `${process.env.SITE_URL}products/cadence`
      ];

      this.log(`Targeting ${pagesToIndex.length} pages for immediate indexing...`);

      for (const url of pagesToIndex) {
        this.log(`Pinging Indexing API: ${url}`);
        await service.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED'
          }
        });
      }
      
      this.log('✅ Bulk Indexing Request Complete');
    } catch (e) {
      this.log(`❌ Indexing Error: ${e.message}`, 'ERROR');
    }
    
    this.setStatus('Idle');
  }
}

const agent = new SEOSpecialist();
agent.log('Agent Online. Triggering ALL pipelines...');

const runAll = async () => {
  try {
    await agent.runPipeline_Sitemap();
    await agent.runPipeline_Indexing();
  } catch (e) {
    agent.log(`Pipeline validation failed: ${e.message}`, 'ERROR');
  }
};

// Run immediately
runAll();

// Loop every 4 hours
setInterval(runAll, 4 * 60 * 60 * 1000);
