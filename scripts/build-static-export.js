#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Export static site by temporarily disabling dynamic routes
 */

const appDir = path.join(__dirname, '..', 'app');
const sbDir = path.join(appDir, 'sb');
const quizDir = path.join(appDir, 'quiz');

const sbCantoPath = path.join(sbDir, '[canto]');
const quizSlugPath = path.join(quizDir, '[...slug]');

const sbCantoBackup = path.join(sbDir, '[canto].bak');
const quizSlugBackup = path.join(quizDir, '[...slug].bak');

try {
  console.log('🔨 Building static export...\n');

  // Create temp backup
  console.log('📦 Disabling dynamic routes temporarily...');
  if (fs.existsSync(sbCantoPath)) {
    fs.renameSync(sbCantoPath, sbCantoBackup);
  }
  if (fs.existsSync(quizSlugPath)) {
    fs.renameSync(quizSlugPath, quizSlugBackup);
  }

  // Build
  console.log('⚙️  Building with static export...');
  execSync('npm run build', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

  // Restore routes
  console.log('\n📦 Restoring dynamic routes...');
  if (fs.existsSync(sbCantoBackup)) {
    fs.renameSync(sbCantoBackup, sbCantoPath);
  }
  if (fs.existsSync(quizSlugBackup)) {
    fs.renameSync(quizSlugBackup, quizSlugPath);
  }

  const outDir = path.join(__dirname, '..', 'out');
  if (fs.existsSync(outDir)) {
    console.log('\n✅ Static export completed!');
    console.log(`📁 Output folder: ${outDir}`);
    console.log('Ready to upload to Bluehost!\n');
  } else {
    console.error('❌ Export failed - out folder not created');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Restore routes on error
  if (fs.existsSync(sbCantoBackup)) {
    fs.renameSync(sbCantoBackup, sbCantoPath);
  }
  if (fs.existsSync(quizSlugBackup)) {
    fs.renameSync(quizSlugBackup, quizSlugPath);
  }
  
  process.exit(1);
}
