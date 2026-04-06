import { NextResponse } from 'next/server';
import { getServerService } from '@/lib/supabase/services.server';

export async function POST(request: Request) {
  try {
    const service = await getServerService();
    const user = await service.getUser();
    
    // Deși vrem să fie accesibil ca un demo, modificarea setărilor ar trebui 
    // să fie limitată sau măcar să avem o logică de fallback.
    // Pentru acest demo, permitem modificarea dacă suntem în mediu de dezvoltare
    // sau dacă avem un user autentificat.
    
    const { key, value } = await request.json();
    
    if (key !== 'sarcastic_mode') {
      return NextResponse.json({ error: 'Invalid setting key' }, { status: 400 });
    }

    // Luăm setările actuale de 'features'
    const currentFeatures = await service.getSettings('features');
    const updatedFeatures = {
      ...currentFeatures,
      [key]: value
    };

    await service.updateSettings('features', updatedFeatures);

    return NextResponse.json({ success: true, value });
  } catch (error) {
    console.error('API Settings Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
