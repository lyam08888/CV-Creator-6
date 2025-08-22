#!/usr/bin/env node

/**
 * CV Creator - Validation Script
 * Validates the application for common issues before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting CV Creator validation...');

let errors = 0;
let warnings = 0;

function logError(message) {
  console.error(`❌ ERROR: ${message}`);
  errors++;
}

function logWarning(message) {
  console.warn(`⚠️  WARNING: ${message}`);
  warnings++;
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

// Validation functions
function validateHTML() {
  console.log('\n📄 Validating HTML...');
  
  const htmlFile = 'index.html';
  if (!fs.existsSync(htmlFile)) {
    logError('index.html not found');
    return;
  }
  
  const html = fs.readFileSync(htmlFile, 'utf8');
  
  // Check for DOCTYPE
  if (!html.includes('<!DOCTYPE html>')) {
    logError('Missing DOCTYPE declaration in index.html');
  } else {
    logSuccess('DOCTYPE declaration found');
  }
  
  // Check for required meta tags
  if (!html.includes('<meta charset="UTF-8"')) {
    logError('Missing charset meta tag');
  } else {
    logSuccess('Charset meta tag found');
  }
  
  if (!html.includes('viewport')) {
    logWarning('Missing viewport meta tag');
  } else {
    logSuccess('Viewport meta tag found');
  }
  
  // Check for manifest
  if (!html.includes('manifest.json')) {
    logWarning('Missing manifest link');
  } else {
    logSuccess('Manifest link found');
  }
}

function validateCSS() {
  console.log('\n🎨 Validating CSS...');
  
  const cssFile = 'css/app.css';
  if (!fs.existsSync(cssFile)) {
    logError('css/app.css not found');
    return;
  }
  
  const css = fs.readFileSync(cssFile, 'utf8');
  
  // Check for common CSS errors
  if (css.includes('justify-content: between')) {
    logError('Invalid CSS property value: justify-content: between (should be space-between)');
  } else {
    logSuccess('No justify-content errors found');
  }
  
  // Check for unclosed braces
  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    logError(`Unmatched braces in CSS: ${openBraces} open, ${closeBraces} close`);
  } else {
    logSuccess('CSS braces are balanced');
  }
  
  // Check for CSS variables
  if (!css.includes(':root')) {
    logWarning('No CSS custom properties (variables) found');
  } else {
    logSuccess('CSS custom properties found');
  }
}

function validateJavaScript() {
  console.log('\n📜 Validating JavaScript...');
  
  const jsDir = 'js';
  if (!fs.existsSync(jsDir)) {
    logError('js directory not found');
    return;
  }
  
  const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
  
  if (jsFiles.length === 0) {
    logError('No JavaScript files found');
    return;
  }
  
  logSuccess(`Found ${jsFiles.length} JavaScript files`);
  
  // Basic syntax validation for each file
  jsFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const js = fs.readFileSync(filePath, 'utf8');
    
    // Check for common syntax errors
    const openParens = (js.match(/\(/g) || []).length;
    const closeParens = (js.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
      logError(`Unmatched parentheses in ${file}: ${openParens} open, ${closeParens} close`);
    }
    
    const openBraces = (js.match(/{/g) || []).length;
    const closeBraces = (js.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      logError(`Unmatched braces in ${file}: ${openBraces} open, ${closeBraces} close`);
    }
    
    // Check for console.log statements (should be warnings in production)
    if (js.includes('console.log') && !file.includes('log.js')) {
      logWarning(`console.log statements found in ${file} (consider removing for production)`);
    }
  });
}

function validateManifest() {
  console.log('\n📱 Validating PWA Manifest...');
  
  const manifestFile = 'manifest.json';
  if (!fs.existsSync(manifestFile)) {
    logError('manifest.json not found');
    return;
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'short_name', 'start_url', 'display'];
    requiredFields.forEach(field => {
      if (!manifest[field]) {
        logError(`Missing required field in manifest: ${field}`);
      } else {
        logSuccess(`Manifest field found: ${field}`);
      }
    });
    
    // Check icons
    if (!manifest.icons || manifest.icons.length === 0) {
      logError('No icons defined in manifest');
    } else {
      logSuccess(`Found ${manifest.icons.length} icon(s) in manifest`);
      
      // Validate icon files exist
      manifest.icons.forEach(icon => {
        if (!fs.existsSync(icon.src)) {
          logError(`Icon file not found: ${icon.src}`);
        }
      });
    }
    
  } catch (error) {
    logError(`Invalid JSON in manifest.json: ${error.message}`);
  }
}

function validateAssets() {
  console.log('\n🖼️  Validating Assets...');
  
  const assetsDir = 'assets';
  if (!fs.existsSync(assetsDir)) {
    logWarning('assets directory not found');
    return;
  }
  
  const requiredAssets = ['favicon.svg', 'icon-192.png', 'icon-512.png'];
  requiredAssets.forEach(asset => {
    const assetPath = path.join(assetsDir, asset);
    if (!fs.existsSync(assetPath)) {
      logError(`Required asset not found: ${asset}`);
    } else {
      logSuccess(`Asset found: ${asset}`);
    }
  });
}

function validateServiceWorker() {
  console.log('\n⚙️  Validating Service Worker...');
  
  const swFile = 'service-worker.js';
  if (!fs.existsSync(swFile)) {
    logWarning('service-worker.js not found (PWA functionality will be limited)');
    return;
  }
  
  const sw = fs.readFileSync(swFile, 'utf8');
  
  // Check for required service worker events
  const requiredEvents = ['install', 'activate', 'fetch'];
  requiredEvents.forEach(event => {
    if (!sw.includes(`addEventListener('${event}'`)) {
      logError(`Service worker missing ${event} event listener`);
    } else {
      logSuccess(`Service worker ${event} event found`);
    }
  });
  
  // Check for cache management
  if (!sw.includes('caches.open')) {
    logWarning('Service worker does not implement caching');
  } else {
    logSuccess('Service worker caching implemented');
  }
}

// Main validation function
function validate() {
  console.log('🔍 CV Creator Validation Report');
  console.log('================================');
  
  validateHTML();
  validateCSS();
  validateJavaScript();
  validateManifest();
  validateAssets();
  validateServiceWorker();
  
  console.log('\n📊 Validation Summary');
  console.log('====================');
  console.log(`❌ Errors: ${errors}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  
  if (errors === 0) {
    console.log('🎉 No critical errors found! Application is ready for deployment.');
  } else {
    console.log('🚨 Critical errors found. Please fix before deployment.');
    process.exit(1);
  }
  
  if (warnings > 0) {
    console.log('💡 Consider addressing warnings for optimal performance.');
  }
}

// Run validation if called directly
if (require.main === module) {
  validate();
}

module.exports = { validate };