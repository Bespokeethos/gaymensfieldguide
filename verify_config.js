const https = require('https');
const config = require('./antigravity.config.js');

// Load environment to verify checks
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GOOGLE_GEMINI_API;
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

async function testModel(label, modelName) {
  console.log(`\n--- Testing ${label}: ${modelName} ---`);
  
  if (!modelName) {
    console.error(`ERROR: No model name found for ${label}`);
    return;
  }

  const postData = JSON.stringify({
    contents: [{ parts: [{ text: "Test. one word." }] }]
  });

  return new Promise((resolve, reject) => {
    const req = https.request(`${baseUrl}/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          const output = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          console.log(`✅ SUCCESS [${label}]: Response received.`);
          console.log(`   Output: "${output}"`);
          resolve(true);
        } else {
          console.error(`❌ FAILURE [${label}]: Status ${res.statusCode}`);
          console.error(`   Error: ${data}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`❌ ERROR [${label}]: ${e.message}`);
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

async function verifyAll() {
  console.log('--- Verifying Antigravity Configuration ---');
  console.log(`Project: ${config.project_id}`);
  console.log(`Main Model: ${config.models.main}`);
  console.log(`Fast Model: ${config.models.fast}`);
  
  const mainSuccess = await testModel('MAIN (Gemini 3 Pro)', config.models.main);
  const fastSuccess = await testModel('FAST (Nano Banana)', config.models.fast);
  
  if (mainSuccess && fastSuccess) {
    console.log('\n✨ ANTIGRAVITY SYSTEMS NOMINAL. BOTH MODELS AUTOLAUNCH READY. ✨');
  } else {
    console.log('\n⚠️ SOME SYSTEMS FAILED.');
  }
}

verifyAll();
