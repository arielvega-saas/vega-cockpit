// Service worker del Cockpit: cachea el caparazón para que abra al instante
// y funcione sin señal. Los datos vienen de Supabase (y del cache de la app).
const CACHE = "cockpit-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icono-192.png", "./icono-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Nunca cachear la API ni el auth: siempre datos frescos.
  if (url.hostname.endsWith("supabase.co") || url.hostname.endsWith("esm.sh")) return;
  if (e.request.method !== "GET") return;
  // El caparazón: red primero, cache como red de seguridad.
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
