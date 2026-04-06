export type Language = 'ro';

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
      bureaucracy: 'Birocrație',
      rumors: 'Zvonuri',
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
        salaries: 'Cheieli Personal',
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
    sarcastic: {
      nav: {
        home: 'Bârlog',
        admin: 'Marea Împărțeală',
        services: 'Ghișeul 2',
        tourism: 'Groapa cu Lei',
        contact: 'Nu deranjați',
        bureaucracy: 'Dosar cu Șină',
        rumors: 'Radio Șanț',
      },
      hero: {
        title: 'Viitorul Comunei (Dacă avem noroc)',
        subtitle: 'O platformă atât de modernă încât primăria încă folosește faxul. Informații oficiale, servicii care sperăm să meargă și noutăți de acum doi ani.',
      },
      news: {
        title: 'Zvonuri și Anunțuri',
        subtitle: 'Ce am mai auzit prin sat sau ce ne-au obligat să postăm',
      },
      features: {
        stats: {
          title: 'Minciuni în Cifre',
          subtitle: 'Statistici scoase din burtă sau din API-uri pe care nu le înțelegem',
          population: 'Suflete (teoretic)',
          budget_title: 'Unde se duc banii 2024',
          investments: 'Borduri noi',
          salaries: 'Neamuri și Afini',
          others: 'Protocol și Cafele',
        },
        digital: {
          title: 'Birocrație Digitală',
          description: 'Te rugăm să descarci PDF-ul, să-l scanezi și să-l trimiți prin porumbel voiajor.',
        },
        tourism: {
          title: 'Turism de Supraviețuire',
          description: 'Vino să vezi cum se asfaltează în timp ce plouă.',
        },
        transparency: {
          title: 'Transparență de Fațadă',
          description: 'Decizii luate în spatele ușilor închise, dar postate aici pentru conformitate.',
        },
        administration: {
          title: 'Ghișeul cu Pauză',
          description: 'Suntem aici între cafeaua de dimineață și pauza de masă.',
        },
        governance: {
          title: 'Vârfurile Ierarhiei',
          subtitle: 'Cei care decid soarta bordurilor din Bârnova',
        },
      },
      archive: {
        subtitle: 'Muzeul Digital al Promisiunilor Neîndeplinite',
        description: 'Dacă acest site nu merge, cel vechi sigur nu mergea deloc. Arhivă de documente scanate strâmb.',
      },
      health: {
        title: 'Terapie Intensivă Sistem',
        status_online: 'ÎNCĂ REZISTĂ',
        status_offline: 'S-A TĂIAT CURENTUL',
        uptime: 'Timp fără restart',
      }
    },
    archive: {
      title: 'Continuitate și Istoric',
      subtitle: 'Acces rapid către vechiul portal și arhiva de documente primariabarnova.ro',
      cta: 'Accesează Vechiul Site',
      description: 'Pentru a asigura o tranziție ușoară, vechiul site rămâne disponibil ca arhivă digitală pentru consultarea documentelor istorice și a istoricului administrativ.',
    },
    footer: {
      tagline: 'Partenerul tău în era digitală. Modernizăm serviciile publice pentru o comunitate mai puternică.',
      disclaimer: 'Acest site este un proiect demo și nu este afiliat cu Primăria Bârnova sau Consiliul Județean Iași. Datele sunt preluate din surse publice și API-uri guvernamentale.',
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
    health: {
      title: 'Sănătate Sistem & Diagnoză',
      subtitle: 'Monitorizare în timp real a infrastructurii digitale Bârnova Village',
      status_online: 'SISTEM ONLINE',
      status_offline: 'SISTEM OFFLINE',
      uptime: 'Timp de funcționare',
      version: 'Versiune Software',
      last_update: 'Ultima actualizare',
      memory: 'Utilizare Memorie',
      refresh: 'Actualizează Datele',
      back: 'Înapoi la Acasă',
      services: {
        title: 'Stare Servicii',
        vercel: 'Infrastructură Cloud (Vercel)',
        supabase: 'Bază de Date (Supabase)',
        connected: 'Conectat',
        disconnected: 'Deconectat',
      },
      useful_links: {
        title: 'Resurse și Legături Utile',
        description: 'Acces rapid către portalurile guvernamentale și platformele de monitorizare.',
      },
    },
    admin: {
      login: {
        title: 'Portal Admin',
        subtitle: 'Autentificare securizată prin Magic Link',
        success_title: 'Verifică-ți emailul!',
        success_msg: 'Am trimis un link de autentificare pe',
        success_cta: 'Încearcă alt email',
        label_email: 'Email Administrativ',
        placeholder: 'nume@barnova.ro',
        btn_send: 'Trimite Link de Acces',
        back_to_site: 'Înapoi la site-ul public',
      },
      dashboard: {
        title: 'Panou Control',
        greeting_morning: 'Bună dimineața!',
        greeting_day: 'Bună ziua!',
        greeting_evening: 'Bună seara!',
        subtitle: 'Iată ce se întâmplă astăzi în comuna Bârnova.',
        view_site: 'Vezi Site',
        new_post: 'Postare Nouă',
        stats: {
          active_posts: 'Postări Active',
          system_health: 'Sănătate Sistem',
          visitors: 'Vizitatori Azi',
          status_active: 'Activ',
          status_inactive: 'Offline',
        },
        recent_posts: {
          title: 'Postări Recente',
          subtitle: 'Ultimele noutăți publicate pe site',
          view_all: 'Vezi toate',
          empty: 'Nu există postări recente.',
        },
        sidebar: {
          dashboard: 'Dashboard',
          posts: 'Postări & Știri',
          users: 'Utilizatori',
          settings: 'Setări Site',
          logout: 'Ieșire',
          admin_tag: 'Administrator',
        }
      },
      users: {
        title: 'Gestionare Utilizatori',
        subtitle: 'Vizualizează și gestionează conturile cu acces administrativ.',
        current_user: 'Utilizator Curent',
        email: 'Email',
        role: 'Rol',
        last_login: 'Ultima autentificare',
        actions: 'Acțiuni',
        back: 'Înapoi la Dashboard',
      },
      settings: {
        title: 'Setări Site',
        subtitle: 'Configurează parametrii generali ai portalului Bârnova Village.',
        general: {
          title: 'Informații Generale',
          site_name: 'Nume Site',
          site_description: 'Descriere Site',
          contact_email: 'Email Contact',
        },
        features: {
          title: 'Funcționalități Active',
          show_news: 'Afișează Știri',
          show_stats: 'Afișează Statistici',
          show_weather: 'Afișează Vremea',
          sarcastic_mode: 'Mod Sarcastic (Activ)',
        },
        save: 'Salvează Modificările',
        success: 'Setările au fost salvate cu succes!',
        error: 'Eroare la salvarea setărilor.',
        back: 'Înapoi la Dashboard',
      }
    }
  }
};
