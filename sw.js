// StructSolver I — Service Worker
// Permite usar la aplicación sin conexión tras la primera carga.
// Estrategia: la aplicación misma (index.html) se sirve desde caché;
// las fuentes de Google y jsPDF del CDN se guardan en caché en la
// primera visita y se revalidan en segundo plano.
// NOTA: solo funciona servido por http(s) o localhost, no con file://.
// El manifiesto y los íconos referenciados en index.html (manifest.json,
// icons/*) se incluyen en la carpeta y se guardan en caché en la instalación.

const CACHE_NAME = 'structsolver-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

const CDN_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Archivos propios: primero caché, si no hay, red y se guarda.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
    return;
  }

  // CDN (fuentes y jsPDF): obsoleto-mientras-revalida.
  if (CDN_ORIGINS.includes(url.origin)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
  }
});
