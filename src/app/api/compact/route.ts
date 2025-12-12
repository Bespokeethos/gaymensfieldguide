import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usageFile = path.resolve(process.cwd(), 'antigravity-usage.json');

export async function POST() {
    // 1. Reset Token Count (Simulated Compaction)
    let usage = { tokens: 500, max: 1000000, cost: 0.00 }; // Reset to baseline
    
    if (fs.existsSync(usageFile)) {
        // preserve max, reset current
        const current = JSON.parse(fs.readFileSync(usageFile, 'utf-8'));
        usage.max = current.max;
    }
    
    fs.writeFileSync(usageFile, JSON.stringify(usage));
    
    // 2. In a real scenario, this would trigger the Python 'Summarizer' via the Pipe
    console.log("🍌 Compaction Triggered via HUD");

    return NextResponse.json({ success: true, usage });
}
