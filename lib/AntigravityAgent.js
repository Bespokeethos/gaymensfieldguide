/**
 * Base Agent Class to standardize logging and API guide access.
 */
const fs = require('fs');
const path = require('path');

class AntigravityAgent {
  constructor(name, expertise) {
    this.name = name;
    this.expertise = expertise; // 'SEO', 'Content', etc.
    this.status = 'Idle';
    this.logs = [];
    // Go up one level from lib/ to root
    this.apiGuidesPath = path.join(__dirname, '..', 'api_guides');
    
    // Auto-start heartbeat: Update status file every 30s to prove life
    this.startHeartbeat();
  }

  startHeartbeat() {
    setInterval(() => {
      // Refresh the timestamp in the status file
      this.updateStatusFile();
    }, 30000);
  }

  log(message, type = 'INFO') {
    const entry = `[${new Date().toISOString()}] [${this.name}] [${type}] ${message}`;
    console.log(entry);
    this.logs.push(entry);
    this.updateStatusFile();
  }

  updateStatusFile() {
    // Write status to public/pipeline_status.json (simulated database)
    // Go up one level from lib/ to root
    const statusPath = path.join(__dirname, '..', 'public', 'pipeline_status.json');
    let currentStatus = {};
    try {
      if (fs.existsSync(statusPath)) {
        currentStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
      }
    } catch (e) { /* ignore */ }

    currentStatus[this.name] = {
      status: this.status,
      lastUpdate: new Date().toISOString(),
      expertise: this.expertise,
      recentLogs: this.logs.slice(-5)
    };

    fs.writeFileSync(statusPath, JSON.stringify(currentStatus, null, 2));
  }

  async readGuide(guideName) {
    const guidePath = path.join(this.apiGuidesPath, guideName);
    if (!fs.existsSync(guidePath)) {
      this.log(`MISSING GUIDE: ${guideName}`, 'ERROR');
      return null;
    }
    return fs.readFileSync(guidePath, 'utf8');
  }

  setStatus(status) {
    this.status = status;
    this.log(`Status changed to: ${status}`);
    this.updateStatusFile();
  }
}

module.exports = AntigravityAgent;
