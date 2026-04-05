export type Language = 'ro' | 'en';

export interface Feature {
  title: string;
  description: string;
  items: string[];
}

export const translations = {
  ro: {
    nav: {
      home: 'Acasă',
      admin: 'Administrație',
      services: 'Servicii',
      tourism: 'Turism',
      contact: 'Contact',
    },
    hero: {
      title: 'Viitorul Comunei Bârnova',
      subtitle: 'O platformă modernă, intuitivă și rapidă pentru toți locuitorii comunei noastre. Informații oficiale, servicii digitale și noutăți în timp real.',
      cta_news: 'Vezi Anunțurile',
      cta_services: 'Ghid servicii',
    },
    news: {
      title: 'Anunțuri Recente',
      subtitle: 'Ultimele știri și actualizări de la Primărie',
      view_all: 'Vezi toate știrile',
      official_tag: 'Oficial',
      read_more: 'Citește mai mult',
    },
    features: {
      stats: {
        title: 'Bârnova în Cifre',
        subtitle: 'Date deschise despre comunitatea noastră (Sursa: data.gov.ro)',
        population: 'Populație (2021)',
        area: 'Suprafață',
        density: 'Densitate',
        birth_rate: 'Natalitate',
        budget_title: 'Structura Bugetului 2024',
        investments: 'Investiții',
        salaries: 'Cheltuieli Personal',
        others: 'Alte Cheltuieli',
      },
      digital: {
        title: 'Servicii Digitale',
        description: 'Acces la documente, cereri online și plăți taxe, direct de pe telefon.',
        items: ['Plăți Online', 'Formulare Online', 'Sesizări'],
      },
      tourism: {
        title: 'Explorați Bârnova',
        description: 'Descoperă Mănăstirea Bârnova, Rezervația Repedea și istoria locală.',
        items: ['Mănăstirea Bârnova', 'Repedea', 'Turism'],
      },
      transparency: {
        title: 'Transparență Decizională',
        description: 'Monitorul Oficial Local, PUZ-uri și deciziile consiliului local.',
        items: ['Monitorul Oficial', 'PUZ', 'Hotărâri'],
      },
      administration: {
        title: 'Administrație Locală',
        description: 'Programul primăriei, departamente și contact direct.',
        items: ['Program', 'Departamente', 'Contact'],
      },
      governance: {
        title: 'Conducere Locală',
        subtitle: 'Primar, Viceprimar și Consiliul Local (Mandatul 2024-2028)',
        mayor: 'Primar',
        viceMayor: 'Viceprimar',
        council: 'Consiliul Local',
        party: 'Partid',
      },
    },
    archive: {
      title: 'Continuitate și Istoric',
      subtitle: 'Acces rapid către vechiul portal și arhiva de documente primariabarnova.ro',
      cta: 'Accesează Vechiul Site',
      description: 'Pentru a asigura o tranziție ușoară, vechiul site rămâne disponibil ca arhivă digitală pentru consultarea documentelor istorice și a istoricului administrativ.',
    },
    footer: {
      tagline: 'Partenerul tău în era digitală. Modernizăm serviciile publice pentru o comunitate mai puternică.',
      useful_links: 'Link-uri utile',
      official_resources: 'Resurse Oficiale',
      portal: 'Portal Cetățean',
      payments: 'Plăți Online (Ghișeul.ro)',
      documents: 'Formulare și Documente',
      contact: 'Contact și Program',
      ghiseul: 'Ghișeul.ro',
      mai: 'M.A.I. (Servicii Pașapoarte/Permise)',
      gov: 'Guvernul României (gov.ro)',
      data_gov: 'Portal Date Deschise (data.gov.ro)',
      dna: 'Direcția Națională Anticorupție (dna.ro)',
      transparency: 'Transparență Instituțională',
      copyright: 'Primăria Bârnova. Site construit pentru viitor.',
      created_by: 'Creat de',
    },
  },
  en: {
    nav: {
      home: 'Home',
      admin: 'Administration',
      services: 'Services',
      tourism: 'Tourism',
      contact: 'Contact',
    },
    hero: {
      title: 'The Future of Bârnova Village',
      subtitle: 'A modern, intuitive, and fast platform for all residents of our village. Official information, digital services, and real-time news.',
      cta_news: 'See Announcements',
      cta_services: 'Services Guide',
    },
    news: {
      title: 'Recent Announcements',
      subtitle: 'The latest news and updates from the Town Hall',
      view_all: 'View all news',
      official_tag: 'Official',
      read_more: 'Read more',
    },
    features: {
      stats: {
        title: 'Bârnova in Figures',
        subtitle: 'Open data about our community (Source: data.gov.ro)',
        population: 'Population (2021)',
        area: 'Area',
        density: 'Density',
        birth_rate: 'Birth Rate',
        budget_title: '2024 Budget Structure',
        investments: 'Investments',
        salaries: 'Personnel Costs',
        others: 'Other Expenses',
      },
      digital: {
        title: 'Digital Services',
        description: 'Online access to documents, requests, and tax payments.',
        items: ['Online Payments', 'Forms', 'Reports'],
      },
      tourism: {
        title: 'Explore Bârnova',
        description: 'Discover the Bârnova Monastery, Repedea Forest, and local history.',
        items: ['Monastery', 'Repedea Forest', 'Tourism'],
      },
      transparency: {
        title: 'Decision Transparency',
        description: 'Local Official Gazette, urban plans, and council decisions.',
        items: ['Gazette', 'Urban Plans', 'Decisions'],
      },
      administration: {
        title: 'Local Administration',
        description: 'Town hall schedule, departments, and direct contact.',
        items: ['Schedule', 'Departments', 'Contact'],
      },
      governance: {
        title: 'Local Governance',
        subtitle: 'Mayor, Vice-Mayor and Local Council (2024-2028 Mandate)',
        mayor: 'Mayor',
        viceMayor: 'Vice-Mayor',
        council: 'Local Council',
        party: 'Party',
      },
    },
    archive: {
      title: 'Continuity and History',
      subtitle: 'Quick access to the old portal and document archive primariabarnova.ro',
      cta: 'Access Old Site',
      description: 'To ensure a smooth transition, the old site remains available as a digital archive for consulting historical documents and administrative history.',
    },
    footer: {
      tagline: 'Your partner in the digital era. Modernizing public services for a stronger community.',
      useful_links: 'Useful links',
      official_resources: 'Official Resources',
      portal: 'Citizen Portal',
      payments: 'Online Payments (Ghiseul.ro)',
      documents: 'Forms and Documents',
      contact: 'Contact & Schedule',
      ghiseul: 'Ghiseul.ro',
      mai: 'M.A.I. (Passports/Licenses)',
      gov: 'Romanian Government (gov.ro)',
      data_gov: 'Open Data Portal (data.gov.ro)',
      dna: 'National Anti-Corruption Directorate (dna.ro)',
      transparency: 'Institutional Transparency',
      copyright: 'Bârnova Town Hall. Site built for the future.',
      created_by: 'Created by',
    },
  },
};
