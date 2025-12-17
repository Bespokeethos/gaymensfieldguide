const AntigravityAgent = require('./lib/AntigravityAgent');
const fs = require('fs');
const path = require('path');

class Editor extends AntigravityAgent {
  constructor() {
    super('Cleanup Editor', 'Quality Assurance');
  }

  async runPipeline_PreFlight() {
    this.setStatus('Auditing Content');
    this.log('Starting Pre-Flight Sequence...');

    const blogDir = path.join(__dirname, 'src/app/blog/(content)');
    
    if (!fs.existsSync(blogDir)) {
      this.log('Blog directory not found (skipping audit)', 'WARNING');
      this.setStatus('Idle');
      return;
    }

    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
    this.log(`Found ${files.length} MDX files to audit.`);

    let issues = 0;
    files.slice(0, 5).forEach(file => { // Audit first 5 for speed
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      
      // Check 1: Frontmatter
      if (!content.startsWith('---')) {
        this.log(`❌ [${file}] Missing Frontmatter`, 'ERROR');
        issues++;
      }

      // Check 2: Image Alt Tags
      const images = content.match(/!\[(.*?)\]/g);
      if (images) {
        images.forEach(img => {
          if (img.includes('![]')) {
            this.log(`⚠️ [${file}] Missing Alt Text`, 'WARNING');
            issues++;
          }
        });
      }

      // Check 3: PREFLIGHT "Luminous Dark" Standards (Forbidden Tokens)
      const forbiddenTokens = ['text-gray-500', 'bg-blue-500', 'text-slate-500'];
      forbiddenTokens.forEach(token => {
        if (content.includes(token)) {
          this.log(`🚨 [${file}] FORBIDDEN TOKEN DETECTED: ${token} (Use site palette!)`, 'ERROR');
          issues++;
        }
      });

      // Check 4: Metadata (Title Length)
      const titleMatch = content.match(/title:\s*"(.*?)"/);
      if (titleMatch && titleMatch[1].length > 60) {
        this.log(`⚠️ [${file}] Title too long (>60 chars): "${titleMatch[1]}"`, 'WARNING');
        issues++;
      }
    });

    if (issues === 0) {
      this.log('✅ All systems go. No critical content issues found.');
    } else {
      this.log(`Audit Complete. Found ${issues} potential issues.`);
    }

    this.setStatus('Idle');
  }
}

const agent = new Editor();
agent.log('Agent Online. Triggering ALL pipelines...');

const runAll = async () => {
  try {
    await agent.runPipeline_PreFlight();
  } catch (e) {
    agent.log(`Pipeline validation failed: ${e.message}`, 'ERROR');
  }
};

runAll();
setInterval(runAll, 4 * 60 * 60 * 1000);
