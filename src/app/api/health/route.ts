import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const isVercel = !!(process.env.VERCEL || process.env.VERCEL_ENV);
  
  let supabaseStatus = 'disconnected';
  try {
    const supabase = await createClient();
    // A simple query to check connectivity
    const { error } = await supabase.from('posts').select('id', { count: 'exact', head: true }).limit(1);
    
    // If the error is 'PGRST116' (no results) or no error, it's connected
    // If it's a 401/403 it might be permissions but still connected to the API
    // If it's a network error or missing credentials it will fail earlier or here
    if (!error || error.code === 'PGRST116') {
      supabaseStatus = 'connected';
    } else {
      console.error('Supabase health check error:', error);
      supabaseStatus = `error: ${error.message}`;
    }
  } catch (err) {
    console.error('Supabase health check exception:', err);
    supabaseStatus = 'exception';
  }

  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.2.1',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      services: {
        vercel: {
          connected: isVercel,
          environment: process.env.VERCEL_ENV || 'local',
          logsUrl: isVercel ? `https://vercel.com/${process.env.VERCEL_ORG_ID || 'dashboard'}/${process.env.VERCEL_PROJECT_ID || 'projects'}/logs` : null
        },
        supabase: {
          status: supabaseStatus,
          logsUrl: 'https://supabase.com/dashboard/project/_/logs'
        }
      },
      monitoring: {
        vercelDashboard: 'https://vercel.com/dashboard',
        supabaseDashboard: 'https://supabase.com/dashboard'
      }
    },
    { status: 200 }
  );
}
