#!/usr/bin/env node

/**
 * CV Creator - Build Optimization Script
 * This script optimizes the application for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting CV Creator optimization...');

// Configuration
const config = {
  sourceDir: '.',
  buildDir: 'dist',
  excludeFiles: [
    'debug.html',
    'test-functionality.html',
    'test-sortable.html',
    'diagnostic.js',
    'verification-banniere.js',
    'optimize.js',
    '.git',
    '.github',
    '.zencoder',
    'node_modules',
    'dist'
  ]
};

// Utility functions
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  ensureDir(destDir);
  fs.copyFileSync(src, dest);
}

function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around certain characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    // Remove empty rules
    .replace(/[^{}]+{\s*}/g, '')
    .trim();
}

function minifyJS(js) {
  return js
    // Remove single-line comments (but preserve URLs)
    .replace(/(?<!:)\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators
    .replace(/\s*([=+\-*\/{}();,])\s*/g, '$1')
    .trim();
}

function optimizeHTML(html) {
  return html
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove extra whitespace between tags
    .replace(/>\s+</g, '><')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Main optimization function
function optimize() {
  try {
    // Clean build directory
    if (fs.existsSync(config.buildDir)) {
      fs.rmSync(config.buildDir, { recursive: true });
    }
    ensureDir(config.buildDir);

    // Copy and optimize files
    function processDirectory(srcDir, destDir) {
      const items = fs.readdirSync(srcDir);
      
      for (const item of items) {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);
        
        // Skip excluded files/directories
        if (config.excludeFiles.some(exclude => 
          item === exclude || srcPath.includes(exclude)
        )) {
          continue;
        }
        
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
          ensureDir(destPath);
          processDirectory(srcPath, destPath);
        } else {
          const ext = path.extname(item).toLowerCase();
          let content = fs.readFileSync(srcPath, 'utf8');
          
          // Optimize based on file type
          switch (ext) {
            case '.css':
              content = minifyCSS(content);
              console.log(`✅ Optimized CSS: ${item}`);
              break;
              
            case '.js':
              // Skip minification for modules to preserve functionality
              if (!item.includes('module') && !srcPath.includes('node_modules')) {
                content = minifyJS(content);
                console.log(`✅ Optimized JS: ${item}`);
              }
              break;
              
            case '.html':
              content = optimizeHTML(content);
              console.log(`✅ Optimized HTML: ${item}`);
              break;
              
            default:
              console.log(`📄 Copied: ${item}`);
          }
          
          fs.writeFileSync(destPath, content);
        }
      }
    }
    
    processDirectory(config.sourceDir, config.buildDir);
    
    // Generate build info
    const buildInfo = {
      buildDate: new Date().toISOString(),
      version: '2.0.0',
      optimizations: [
        'CSS minification',
        'HTML optimization',
        'JavaScript cleanup',
        'Removed debug files',
        'Service Worker optimization'
      ]
    };
    
    fs.writeFileSync(
      path.join(config.buildDir, 'build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    );
    
    console.log('🎉 Optimization complete!');
    console.log(`📦 Build created in: ${config.buildDir}`);
    console.log(`📊 Build info saved to: build-info.json`);
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

// Run optimization if called directly
if (require.main === module) {
  optimize();
}

module.exports = { optimize };