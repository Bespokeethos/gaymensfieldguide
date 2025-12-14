const https = require('https');
const fs = require('fs');

const apiKey = 'AIzaSyDe1Ab3TGIvRDaH5bmPKj5vg3yfHOMLuK0';
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

async function listModels() {
  console.log('--- Fetching Model List ---');
  https.get(`${baseUrl}/models?key=${apiKey}`, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        const modelNames = response.models.map(m => m.name);
        // Write full list to file
        fs.writeFileSync('model_dump.txt', modelNames.join('\n'));
        console.log(`Saved ${modelNames.length} models to model_dump.txt`);
      } else {
        console.error(`Failed: ${res.statusCode}`);
      }
    });
  }).on('error', console.error);
}

listModels();
