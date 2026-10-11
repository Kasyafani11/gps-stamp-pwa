var C='gps-stamp-v4';
var F=[
  './','./index.html','./manifest.json','./icon-192.png','./icon-512.png'
];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){
      var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r;
    }).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./')})}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});
