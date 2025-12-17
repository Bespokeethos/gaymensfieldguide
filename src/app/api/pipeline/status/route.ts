import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const statusPath = path.join(process.cwd(), 'public', 'pipeline_status.json');
  
  try {
    if (!fs.existsSync(statusPath)) {
      return NextResponse.json({ error: 'Status file not found' }, { status: 404 });
    }
    const data = fs.readFileSync(statusPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read status' }, { status: 500 });
  }
}
