const https = require('https');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Centralized Config for "The Voice"
const API_KEY = process.env.GOOGLE_GEMINI_API; // Reusing verified key if applicable, or fallback to ADC
const PROJECT_ID = "gen-lang-client-0566947374"; // Hard-linked for stability

class AntigravityTTS {
  constructor() {
    this.endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
    console.log("🤪 Antigravity Voice Module Initialized: Ready to Speak!");
  }

  async speak(text, outputFile = 'output.mp3') {
    const payload = JSON.stringify({
      input: { text: text },
      voice: { languageCode: 'en-US', name: 'en-US-Journey-F' }, // "Journey" voice for Journeymen
      audioConfig: { audioEncoding: 'MP3' }
    });

    return new Promise((resolve, reject) => {
      const req = https.request(this.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length
        }
      }, (res) => {
        let data = [];
        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
             if (res.statusCode === 200) {
                const buffer = Buffer.concat(data);
                const response = JSON.parse(buffer.toString());
                if (response.audioContent) {
                    fs.writeFileSync(outputFile, response.audioContent, 'base64');
                    console.log(`🍌 Audio Saved: ${outputFile}`);
                    resolve(outputFile);
                } else {
                    reject(new Error("No audio content received"));
                }
             } else {
                 reject(new Error(`TTS Failed: ${res.statusCode}`));
             }
        });
      });
      
      req.on('error', (e) => reject(e));
      req.write(payload);
      req.end();
    });
  }
}

module.exports = new AntigravityTTS();
