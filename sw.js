const CACHE_NAME = 'veni-vici-v11';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon192.png',
  'icon512.png'
];

// Installation du cache de base
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Stratégie Réseau d'abord, sinon Cache (pour avoir toujours les dernières saisies à jour si connecté)
self.addEventListener('fetch', e => {
  // On ne gère pas les requêtes vers l'API Google dans le cache du Service Worker (géré par localStorage dans le code)
  if (e.request.url.includes('google.com') || e.request.url.includes('exec')) {
    return;
  }
  
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});