import { NextResponse } from 'next/server';
import { getAdministrationData } from '@/lib/administration';

export async function GET() {
  try {
    const data = await getAdministrationData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leadership data' }, { status: 500 });
  }
}
