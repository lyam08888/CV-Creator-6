// service-worker.js - Optimized version
const CACHE_NAME = 'cv-creator-v2.0.0';
const STATIC_CACHE = 'cv-creator-static-v2.0.0';
const DYNAMIC_CACHE = 'cv-creator-dynamic-v2.0.0';

// Core assets that should be cached immediately
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './assets/favicon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// JavaScript modules - cached on demand
const JS_MODULES = [
  './js/app.js',
  './js/ai.js',
  './js/blocks.js',
  './js/customization.js',
  './js/domutil.js',
  './js/drag.js',
  './js/error-handler.js',
  './js/exporter.js',
  './js/form.js',
  './js/inspector.js',
  './js/log.js',
  './js/preview.js',
  './js/resize.js',
  './js/state.js'
];

// External resources
const EXTERNAL_RESOURCES = [
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Core assets cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache core assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same origin requests
    if (JS_MODULES.some(module => request.url.includes(module))) {
      // JavaScript modules - cache first, then network
      event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    } else if (CORE_ASSETS.some(asset => request.url.endsWith(asset.replace('./', '')))) {
      // Core assets - cache first
      event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else {
      // Other same-origin requests - network first
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
  } else {
    // External resources - cache first with fallback
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Update cache in background
      fetch(request).then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      }).catch(() => {
        // Ignore network errors for background updates
      });
      
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    // Return offline fallback if available
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match('./index.html');
    }
    throw error;
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}
