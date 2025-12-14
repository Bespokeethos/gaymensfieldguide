/**
 * Vertex AI Imagen Image Generator
 * Uses Google Cloud Credits - NOT Gemini quota
 * 
 * Requires: GOOGLE_APPLICATION_CREDENTIALS or gcloud auth
 */

const { VertexAI } = require('@google-cloud/vertexai');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'your-project-id';
const LOCATION = 'us-central1';

async function generateImage(prompt, outputPath) {
  const vertexAI = new VertexAI({
    project: PROJECT_ID,
    location: LOCATION,
  });

  const model = vertexAI.preview.getGenerativeModel({
    model: 'imagegeneration@006', // Imagen 3
  });

  console.log(`🎨 Generating: ${prompt.substring(0, 50)}...`);

  try {
    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: 'image/png',
        responseCount: 1,
      }
    });

    const imageData = response.response.candidates[0].content.parts[0].inlineData.data;
    
    const fs = require('fs');
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✅ Saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Nano Banana prompts from the article
const PROMPTS = {
  'hallucination-city': `Stylized isometric city map of 'AI Verification City'.
Dark industrial paper texture background.
Neon yellow and grey lines.
Districts: 'Safety Board' (cracking glass tower), 'Certification Center' (red tape maze).
Technical overlay: 'CONFLICT_DETECTED', 'CERT_PENDING'.
Cyberpunk bureaucracy, schematic, instructional.`,
  'credential-badges': `Three holographic digital badges on dark textured background.
1. Shield icon, blue glow, text 'CAITP'
2. Checklist icon, green glow, text 'ISTQB'
3. Banana icon, yellow neon, text 'VIBE_VERIFIED'
Glitch effects, technical wiring connecting them.
High-tech military patch meets crypto token aesthetic.`,
  'moe-timeline': `A vertical timeline titled 'MIXTURE OF EXPERTS'.
Style: Retro 90s terminal interface, green phosphor on black.
Entries: '1991: Jacobs & Hinton' (floppy disk icon), '2017: Transformer' (prism), '2025: Garlic' (glowing banana).
Circuit board trace connections.
Technical overlay: grid lines, coordinate markers.`
};

async function main() {
  const fs = require('fs');
  const outputDir = './public/images/blog';
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [name, prompt] of Object.entries(PROMPTS)) {
    await generateImage(prompt, `${outputDir}/${name}.png`);
  }
}

main().catch(console.error);
