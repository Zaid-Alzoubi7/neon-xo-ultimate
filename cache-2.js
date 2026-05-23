/**
 * Neon XO Ultimate V15 - Service Worker Pro
 * المطور: Zaid Alzoubi
 */

const cacheName = 'neon-xo-cyber-eternity-cache-v2';

const assets = [
  './',
  './index.html',
  './game.html',
  './manifest.json',
  './sw.js',
  './neon_xo_512.png',
  './xo_192x192.png'
];

// 1. التثبيت وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('✅ [Service Worker] جاري تخزين ملفات اللعبة بنجاح...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// 2. الجلب السريع من الكاش أو الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 3. التنشيط وتنظيف الكاش القديم (بدون تكرار)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});
