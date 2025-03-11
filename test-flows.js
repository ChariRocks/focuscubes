
/**
 * Focus Cubes App - End-to-End Testing Script
 * 
 * This script maps and tests all major user flows through the application
 * without modifying any existing functionality.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:3001'; // Update this to match your server port
const FLOW_MAP_FILE = 'flow-map.json';
const SCREENSHOT_DIR = 'test-screenshots';

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR);
}

// Flow mapping data structure
const appFlows = {
  mainFlows: [],
  pages: {},
  links: []
};

async function testMainFlow(browser) {
  console.log('\n--- Testing Main User Flow ---');
  const page = await browser.newPage();
  
  // Start at index page
  console.log('Visiting home page...');
  await page.goto(`${BASE_URL}/index.html`);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/01-index.png` });
  appFlows.pages['index.html'] = { title: await page.title(), links: [] };
  
  // Enter name and click Begin
  console.log('Entering name and clicking Begin...');
  await page.type('#nameInput', 'Test User');
  await page.click('#startButton');
  await page.waitForSelector('#options-screen:not(.hidden)');
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02-options.png` });
  
  // Record flow
  appFlows.mainFlows.push({
    name: 'Login Flow',
    steps: [
      { page: 'index.html', action: 'Enter name and click Begin' },
      { page: 'index.html#path', action: 'View options' }
    ]
  });
  
  // Test "While at Work" flow
  console.log('Testing "While at Work" flow...');
  const workLinks = await page.$$eval('a', links => 
    links.filter(link => link.href.includes('during&between.html'))
      .map(link => link.href)
  );
  
  appFlows.links.push({
    from: 'index.html#path',
    to: 'during&between.html',
    description: 'Navigate to While at Work'
  });
  
  if (workLinks.length > 0) {
    await page.goto(workLinks[0]);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/03-during-between.png` });
    appFlows.pages['during&between.html'] = { title: await page.title(), links: [] };
    
    // Get all links on the during&between page
    const duringBetweenLinks = await page.$$eval('a', links => 
      links.map(link => ({ href: link.href, text: link.innerText.trim() }))
    );
    
    appFlows.pages['during&between.html'].links = duringBetweenLinks;
    
    for (const link of duringBetweenLinks) {
      if (link.href.includes(BASE_URL)) {
        const destination = link.href.replace(BASE_URL, '');
        appFlows.links.push({
          from: 'during&between.html',
          to: destination,
          description: link.text
        });
      }
    }
  }
  
  // Test 6-Week Transformation Flow
  console.log('Testing "6-Week Transformation" flow...');
  await page.goto(`${BASE_URL}/index.html#path`);
  const transformLinks = await page.$$eval('a', links => 
    links.filter(link => link.href.includes('6weekhomeNEW.html'))
      .map(link => link.href)
  );
  
  appFlows.links.push({
    from: 'index.html#path',
    to: '6weekhomeNEW.html',
    description: 'Navigate to 6-Week Transformation'
  });
  
  if (transformLinks.length > 0) {
    await page.goto(transformLinks[0]);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/04-6week-home.png` });
    appFlows.pages['6weekhomeNEW.html'] = { title: await page.title(), links: [] };
    
    // Get all links on the 6weekhomeNEW page
    const weekLinks = await page.$$eval('.week-card', cards => 
      cards.map(card => ({ 
        href: card.onclick ? card.onclick.toString().match(/href=['"]([^'"]*)['"]/)?.[1] || '' : '',
        text: card.querySelector('h3')?.innerText || 'Week card'
      }))
    );
    
    appFlows.pages['6weekhomeNEW.html'].links = weekLinks;
    
    for (const link of weekLinks) {
      if (link.href) {
        appFlows.links.push({
          from: '6weekhomeNEW.html',
          to: link.href,
          description: link.text
        });
      }
    }
  }
  
  await page.close();
}

async function mapAllPages(browser) {
  console.log('\n--- Mapping All Pages ---');
  
  // List of all HTML files
  const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
  
  for (const file of htmlFiles) {
    if (!appFlows.pages[file]) {
      console.log(`Visiting ${file}...`);
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/${file}`);
      
      try {
        await page.waitForSelector('body', { timeout: 3000 });
        await page.screenshot({ path: `${SCREENSHOT_DIR}/page-${file.replace('.html', '')}.png` });
        
        appFlows.pages[file] = { 
          title: await page.title(),
          links: await page.$$eval('a', links => 
            links.map(link => ({ href: link.href, text: link.innerText.trim() }))
          )
        };
        
        console.log(`Successfully mapped ${file}`);
      } catch (error) {
        console.error(`Error mapping ${file}:`, error.message);
        appFlows.pages[file] = { title: 'Error loading page', links: [] };
      }
      
      await page.close();
    }
  }
}

async function generateFlowMap() {
  console.log('\n--- Generating Flow Map ---');
  
  // Save flow map as JSON
  fs.writeFileSync(FLOW_MAP_FILE, JSON.stringify(appFlows, null, 2));
  console.log(`Flow map saved to ${FLOW_MAP_FILE}`);
  
  // Generate HTML visualization
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Focus Cubes App - Flow Map</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <style>
      body { font-family: sans-serif; margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      h1, h2 { color: #0066cc; }
      .mermaid { overflow: auto; }
      .flow-section { margin-bottom: 30px; }
      .screenshot { margin: 10px 0; }
      .screenshot img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Focus Cubes App - Flow Map</h1>
      
      <div class="flow-section">
        <h2>Main User Flows</h2>
        <div class="mermaid">
          flowchart TD
          ${appFlows.links.map((link, i) => {
            const fromId = link.from.replace(/[^a-zA-Z0-9]/g, '_');
            const toId = link.to.replace(/[^a-zA-Z0-9]/g, '_');
            return `${fromId}["${link.from}"] --> |"${link.description}"| ${toId}["${link.to}"]`;
          }).join('\n          ')}
        </div>
      </div>
      
      <div class="flow-section">
        <h2>Screenshots</h2>
        <div class="screenshots">
          ${fs.readdirSync(SCREENSHOT_DIR).map(screenshot => `
            <div class="screenshot">
              <h3>${screenshot.replace('.png', '')}</h3>
              <img src="${SCREENSHOT_DIR}/${screenshot}" alt="${screenshot}">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <script>
      mermaid.initialize({ startOnLoad: true, theme: 'default' });
    </script>
  </body>
  </html>
  `;
  
  fs.writeFileSync('flow-map.html', htmlContent);
  console.log('HTML flow map visualization saved to flow-map.html');
}

async function runTests() {
  console.log('Starting end-to-end tests...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    await testMainFlow(browser);
    await mapAllPages(browser);
    await generateFlowMap();
    
    console.log('\n--- Test Summary ---');
    console.log(`Total pages mapped: ${Object.keys(appFlows.pages).length}`);
    console.log(`Total links mapped: ${appFlows.links.length}`);
    console.log('End-to-end testing completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the tests
runTests();
