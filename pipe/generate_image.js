const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GOOGLE_GEMINI_API;
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
const model = 'models/gemini-2.5-flash-image-preview';
const historyFile = path.resolve(process.cwd(), 'image_history.json');
const imageDir = path.resolve(process.cwd(), 'public/images/blog');

async function generateImage(prompt) {
  if (!apiKey) {
    console.error('ERROR: GOOGLE_GEMINI_API not found in environment variables.');
    process.exit(1);
  }

  if (!prompt) {
    console.error('ERROR: Please provide a prompt as an argument.');
    process.exit(1);
  }

  console.log(`Generating image for prompt: "${prompt}"`);

  // 1. Generate the image URL
  const imageUrl = await new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(`${baseUrl}/${model}:generateContent?key=${apiKey}`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('API Response:');
          console.log(data);
          const response = JSON.parse(data);
          const url = response.candidates?.[0]?.content?.parts?.[0]?.text;
          if (url) {
            resolve(url);
          } else {
            reject(new Error('Image URL not found in response'));
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });

  console.log('Image URL received. Downloading...');

  // 2. Download the image
  const imageFileName = `${Date.now()}.png`;
  const imagePath = path.join(imageDir, imageFileName);
  
  await new Promise((resolve, reject) => {
    https.get(imageUrl, (res) => {
        const fileStream = fs.createWriteStream(imagePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Image downloaded and saved to ${imagePath}`);
            resolve();
        });
    }).on('error', (e) => {
        fs.unlink(imagePath); // Clean up the file
        reject(e);
    });
  });


  // 3. Update history
  let history = [];
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
  }
  history.unshift({
    prompt,
    fileName: imageFileName,
    path: `/images/blog/${imageFileName}`,
    date: new Date().toISOString(),
  });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  console.log('Image generation complete and history updated.');
  console.log(`\nTo use this image in your article, use the following markdown:`);
  console.log(`![${prompt}](/images/blog/${imageFileName})`);
}

const prompt = process.argv.slice(2).join(' ');
generateImage(prompt).catch((err) => {
  console.error(err);
  process.exit(1);
});
