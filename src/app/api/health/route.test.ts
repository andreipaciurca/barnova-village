import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';

describe('Health API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset Vercel environment variables
    delete process.env.VERCEL;
    delete process.env.VERCEL_ENV;
  });

  it('returns healthy status with services information', async () => {
    // Mock successful Supabase connection
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ count: 0, error: null })
    };
    (createClient as any).mockResolvedValue(mockSupabase);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('UP');
    expect(data.postsCount).toBeDefined();
    expect(data.version).toBe('1.2.1');
    expect(data.services.vercel.connected).toBe(false);
    expect(data.services.supabase.status).toBe('connected');
    expect(data.services.supabase.logsUrl).toBeDefined();
    expect(data.monitoring.vercelDashboard).toBe('https://vercel.com/dashboard');
  });

  it('detects Vercel environment', async () => {
    process.env.VERCEL = '1';
    process.env.VERCEL_ENV = 'production';
    
    // Mock successful Supabase connection
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ count: 0, error: null })
    };
    (createClient as any).mockResolvedValue(mockSupabase);

    const response = await GET();
    const data = await response.json();

    expect(data.services.vercel.connected).toBe(true);
    expect(data.services.vercel.environment).toBe('production');
  });

  it('reports Supabase disconnected on error', async () => {
    // Mock Supabase error
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ count: null, error: { message: 'Database error', code: 'PGRST' } })
    };
    (createClient as any).mockResolvedValue(mockSupabase);

    const response = await GET();
    const data = await response.json();

    expect(data.services.supabase.status).toBe('error: Database error');
  });
});
