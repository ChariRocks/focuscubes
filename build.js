
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  // Replace CDN Tailwind with local compiled version
  const updatedContent = content.replace(
    '<script src="https://cdn.tailwindcss.com"></script>',
    '<link href="css/styles.css" rel="stylesheet">'
  );
  fs.writeFileSync(path.join('dist', file), updatedContent);
});

// Copy images folder
if (fs.existsSync('images')) {
  if (!fs.existsSync('dist/images')) {
    fs.mkdirSync('dist/images', { recursive: true });
  }
  const images = fs.readdirSync('images');
  images.forEach(file => {
    fs.copyFileSync(path.join('images', file), path.join('dist/images', file));
  });
}

// Create css directory
if (!fs.existsSync('dist/css')) {
  fs.mkdirSync('dist/css');
}

// Build Tailwind CSS
try {
  execSync('npx tailwindcss -i ./styles.css -o ./dist/css/styles.css --minify');
  console.log('✅ CSS built successfully');
} catch (error) {
  console.error('❌ Error building CSS:', error);
}

console.log('✅ Build completed! Files ready in the dist directory');
