const CACHE = "predenuncias-v5";

const ASSETS = [
  "./",
  "./index.html",
  "./firebase_setup.html",
  "./denunciante_patrimonio.html",   // tu “otro html” (o el que sea)
  "./firebase.js",
  "./manifest.webmanifest",
  "./icon-192.ico",
  "./icon-192.png",
  "./apple-touch-icon.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => k !== CACHE && caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ❌ No tocar Firebase, Auth, Firestore, CDN
  if (
    req.url.includes("firebase") ||
    req.url.includes("googleapis") ||
    req.url.includes("gstatic") ||
    req.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
