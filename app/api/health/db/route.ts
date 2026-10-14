import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startedAt;

    return NextResponse.json(
      {
        status: 'ok',
        latencyMs,
        timestamp: new Date().toISOString(),
        database: 'neon'
      },
      { status: 200 }
    );
  } catch {
    const latencyMs = Date.now() - startedAt;

    return NextResponse.json(
      {
        status: 'error',
        latencyMs,
        timestamp: new Date().toISOString(),
        database: 'neon'
      },
      { status: 503 }
    );
  }
}
