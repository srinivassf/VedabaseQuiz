#!/usr/bin/env node

/**
 * This script pre-renders the Next.js site to static HTML
 * Run with: node scripts/export-static.js
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

console.log('Starting static export process...\n');

// Step 1: Enable export in next.config.js temporarily
const configPath = path.join(__dirname, '..', 'next.config.js');
const configContent = fs.readFileSync(configPath, 'utf-8');

const originalConfig = configContent;
const modifiedConfig = configContent.replace(
  "// output: 'export',",
  "output: 'export',"
);

console.log('1. Enabling static export mode...');
fs.writeFileSync(configPath, modifiedConfig);

// Step 2: Run build
console.log('2. Building static site...');
const buildResult = spawnSync('npm', ['run', 'build'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
});

if (buildResult.status !== 0) {
  console.error('\n❌ Build failed');
  // Restore original config
  fs.writeFileSync(configPath, originalConfig);
  process.exit(1);
}

// Step 3: Verify output folder
const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  const files = fs.readdirSync(outDir);
  console.log(`\n✅ Static export completed successfully!`);
  console.log(`📁 Output folder: ${outDir}`);
  console.log(`📄 Files generated: ${files.length}`);
} else {
  console.error('\n⚠️  Output folder not found');
}

// Step 4: Restore original config
console.log('\n3. Restoring original config...');
fs.writeFileSync(configPath, originalConfig);

console.log('\n✅ Static site is ready in the "out/" folder for Bluehost!');
