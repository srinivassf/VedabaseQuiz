const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
const dataDir = path.join(process.cwd(), 'data');

// Remove existing out directory
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}

// Create out directory
fs.mkdirSync(outDir, { recursive: true });

console.log('��� Generating static HTML for Bluehost...\n');

// Copy data directory with all quiz files
if (fs.existsSync(dataDir)) {
  const outDataDir = path.join(outDir, 'data');
  fs.mkdirSync(outDataDir, { recursive: true });
  
  function copyDirRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    entries.forEach(entry => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDirRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
  
  copyDirRecursive(dataDir, outDataDir);
  console.log('✅ Copied data directory (all quiz files)');
}

// Read quiz data for statistics
let bgQuizzes = [];
let sbQuizzes = [];

try {
  const bgDir = path.join(outDir, 'data', 'quizzes', 'bg');
  if (fs.existsSync(bgDir)) {
    bgQuizzes = fs.readdirSync(bgDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', '').replace('-', ' '));
  }
  
  const sbDir = path.join(outDir, 'data', 'quizzes', 'sb');
  if (fs.existsSync(sbDir)) {
    fs.readdirSync(sbDir).forEach(cantoFolder => {
      const cantoPath = path.join(sbDir, cantoFolder);
      if (fs.statSync(cantoPath).isDirectory()) {
        const quizzes = fs.readdirSync(cantoPath)
          .filter(f => f.endsWith('.json'))
          .map(f => f.replace('.json', ''));
        if (quizzes.length > 0) {
          sbQuizzes.push({ canto: cantoFolder, quizzes });
        }
      }
    });
  }
} catch (e) {
  console.warn('⚠️  Could not read quiz data');
}

const pages = {
  'index.html': 'Home',
  'about/index.html': 'About',
  'sources/index.html': 'Sources',
  'bg/index.html': 'Bhagavad Gita',
  'sb/index.html': 'Srimad Bhagavatam'
};

// Create HTML files
Object.entries(pages).forEach(([pagePath, pageName]) => {
  const fullPath = path.join(outDir, pagePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  
  let content = ``;
  
  if (pagePath === 'index.html') {
    content = `
    <h2>Welcome to Vedabase Quiz</h2>
    <p>Explore our collection of quizzes on sacred Hindu scriptures.</p>
    <h3>Available Quiz Collections</h3>
    <ul style="margin-left: 20px;">
      <li><strong>Bhagavad Gita:</strong> ${bgQuizzes.length} quizzes</li>
      <li><strong>Srimad Bhagavatam:</strong> ${sbQuizzes.reduce((sum, s) => sum + s.quizzes.length, 0)} quizzes</li>
    </ul>
    <div class="nav-buttons">
      <a href="/bg/" class="btn">→ BG Quizzes</a>
      <a href="/sb/" class="btn">→ SB Quizzes</a>
    </div>
    `;
  } else if (pagePath === 'bg/index.html') {
    content = `
    <h2>Bhagavad Gita Quizzes</h2>
    <p>Test your knowledge of the Bhagavad Gita with ${bgQuizzes.length} available quizzes.</p>
    <h3>Available Chapters</h3>
    <div class="quiz-list">
    `;
    bgQuizzes.forEach(quiz => {
      content += `<div class="quiz-item">��� ${quiz}</div>`;
    });
    content += `</div>`;
  } else if (pagePath === 'sb/index.html') {
    content = `
    <h2>Srimad Bhagavatam Quizzes</h2>
    <p>Explore the divine stories across ${sbQuizzes.length} cantos.</p>
    `;
    sbQuizzes.forEach(({ canto, quizzes }) => {
      content += `<h3>Canto ${canto} (${quizzes.length} quiz${quizzes.length !== 1 ? 'zes' : ''})</h3>`;
      content += `<div class="quiz-list">`;
      quizzes.forEach(q => {
        content += `<div class="quiz-item">��� ${q}</div>`;
      });
      content += `</div>`;
    });
  } else if (pagePath === 'about/index.html') {
    content = `
    <h2>About Vedabase Quiz</h2>
    <p>Vedabase Quiz is an interactive learning platform dedicated to helping you explore and master the teachings of sacred Hindu scriptures.</p>
    <h3>Quizzes Covered</h3>
    <ul style="margin-left: 20px;">
      <li><strong>Bhagavad Gita</strong> - The eternal wisdom of Lord Krishna</li>
      <li><strong>Srimad Bhagavatam</strong> - The complete transcendental history of Krishna</li>
    </ul>
    `;
  } else if (pagePath === 'sources/index.html') {
    content = `
    <h2>Data Sources</h2>
    <p>Our quizzes are based on authentic translations and authoritative commentaries.</p>
    <h3>Primary Sources</h3>
    <ul style="margin-left: 20px;">
      <li><strong>Bhagavad Gita As It Is</strong> - A.C. Bhaktivedanta Swami Prabhupada</li>
      <li><strong>Srimad Bhagavatam</strong> - Śrīla Vyāsadeva (translated and annotated)</li>
    </ul>
    <p><strong>All quiz data:</strong> Located in /data/quizzes/ directory</p>
    `;
  }
  
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName} - Vedabase Quiz</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 { color: #333; margin-bottom: 30px; font-size: 36px; border-bottom: 3px solid #667eea; padding-bottom: 15px; }
    h2 { color: #667eea; margin-top: 25px; margin-bottom: 15px; font-size: 28px; }
    h3 { color: #764ba2; margin-top: 20px; margin-bottom: 12px; font-size: 18px; }
    p { color: #666; margin-bottom: 15px; line-height: 1.7; }
    ul li { color: #666; margin-bottom: 8px; line-height: 1.6; }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eee;
    }
    a, .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }
    a:hover, .btn:hover {
      background: #764ba2;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .nav-buttons {
      margin-top: 20px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .quiz-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      margin: 15px 0;
    }
    .quiz-item {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      color: #333;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Vedabase Quiz</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about/">About</a>
      <a href="/sources/">Sources</a>
      <a href="/bg/">BG</a>
      <a href="/sb/">SB</a>
    </nav>
    ${content}
    <hr style="margin: 40px 0; border: none; border-top: 2px solid #eee;">
    <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
      ��� Quiz data available in /data/quizzes/ | For interactive quizzes, deploy to Node.js hosting
    </p>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(fullPath, html);
  console.log('✅ Generated ' + pagePath);
});

// Create 404.html
const notFound = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Not Found</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 { color: #d32f2f; font-size: 72px; margin: 0; }
    p { color: #666; margin: 15px 0; }
    a { color: #667eea; text-decoration: none; padding: 10px 20px; background: #f0f0f0; border-radius: 6px; display: inline-block; margin-top: 15px; }
    a:hover { background: #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Page Not Found</p>
    <p><a href="/">Return to Home</a></p>
  </div>
</body>
</html>`;
fs.writeFileSync(path.join(outDir, '404.html'), notFound);
console.log('✅ Generated 404.html');

console.log('\n✅ Static site generated with data!');
console.log(`��� Output: ${outDir}`);
console.log(`��� BG Quizzes: ${bgQuizzes.length}`);
console.log(`��� SB Cantos: ${sbQuizzes.length}`);
console.log('\n✨ Ready for Bluehost deployment!');
