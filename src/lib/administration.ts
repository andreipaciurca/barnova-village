import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface CouncilMember {
  name: string;
  party: string;
  role?: string;
  isVerified?: boolean;
}

export interface AdministrationData {
  mayor: string;
  mayorVerified?: boolean;
  viceMayor: string;
  viceMayorVerified?: boolean;
  councilMembers: CouncilMember[];
}

const DEFAULT_DATA: AdministrationData = {
  mayor: 'BALAN MIHAI',
  mayorVerified: true,
  viceMayor: 'Rusu Constantin Lucian',
  viceMayorVerified: true,
  councilMembers: [
    { name: 'RUSU CONSTANTIN-LUCIAN', party: 'PNL', isVerified: true },
    { name: 'ACATRINEI FLORIN', party: 'PNL', isVerified: true },
    { name: 'LUCA CONSTANTIN-CRISTIAN', party: 'PNL', isVerified: true },
    { name: 'CIOBANU MIRCEA', party: 'PNL', isVerified: true },
    { name: 'LUCA CĂTĂLIN-IONUŢ', party: 'PNL', isVerified: true },
    { name: 'TINCU GEORGEL-DANIEL', party: 'PSD', isVerified: true },
    { name: 'POPA DAN-CONSTANTIN', party: 'PSD', isVerified: true },
    { name: 'LUCA FĂNICĂ', party: 'PSD', isVerified: true },
    { name: 'VORNICU FLORIN', party: 'PSD', isVerified: true },
    { name: 'STRATULAT-PETERCĂ EMMA-CECILIA', party: 'USR', isVerified: true },
    { name: 'DUMITRU RADU', party: 'USR', isVerified: true },
    { name: 'ȘOȘU GEORGETA-IULIANA', party: 'USR', isVerified: true },
    { name: 'COBZARU IONUȚ-CĂTĂLIN', party: 'USR', isVerified: true },
    { name: 'COLOTIN SEBASTIAN', party: 'S.O.S. ROMÂNIA', isVerified: true },
    { name: 'COVALIU LIDIA-CAMELIA', party: 'PARTIDUL VERDE', isVerified: true }
  ],
};

export const getAdministrationData = cache(async function (): Promise<AdministrationData> {
  try {
    const dataPath = path.join(process.cwd(), 'public/data/leadership.json');
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(fileContent);
      
      return {
        mayor: data.primar?.nume || DEFAULT_DATA.mayor,
        mayorVerified: !!data.primar?.bec_voturi,
        viceMayor: data.viceprimar?.nume || DEFAULT_DATA.viceMayor,
        viceMayorVerified: !!data.primar?.bec_voturi, // If mayor is verified from BEC, we assume the structure is synced
        councilMembers: data.consiliu_local?.map((m: any) => ({
          name: m.nume,
          party: m.partid,
          isVerified: !!data.metadata?.ultima_actualizare_bec
        })) || DEFAULT_DATA.councilMembers
      };
    }
    return DEFAULT_DATA;
  } catch (error) {
    console.error('Error reading administration data:', error);
    return DEFAULT_DATA;
  }
});
