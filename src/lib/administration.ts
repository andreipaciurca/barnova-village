import fs from 'fs';
import path from 'path';

export interface CouncilMember {
  name: string;
  party: string;
  role?: string;
}

export interface AdministrationData {
  mayor: string;
  viceMayor: string;
  councilMembers: CouncilMember[];
}

const DEFAULT_DATA: AdministrationData = {
  mayor: 'BALAN MIHAI',
  viceMayor: 'Rusu Constantin Lucian',
  councilMembers: [
    { name: 'RUSU CONSTANTIN-LUCIAN', party: 'PNL' },
    { name: 'ACATRINEI FLORIN', party: 'PNL' },
    { name: 'LUCA CONSTANTIN-CRISTIAN', party: 'PNL' },
    { name: 'CIOBANU MIRCEA', party: 'PNL' },
    { name: 'LUCA CĂTĂLIN-IONUŢ', party: 'PNL' },
    { name: 'TINCU GEORGEL-DANIEL', party: 'PSD' },
    { name: 'POPA DAN-CONSTANTIN', party: 'PSD' },
    { name: 'LUCA FĂNICĂ', party: 'PSD' },
    { name: 'VORNICU FLORIN', party: 'PSD' },
    { name: 'STRATULAT-PETERCĂ EMMA-CECILIA', party: 'USR' },
    { name: 'DUMITRU RADU', party: 'USR' },
    { name: 'ȘOȘU GEORGETA-IULIANA', party: 'USR' },
    { name: 'COBZARU IONUȚ-CĂTĂLIN', party: 'USR' },
    { name: 'COLOTIN SEBASTIAN', party: 'S.O.S. ROMÂNIA' },
    { name: 'COVALIU LIDIA-CAMELIA', party: 'PARTIDUL VERDE' }
  ],
};

export async function getAdministrationData(): Promise<AdministrationData> {
  try {
    const dataPath = path.join(process.cwd(), 'public/data/leadership.json');
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(fileContent);
      
      return {
        mayor: data.primar?.nume || DEFAULT_DATA.mayor,
        viceMayor: data.viceprimar?.nume || DEFAULT_DATA.viceMayor,
        councilMembers: data.consiliu_local?.map((m: any) => ({
          name: m.nume,
          party: m.partid
        })) || DEFAULT_DATA.councilMembers
      };
    }
    return DEFAULT_DATA;
  } catch (error) {
    console.error('Error reading administration data:', error);
    return DEFAULT_DATA;
  }
}
