const AntigravityAgent = require('./lib/AntigravityAgent');
require('dotenv').config({ path: '.env.local' });
const https = require('https');
const { VertexAI } = require('@google-cloud/vertexai');

class ContentCreator extends AntigravityAgent {
  constructor() {
    super('Content Creator', 'Trends & Generation');
  }

  async runPipeline_Trends() {
    this.setStatus('Scanning Trends');
    this.log('Scanning Google Trends for "AI Coding"...');
    
    // MOCK IMPLEMENTATION (Replacing external API call for stability in this step)
    // In production, use 'google-trends-api'
    const trends = [
      "Cursor vs Windsurf",
      "Gemini 2.0 Flash Capabilities",
      "Vercel AI SDK Integration"
    ];
    
    this.log(`Identified ${trends.length} hot topics: ${trends.join(', ')}`);
    return trends[0]; // Return top trend
  }

  async runPipeline_Drafting() {
    this.setStatus('Drafting Article');
    const guide = await this.readGuide('gemini_flash.md');
    
    const topic = "Gemini 2.0 Flash: The New Speed King"; // Usually comes from Trends
    this.log(`Drafting content for topic: ${topic}`);

    try {
      const apiKey = process.env.GOOGLE_GEMINI_API;
      if (!apiKey) throw new Error("Missing GOOGLE_GEMINI_API");

      const prompt = `Write a short, punchy intro paragraph for a blog post about "${topic}" in the style of Gay Men's Field Guide (Tech-savvy, witty, 8-bit aesthetic).`;
      
      this.log('Calling Gemini 2.0 Flash-Exp...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
      
      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (content) {
        this.log(`✅ Draft Generated: "${content.substring(0, 50)}..."`);
        // Save draft logic would go here
      } else {
        throw new Error("No content returned from Gemini");
      }

    } catch (e) {
      this.log(`❌ Drafting Error: ${e.message}`, 'ERROR');
    }
  }

  async runPipeline_Images(tldrPromise) {
    this.setStatus('Generating Images');
    this.log('Waiting for content context...');
    // In a real pipeline, this would wait for the drafting result
    const promptContext = "A robotic banana verifying code"; 
    
    this.log(`Generating visual assets for: ${promptContext}`);

    try {
      const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
      const LOCATION = 'us-central1';
      
      const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
      const model = vertexAI.preview.getGenerativeModel({ model: 'imagegeneration@006' });

      // Image Generation (Imagen 3)
      // Note: This requires the Vertex AI User role in GCP
      // UNCOMMENT BELOW FOR PRODUCTION
      
      const response = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: promptContext }] }],
        generationConfig: { responseMimeType: 'image/png', responseCount: 1 }
      });
      
      
      this.log('✅ Image generation request sent (Real API Call).');
      
      // Handle response/save file logic would go here
      
    } catch (e) {
       this.log(`❌ Image Gen Error: ${e.message}`, 'ERROR');
    }

    this.setStatus('Idle');
  }
}

const agent = new ContentCreator();
agent.log('Agent Online. Triggering ALL pipelines...');

const runAll = async () => {
  try {
    const trend = await agent.runPipeline_Trends();
    await agent.runPipeline_Drafting(); // Note: Should ideally pass trend, but logic is mocked/hardcoded for demo
    await agent.runPipeline_Images();
  } catch (e) {
    agent.log(`Pipeline validation failed: ${e.message}`, 'ERROR');
  }
};

runAll();
setInterval(runAll, 4 * 60 * 60 * 1000);
