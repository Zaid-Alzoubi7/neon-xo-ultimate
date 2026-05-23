/**
 * Neon XO Ultimate V15 - Service Worker Pro
 * المطور: Zaid Alzoubi
 */

const cacheName = 'neon-xo-cyber-eternity-cache-v2'; // تغيير الاسم لنسف الكاش القديم فوراً

const assets = [
  './',
  './index.html',
  './game.html',
  './manifest.json',
  './sw.js',
  './neon_xo_512.png',
  './xo_192x192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('✅ [Service Worker] جاري تخزين ملفات اللعبة بنجاح...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});


// 3. مرحلة التنشيط (Activate): تنظيف الخزنات القديمة لضمان عدم تعارض الإصدارات
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});
