const https = require('https');

const apiKey = 'AIzaSyBSFaSbDrf3QoEP-qJsWOmtW9PI6QUF_l4';
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

async function verify() {
  // 1. List Models
  console.log('--- Checking Available Models ---');
  const models = await new Promise((resolve, reject) => {
    https.get(`${baseUrl}/models?key=${apiKey}`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) resolve(JSON.parse(data));
        else reject(new Error(`List Models Failed: ${res.statusCode} ${data}`));
      });
    }).on('error', reject);
  });

  const allModelNames = models.models.map(m => m.name);
  const nanoModels = allModelNames.filter(n => n.toLowerCase().includes('nano'));
  const flashModels = allModelNames.filter(n => n.toLowerCase().includes('flash'));
  const bananaModels = allModelNames.filter(n => n.toLowerCase().includes('banana'));

  console.log(`Total Models Found: ${allModelNames.length}`);
  console.log('Nano Models:', nanoModels.length > 0 ? nanoModels : 'None found (Nano usually on-device only)');
  console.log('Flash Models (Optimization Alternative):', flashModels.length > 0 ? flashModels : 'None found');
  console.log('Banana Models (Just verifying):', bananaModels.length > 0 ? bananaModels : 'None found');

  // 2. Test Generation (Billing Check)
  // Use Flash if available, otherwise Pro, to test the pipe.
  const targetModel = flashModels[0] || 'models/gemini-1.5-flash'; 
  console.log(`\n--- Testing Generation with ${targetModel} ---`);
  
  const postData = JSON.stringify({
    contents: [{ parts: [{ text: "Explain 'nano banana' in 5 words." }] }]
  });

  const req = https.request(`${baseUrl}/${targetModel}:generateContent?key=${apiKey}`, {
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
        console.log('SUCCESS: Generation verified.');
        const response = JSON.parse(data);
        console.log('Output:', response.candidates?.[0]?.content?.parts?.[0]?.text?.trim());
        console.log('\nVERDICT: API is accepting requests. If typical quotas are exceeded, this would fail. Credits/Billing appears active for Project: gen-lang-client-0566947374');
      } else {
        console.error(`FAILURE: Generation Failed. Status: ${res.statusCode}`);
        console.error('Error:', data);
      }
    });
  });

  req.on('error', (e) => console.error('Request Error:', e));
  req.write(postData);
  req.end();
}

verify().catch(console.error);
