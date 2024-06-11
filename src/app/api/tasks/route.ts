import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const file = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to read data.json' }, { status: 500 });
  }
}
