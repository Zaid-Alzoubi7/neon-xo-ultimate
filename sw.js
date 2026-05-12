// اسم "الخزنة" أو الإصدار الخاص بالتطبيق
const cacheName = 'xo-neon-v15-v1';

// قائمة الملفات التي نريد تخزينها لتعمل بدون إنترنت
const assets = [
  './',
  './index.html',
  './manifest.json',
  './neon_xo_512.png' // تم التعديل بناءً على اسم الأيقونة في مجلدك
];

// 1. مرحلة التثبيت: تخزين الملفات في الذاكرة لأول مرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('جاري تخزين ملفات اللعبة...');
      return cache.addAll(assets);
    })
  );
});

// 2. مرحلة الجلب: جلب الملفات من الذاكرة بدلاً من الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إذا وجد الملف في الذاكرة أرجعه، وإلا اطلبه من الإنترنت
      return response || fetch(event.request);
    })
  );
});

// 3. مرحلة التنشيط: مسح النسخ القديمة إذا قمنا بتحديث الإصدار
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
