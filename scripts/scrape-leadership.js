const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * Scrapes leadership data from the official Bârnova Town Hall website.
 * Targets: Mayor, Vice-mayor, Secretary, Local Council, and Departments.
 */
async function scrapeLeadership() {
  console.log('Starting scraping for Bârnova Town Hall leadership...');
  const data = {
    primar: null,
    viceprimar: null,
    secretar: null,
    administrator_public: null,
    consiliu_local: [],
    servicii_si_departamente: [],
    documente_personal: []
  };

  try {
    // 1. Scrape Leadership and Departments from the contact page
    console.log('Accessing departments page...');
    const contactRes = await axios.get('https://primariabarnova.ro/contact/departamente-primarie/');
    let $ = cheerio.load(contactRes.data);
    let contentText = $('.entry-content').text();
    
    const extractNume = (regex) => {
        const match = contentText.match(regex);
        return match ? match[1].trim() : null;
    };

    // Extracting key leadership roles using regex on text content
    data.primar = { nume: extractNume(/PRIMAR:\s*([^\n\r]+)/i) };
    data.viceprimar = { nume: extractNume(/VICEPRIMAR:\s*([^\n\r]+)/i) };
    data.secretar = { nume: extractNume(/SECRETAR\s+([^\n\r]+)/i) };
    data.administrator_public = { nume: extractNume(/ADMINISTRATOR PUBLIC\s+Persoana de contact:\s*([^\n\r]+)/i) };

    // Identifying departments by looking for uppercase bold headers
    $('.entry-content p strong, .entry-content p b').each((i, el) => {
        const text = $(el).text().trim().replace(/:$/, '');
        if (text && text.length > 3 && text === text.toUpperCase() && !['PRIMAR', 'VICEPRIMAR', 'SECRETAR', 'ADMINISTRATOR PUBLIC'].includes(text)) {
            const nextText = $(el).parent().text().replace(text, '').trim();
            data.servicii_si_departamente.push({
                nume: text,
                info: nextText
            });
        }
    });

    // 2. Scrape Local Council members and their political parties
    console.log('Accessing local council page...');
    const consiliuRes = await axios.get('https://primariabarnova.ro/consiliul-local-2/comisii-de-specialitate/');
    $ = cheerio.load(consiliuRes.data);
    const consilieriMap = new Map();

    $('.entry-content p').each((i, el) => {
        const text = $(el).text().trim();
        const match = text.match(/\d+\)\s*([^,]+),\s*consilier local/i);
        if (match) {
            const nume = match[1].trim();
            const partidMatch = text.match(/ales pe listele\s+([^;.]+)/i);
            const partid = partidMatch ? partidMatch[1].trim() : 'N/A';
            if (!consilieriMap.has(nume)) {
                consilieriMap.set(nume, { nume, partid });
            }
        }
    });
    data.consiliu_local = Array.from(consilieriMap.values());

    // 3. Scrape Personnel Documents (Staff lists and Organigram)
    const pages = [
        'https://primariabarnova.ro/primaria-comunei-birnova/administratie/state-de-functii-personal-angajat/',
        'https://primariabarnova.ro/primaria-comunei-birnova/administratie/organigrama/'
    ];

    for (const url of pages) {
        console.log(`Accessing ${url}...`);
        const res = await axios.get(url);
        const $p = cheerio.load(res.data);
        // Search for document links anywhere in the page content
        $p('a').each((i, el) => {
            const href = $p(el).attr('href');
            const text = $p(el).text().trim();
            if (href && (href.toLowerCase().endsWith('.pdf') || href.includes('drive.google.com') || href.includes('/wp-content/uploads/'))) {
                if (!data.documente_personal.some(d => d.url === href)) {
                    data.documente_personal.push({ titlu: text || 'Document fara titlu', url: href });
                }
            }
        });
    }

    // Ensure output directory exists and save data
    const outputDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'leadership.json'), JSON.stringify(data, null, 2));

    console.log('Scraping completed successfully!');
    console.log(`- Mayor: ${data.primar.nume}`);
    console.log(`- Councilors: ${data.consiliu_local.length}`);
    console.log(`- Departments identified: ${data.servicii_si_departamente.length}`);
    console.log(`- Personnel documents identified: ${data.documente_personal.length}`);

  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
}

scrapeLeadership();
