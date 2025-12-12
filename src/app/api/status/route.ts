import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple persistence for "Live" usage tracking
const usageFile = path.resolve(process.cwd(), 'antigravity-usage.json');

export async function GET() {
  let usage = { tokens: 14500, max: 1000000, cost: 0.04 };
  
  if (fs.existsSync(usageFile)) {
    usage = JSON.parse(fs.readFileSync(usageFile, 'utf-8'));
  } else {
      // Initialize if missing
      fs.writeFileSync(usageFile, JSON.stringify(usage));
  }
  
  return NextResponse.json(usage);
}

export async function POST(request: Request) {
    // Audit log / Update usage
    const body = await request.json();
    if (body.tokens) {
        let usage = { tokens: 14500, max: 1000000, cost: 0.04 };
        if (fs.existsSync(usageFile)) {
            usage = JSON.parse(fs.readFileSync(usageFile, 'utf-8'));
        }
        usage.tokens += body.tokens;
        usage.cost += (body.tokens / 1000000) * 4; // Approx cost
        fs.writeFileSync(usageFile, JSON.stringify(usage));
        return NextResponse.json(usage);
    }
    return NextResponse.json({success: true});
}
