
/**
 * Focus Cubes App - Testing Utility
 * This script checks your app without modifying its functionality
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3002;

// Create flow map data structure
const appMap = {
  pages: {},
  links: []
};

// Serve static files from current directory
app.use(express.static('./'));

// Home page shows test results and app flow map
app.get('/', (req, res) => {
  // Map HTML files
  const htmlFiles = fs.readdirSync('.').filter(file => 
    file.endsWith('.html') && !file.includes('app-test')
  );
  
  // Process each HTML file to extract links and structure
  htmlFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Extract title
      const titleMatch = content.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : file;
      
      // Extract links (simplified approach)
      const linkMatches = content.match(/href="(.*?\.html.*?)"/g) || [];
      const links = linkMatches.map(match => {
        const href = match.match(/href="(.*?)"/)[1];
        return href;
      });
      
      // Store page info
      appMap.pages[file] = {
        title: title,
        links: links
      };
      
      // Add links to the map
      links.forEach(link => {
        // Extract just the html filename from potentially complex links
        const targetFile = link.split('#')[0].split('?')[0];
        
        if (targetFile && targetFile.endsWith('.html')) {
          appMap.links.push({
            from: file,
            to: targetFile,
          });
        }
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  });
  
  // Generate HTML response with visualization
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Focus Cubes App - Testing Results</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; line-height: 1.5; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1, h2, h3 { color: #0066cc; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .flow-item { padding: 5px 0; border-bottom: 1px solid #eee; }
    .pages-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
    .page-card { background: #f9f9f9; padding: 15px; border-radius: 5px; }
    .nav-links { margin-top: 20px; }
    .test-btn { display: inline-block; margin: 5px; padding: 8px 16px; background: #0066cc; color: white; 
               text-decoration: none; border-radius: 4px; }
    .test-btn:hover { background: #0055aa; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Focus Cubes App - Testing Results</h1>
    
    <div class="card">
      <h2>App Structure Overview</h2>
      <p>Found ${Object.keys(appMap.pages).length} HTML pages with ${appMap.links.length} navigation links.</p>
      
      <h3>Main Application Flow:</h3>
      <div>
        <p><strong>Entry point:</strong> index.html</p>
        <p><strong>Primary User Flows:</strong></p>
        <ul>
          <li>index.html → during&between.html → Various break pages</li>
          <li>index.html → 6weekhomeNEW.html → Week pages (week1.html through week6.html)</li>
        </ul>
      </div>
    </div>
    
    <div class="card">
      <h2>Navigation Map</h2>
      <div class="flow-map">
        ${appMap.links.map(link => 
          `<div class="flow-item">
            <strong>${link.from}</strong> → <strong>${link.to}</strong>
          </div>`
        ).join('')}
      </div>
    </div>
    
    <div class="card">
      <h2>Test Your App</h2>
      <p>Click the links below to test different parts of your app:</p>
      
      <div class="nav-links">
        <a class="test-btn" href="/index.html" target="_blank">Main App</a>
        <a class="test-btn" href="/during&between.html" target="_blank">Work Mode</a>
        <a class="test-btn" href="/6weekhomeNEW.html" target="_blank">6-Week Program</a>
      </div>
      
      <p>As you navigate through the app, this test utility runs in parallel without affecting your app's functionality.</p>
    </div>
    
    <div class="card">
      <h2>All Pages</h2>
      <div class="pages-list">
        ${Object.entries(appMap.pages).map(([file, info]) => 
          `<div class="page-card">
            <h3>${info.title}</h3>
            <p>File: ${file}</p>
            <p>Links: ${info.links.length}</p>
            <a href="/${file}" target="_blank">Open Page</a>
          </div>`
        ).join('')}
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  res.send(html);
});

// Save flow map as JSON
app.get('/flow-map.json', (req, res) => {
  res.json(appMap);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`App testing utility running at http://0.0.0.0:${port}`);
  console.log('This won't affect your main app which runs on port 3001');
});
