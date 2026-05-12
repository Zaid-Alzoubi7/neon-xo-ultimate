/**
 * Neon XO Ultimate V15 - Service Worker
 * المطور: Zaid Alzoubi
 */

// اسم الخزنة (تغييره عند كل تحديث رئيسي للكود لضمان تحديث الملفات لدى المستخدم)
const cacheName = 'neon-xo-v15-cache-v1';

// قائمة الملفات المطلوب تخزينها بناءً على الصورة 133106.jpg
const assets = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './neon_xo_512.png',
  './xo_192x192.png'
];

// 1. مرحلة التثبيت (Install): يتم فيها فتح الخزنة وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('✅ [Service Worker] جاري تخزين ملفات اللعبة في الذاكرة...');
      return cache.addAll(assets);
    })
  );
});

// 2. مرحلة الجلب (Fetch): استرداد الملفات من الذاكرة بدلاً من الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إذا وجد الملف في الذاكرة أرجعه، وإلا اطلبه من الإنترنت
      return response || fetch(event.request);
    })
  );
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
