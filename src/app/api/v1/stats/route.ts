import { NextResponse } from 'next/server';
import { getAdministrationData } from '@/lib/administration';

export async function GET() {
  try {
    const adminData = await getAdministrationData();
    
    // Simple stats aggregation
    const stats = {
      council_size: adminData.councilMembers.length,
      verified_members: adminData.councilMembers.filter(m => m.isVerified).length + 
                       (adminData.mayorVerified ? 1 : 0) + 
                       (adminData.viceMayorVerified ? 1 : 0),
      last_updated: new Date().toISOString()
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
